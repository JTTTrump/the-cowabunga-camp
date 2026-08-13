/* <farm-map> — US states map from us-atlas TopoJSON with farmhouse pins.
   Requires d3 + topojson-client globals (loaded via pinned tags in <helmet>). */
(function () {
  const FARMS = [
    { city: "Ann Arbor",      state: "Michigan",       lon: -83.7430,  lat: 42.2808 },
    { city: "Asheville",      state: "North Carolina", lon: -82.5515,  lat: 35.5951 },
    { city: "Bozeman",        state: "Montana",        lon: -111.0429, lat: 45.6770 },
    { city: "Fort Collins",   state: "Colorado",       lon: -105.0844, lat: 40.5853 },
    { city: "Fredericksburg", state: "Texas",          lon: -98.8720,  lat: 30.2752 },
    { city: "Jacksonville",   state: "Florida",        lon: -81.6557,  lat: 30.3322 },
    { city: "Madison",        state: "Wisconsin",      lon: -89.4012,  lat: 43.0731 },
    { city: "Nashville",      state: "Tennessee",      lon: -86.7816,  lat: 36.1627 },
    { city: "Ocala",          state: "Florida",        lon: -82.1401,  lat: 29.1872 },
    { city: "Scottsdale",     state: "Arizona",        lon: -111.9261, lat: 33.4942 },
    { city: "Sonoma",         state: "California",     lon: -122.4580, lat: 38.2919 }
  ];

  const W = 1000, H = 600;
  const INK = "#1C2925", AMBER = "#B4512F";
  const LAND = "#F0EBE2", INNER = "#DAD2C6", OUTER = "#B3A896";

  function whenReady() {
    return new Promise(resolve => {
      const tick = () => (window.d3 && window.topojson) ? resolve() : setTimeout(tick, 40);
      tick();
    });
  }

  // Cute gambrel-roof barn. S is the master size multiplier.
  const S = 1.5;

  function barn(g) {
    const s = S;
    // roof (gambrel: shallow slope, break, steeper slope to peak)
    g.append("path")
      .attr("d", `M ${-8.6 * s} ${-5.8 * s}
                  L ${-6.1 * s} ${-9.9 * s}
                  L 0 ${-12.4 * s}
                  L ${6.1 * s} ${-9.9 * s}
                  L ${8.6 * s} ${-5.8 * s} Z`)
      .attr("fill", AMBER);
    // body
    g.append("rect")
      .attr("x", -7 * s).attr("y", -5.9 * s)
      .attr("width", 14 * s).attr("height", 5.9 * s)
      .attr("fill", AMBER);
    // hay-loft window in the gable
    g.append("rect")
      .attr("x", -1.3 * s).attr("y", -9.3 * s)
      .attr("width", 2.6 * s).attr("height", 2.2 * s)
      .attr("fill", "#FFFFFF");
    // double door
    g.append("rect")
      .attr("x", -2.9 * s).attr("y", -4.4 * s)
      .attr("width", 5.8 * s).attr("height", 4.4 * s)
      .attr("fill", "#FFFFFF");
    // door cross-bracing
    g.append("path")
      .attr("d", `M ${-2.9 * s} ${-4.4 * s} L ${2.9 * s} 0
                  M ${2.9 * s} ${-4.4 * s} L ${-2.9 * s} 0`)
      .attr("fill", "none")
      .attr("stroke", AMBER)
      .attr("stroke-width", 0.85 * s);
  }

  class FarmMap extends HTMLElement {
    async connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      this.style.display = "block";
      this.style.position = "relative";
      this.style.width = "100%";

      await whenReady();

      let topo;
      try {
        topo = await fetch("https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json").then(r => r.json());
      } catch (e) {
        return;
      }
      if (!topo || !topo.objects || !topo.objects.states) return;

      const states = topojson.feature(topo, topo.objects.states);
      const interior = topojson.mesh(topo, topo.objects.states, (a, b) => a !== b);
      const outline = topojson.mesh(topo, topo.objects.states, (a, b) => a === b);

      const svg = d3.select(this).append("svg")
        .attr("viewBox", `0 0 ${W} ${H}`)
        .attr("width", "100%")
        .style("display", "block")
        .style("overflow", "visible");

      const projection = d3.geoAlbersUsa().fitExtent([[16, 16], [W - 16, H - 16]], states);
      const path = d3.geoPath(projection);

      svg.append("g").selectAll("path")
        .data(states.features)
        .join("path")
        .attr("d", path)
        .attr("fill", LAND);

      svg.append("path").attr("d", path(interior))
        .attr("fill", "none").attr("stroke", INNER).attr("stroke-width", 0.9);

      svg.append("path").attr("d", path(outline))
        .attr("fill", "none").attr("stroke", OUTER).attr("stroke-width", 1.4);

      const tip = d3.select(this).append("div")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("transform", "translate(-50%, -100%)")
        .style("background", INK)
        .style("color", "#F1E8D5")
        .style("padding", "11px 17px")
        .style("font", "600 15.5px/1.3 'DM Sans', Helvetica, sans-serif")
        .style("white-space", "nowrap")
        .style("transition", "opacity 120ms ease")
        .style("z-index", "5");

      const layer = svg.append("g");

      FARMS.forEach(f => {
        const p = projection([f.lon, f.lat]);
        if (!p) return;

        const g = layer.append("g")
          .attr("transform", `translate(${p[0]},${p[1]})`)
          .style("cursor", "pointer");

        g.append("circle").attr("r", 24).attr("fill", "transparent");
        const glyph = g.append("g");
        barn(glyph);

        g.on("mouseenter", () => {
          glyph.transition().duration(120).attr("transform", "scale(1.22) translate(0,-2)");
          const scale = this.getBoundingClientRect().width / W;
          tip.html(`<span style="color:#A9C6A5">${f.city}</span>, ${f.state}`)
            .style("left", (p[0] * scale) + "px")
            .style("top", (p[1] * scale - 26) + "px")
            .style("opacity", 1);
        }).on("mouseleave", () => {
          glyph.transition().duration(120).attr("transform", "scale(1)");
          tip.style("opacity", 0);
        });
      });
    }
  }

  if (!customElements.get("farm-map")) customElements.define("farm-map", FarmMap);
})();
