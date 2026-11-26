// NusaStat main: hash router, page state, and control wiring.
// Routes: #/overview #/economy #/population #/employment #/prices
//         #/regions #/methodology

import { renderRoute } from "./views.js";

const state = {
  year: 2024,
  chartMode: "bar",
  gdpMetric: "nominal",
  province: "Jawa Barat",
  search: "",
  sortKey: "population",
  sortDir: "desc",
};

const ROUTES = [
  ["overview", "Beranda"],
  ["economy", "Ekonomi"],
  ["population", "Penduduk"],
  ["employment", "Tenaga Kerja"],
  ["prices", "Harga & Kemiskinan"],
  ["regions", "Provinsi"],
  ["methodology", "Metodologi"],
];

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const name = hash.split("/")[0];
  return ROUTES.some(([r]) => r === name) ? name : "overview";
}

function render() {
  const route = currentRoute();
  const main = document.getElementById("page");
  main.innerHTML = renderRoute(route, state);
  document.querySelectorAll(".nav-link").forEach((a) => {
    const r = a.getAttribute("href").replace(/^#\/?/, "");
    if (r === route) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
  wireControls(route);
  window.scrollTo(0, 0);
}

function wireControls(route) {
  if (route === "economy") {
    const yearSelect = document.getElementById("year-select");
    if (yearSelect) {
      yearSelect.addEventListener("change", () => {
        state.year = Number(yearSelect.value);
        render();
      });
    }
    const metric = document.getElementById("gdp-metric");
    if (metric) {
      metric.addEventListener("change", () => {
        state.gdpMetric = metric.value;
        render();
      });
    }
    const barBtn = document.getElementById("chart-bar");
    const lineBtn = document.getElementById("chart-line");
    if (barBtn) {
      barBtn.addEventListener("click", () => {
        state.chartMode = "bar";
        render();
      });
    }
    if (lineBtn) {
      lineBtn.addEventListener("click", () => {
        state.chartMode = "line";
        render();
      });
    }
  }
  if (route === "population") {
    const sel = document.getElementById("province-select");
    if (sel) {
      sel.addEventListener("change", () => {
        state.province = sel.value;
        render();
      });
    }
  }
  if (route === "regions") {
    const search = document.getElementById("province-search");
    if (search) {
      search.addEventListener("input", () => {
        state.search = search.value;
        render();
        const again = document.getElementById("province-search");
        if (again) {
          again.focus();
          again.setSelectionRange(again.value.length, again.value.length);
        }
      });
    }
    document.querySelectorAll(".sort-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-sort");
        if (state.sortKey === key) {
          state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        } else {
          state.sortKey = key;
          state.sortDir = key === "name" || key === "island" ? "asc" : "desc";
        }
        render();
      });
    });
  }
}

window.addEventListener("hashchange", render);
render();
