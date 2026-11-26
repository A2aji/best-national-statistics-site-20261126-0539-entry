// NusaStat views: one render function per page. All pages are reached by a
// link in the top navigation; each figure is labelled with source and year.

import {
  HEADLINE, GDP_NOMINAL, GDP_GROWTH, GDP_PER_CAPITA, INFLATION,
  UNEMPLOYMENT, POVERTY, PROVINCES_2024, AGE_STRUCTURE_2024,
  LABOUR_2024, TRADE_2024, UMP_DKI_2025, TOTAL_POPULATION_2024,
  provinceShare, formatNumber,
} from "./data.js";
import { barChart, lineChart, hbarChart } from "./charts.js";

function kpi(item, display) {
  return (
    '<article class="kpi"><p class="kpi-value">' + display + "</p>" +
    '<p class="kpi-label">' + item.label + "</p>" +
    '<p class="kpi-source">Sumber: ' + item.source + "</p></article>"
  );
}

function srcLine(text) {
  return '<p class="src">Sumber: ' + text + "</p>";
}

function yearOptions(selected) {
  return [2019, 2020, 2021, 2022, 2023, 2024]
    .map((y) => '<option value="' + y + '"' + (y === selected ? " selected" : "") + ">" + y + "</option>")
    .join("");
}

export function viewOverview() {
  const growth = barChart(
    GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })),
    {
      title: "Pertumbuhan ekonomi Indonesia 2019–2024",
      color: "#0e6b5c",
      valueLabel: (v) => v.toFixed(2) + "%",
      tickFormat: (t) => t + "%",
    },
  );
  const provinces = hbarChart(
    PROVINCES_2024.slice(0, 8).map((p) => ({
      label: p.name,
      value: p.population,
    })),
    {
      title: "Penduduk provinsi terbesar 2024",
      valueLabel: (v) => v.toFixed(2) + " jt",
      note: "Juta jiwa, pertengahan 2024. Sumber: BPS, 2024.",
    },
  );
  return (
    '<section class="hero"><h1>Statistik Indonesia, satu tempat.</h1>' +
    "<p>NusaStat merangkum angka-angka resmi Indonesia — penduduk, ekonomi, " +
    "tenaga kerja, harga, dan kemiskinan — dari publikasi Badan Pusat Statistik (BPS), " +
    "dengan sumber dan tahun pada setiap angka.</p>" +
    '<p class="hero-links"><a class="btn" href="#/economy">Lihat ekonomi</a> ' +
    '<a class="btn btn-ghost" href="#/regions">Tabel provinsi</a></p></section>' +
    '<section aria-label="Indikator utama"><h2>Indikator utama</h2><div class="kpi-grid">' +
    kpi(HEADLINE.populationMid2024, formatNumber(281.6, 1) + " jt") +
    kpi(HEADLINE.gdp2024, "Rp " + formatNumber(22139, 0) + " T") +
    kpi(HEADLINE.gdpGrowth2024, "5,03%") +
    kpi(HEADLINE.inflation2024, "1,57%") +
    kpi(HEADLINE.unemploymentAug2024, "4,91%") +
    kpi(HEADLINE.povertySep2024, "8,57%") +
    kpi(HEADLINE.hdi2024, "75,02") +
    kpi(HEADLINE.giniSep2024, "0,381") +
    "</div></section>" +
    '<section class="chart-grid">' +
    '<article class="card"><h2>Pertumbuhan ekonomi 2019–2024</h2>' + growth +
    srcLine("BPS, 2019–2024. Pertumbuhan PDB riil, % year-on-year.") +
    '<p><a href="#/economy">Buka halaman Ekonomi →</a></p></article>' +
    '<article class="card"><h2>Provinsi terpadat 2024</h2>' + provinces +
    '<p><a href="#/population">Buka halaman Penduduk →</a></p></article>' +
    "</section>" +
    '<section class="card"><h2>Sekilas 2024</h2><ul class="facts">' +
    "<li><strong>281,6 juta jiwa</strong> — penduduk Indonesia pertengahan 2024 (BPS).</li>" +
    "<li><strong>Rp22.139 triliun</strong> — PDB harga berlaku 2024, tumbuh <strong>5,03%</strong> (BPS).</li>" +
    "<li><strong>1,57%</strong> — inflasi Desember 2024, terendah dalam enam tahun terakhir (BPS).</li>" +
    "<li><strong>8,57%</strong> — penduduk miskin September 2024, atau 24,06 juta jiwa (BPS).</li>" +
    "<li><strong>75,02</strong> — Indeks Pembangunan Manusia 2024 (BPS).</li>" +
    "</ul></section>"
  );
}

export function viewEconomy(state) {
  const year = state.year;
  const gdp = GDP_NOMINAL.find((d) => d.year === year);
  const growth = GDP_GROWTH.find((d) => d.year === year);
  const perCapita = GDP_PER_CAPITA.find((d) => d.year === year);
  const series = state.chartMode === "line"
    ? lineChart(
        (state.gdpMetric === "percapita" ? GDP_PER_CAPITA : GDP_NOMINAL).map((d) => ({
          label: String(d.year), value: d.value,
        })),
        {
          title: state.gdpMetric === "percapita" ? "PDB per kapita 2019–2024" : "PDB harga berlaku 2019–2024",
          valueLabel: (v) => state.gdpMetric === "percapita" ? "Rp" + v.toFixed(1) + " jt" : "Rp" + formatNumber(v, 0) + " T",
          tickFormat: (t) => (state.gdpMetric === "percapita" ? t + " jt" : formatNumber(t, 0)),
        },
      )
    : barChart(
        (state.gdpMetric === "percapita" ? GDP_PER_CAPITA : GDP_NOMINAL).map((d) => ({
          label: String(d.year), value: d.value,
        })),
        {
          title: state.gdpMetric === "percapita" ? "PDB per kapita 2019–2024" : "PDB harga berlaku 2019–2024",
          valueLabel: (v) => state.gdpMetric === "percapita" ? "Rp" + v.toFixed(1) + " jt" : "Rp" + formatNumber(v, 0) + " T",
          tickFormat: (t) => (state.gdpMetric === "percapita" ? t + " jt" : formatNumber(t, 0)),
        },
      );
  const growthChart = barChart(
    GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })),
    {
      title: "Pertumbuhan ekonomi 2019–2024",
      valueLabel: (v) => v.toFixed(2) + "%",
      tickFormat: (t) => t + "%",
    },
  );
  return (
    "<h1>Ekonomi</h1>" +
    '<p class="lede">PDB, pertumbuhan, dan perdagangan luar negeri Indonesia 2019–2024.</p>' +
    '<div class="controls"><label>Tahun <select id="year-select" aria-label="Pilih tahun">' +
    yearOptions(year) + "</select></label>" +
    '<label>Metrik <select id="gdp-metric" aria-label="Pilih metrik PDB">' +
    '<option value="nominal"' + (state.gdpMetric === "nominal" ? " selected" : "") + ">PDB nominal (Rp triliun)</option>" +
    '<option value="percapita"' + (state.gdpMetric === "percapita" ? " selected" : "") + ">PDB per kapita (Rp juta)</option>" +
    "</select></label>" +
    '<span class="toggle-group" role="group" aria-label="Jenis grafik">' +
    '<button type="button" id="chart-bar" class="toggle' + (state.chartMode === "bar" ? " active" : "") + '">Batang</button>' +
    '<button type="button" id="chart-line" class="toggle' + (state.chartMode === "line" ? " active" : "") + '">Garis</button>' +
    "</span></div>" +
    '<div class="kpi-grid">' +
    '<article class="kpi"><p class="kpi-value">Rp ' + formatNumber(gdp.value, 0) + " T</p>" +
    '<p class="kpi-label">PDB harga berlaku ' + year + '</p><p class="kpi-source">Sumber: BPS, ' + year + "</p></article>" +
    '<article class="kpi"><p class="kpi-value">' + growth.value.toFixed(2).replace(".", ",") + "%</p>" +
    '<p class="kpi-label">Pertumbuhan ekonomi ' + year + '</p><p class="kpi-source">Sumber: BPS, ' + year + "</p></article>" +
    '<article class="kpi"><p class="kpi-value">Rp ' + perCapita.value.toFixed(1).replace(".", ",") + " jt</p>" +
    '<p class="kpi-label">PDB per kapita ' + year + '</p><p class="kpi-source">Sumber: BPS, ' + year + "</p></article>" +
    "</div>" +
    '<section class="chart-grid">' +
    '<article class="card"><h2>' + (state.gdpMetric === "percapita" ? "PDB per kapita" : "PDB harga berlaku") + " 2019–2024</h2>" + series +
    srcLine("BPS, 2019–2024.") + "</article>" +
    '<article class="card"><h2>Pertumbuhan ekonomi 2019–2024</h2>' + growthChart +
    srcLine("BPS, 2019–2024. PDB riil, % year-on-year. Kontraksi 2020 adalah dampak pandemi COVID-19.") +
    "</article></section>" +
    '<section class="card"><h2>Perdagangan luar negeri 2024</h2><div class="kpi-grid">' +
    '<article class="kpi"><p class="kpi-value">US$ ' + TRADE_2024.exports.value.toFixed(2).replace(".", ",") + " M</p>" +
    '<p class="kpi-label">Ekspor 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">US$ ' + TRADE_2024.imports.value.toFixed(2).replace(".", ",") + " M</p>" +
    '<p class="kpi-label">Impor 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">US$ ' + TRADE_2024.surplus.value.toFixed(2).replace(".", ",") + " M</p>" +
    '<p class="kpi-label">Surplus perdagangan 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    "</div>" +
    "<p>Indonesia mencatat surplus perdagangan selama lima tahun berturut-turut hingga 2024, " +
    "ditopang ekspor batu bara, minyak sawit, serta besi dan baja.</p></section>"
  );
}

export function viewPopulation(state) {
  const selected = PROVINCES_2024.find((p) => p.name === state.province) || PROVINCES_2024[0];
  const top = PROVINCES_2024.slice(0, 10);
  const chart = hbarChart(
    top.map((p) => ({ label: p.name, value: p.population })),
    {
      title: "Sepuluh provinsi terpadat 2024",
      valueLabel: (v) => v.toFixed(2) + " jt",
      note: "Juta jiwa, pertengahan 2024. Sumber: BPS, 2024.",
    },
  );
  const age = hbarChart(
    AGE_STRUCTURE_2024.map((a, i) => ({
      label: a.group,
      value: a.share,
      color: ["#0e6b5c", "#e8a317", "#7a4a1f"][i],
    })),
    {
      title: "Struktur umur 2024",
      valueLabel: (v) => v.toFixed(1).replace(".", ",") + "%",
      note: "Pangsa penduduk per kelompok umur, 2024. Sumber: BPS, 2024 (angka dibulatkan).",
    },
  );
  return (
    "<h1>Penduduk &amp; Demografi</h1>" +
    '<p class="lede">281,6 juta jiwa pada pertengahan 2024 — negara terpadat keempat di dunia.</p>' +
    '<div class="controls"><label>Provinsi <select id="province-select" aria-label="Pilih provinsi">' +
    PROVINCES_2024.map((p) => '<option value="' + p.name + '"' + (p.name === selected.name ? " selected" : "") + ">" + p.name + "</option>").join("") +
    "</select></label></div>" +
    '<div class="kpi-grid">' +
    '<article class="kpi"><p class="kpi-value">' + selected.population.toFixed(2).replace(".", ",") + " jt</p>" +
    '<p class="kpi-label">Penduduk ' + selected.name + " 2024</p>" +
    '<p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">' + provinceShare(selected).toFixed(1).replace(".", ",") + "%</p>" +
    '<p class="kpi-label">Pangsa penduduk Indonesia</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">' + selected.island + "</p>" +
    '<p class="kpi-label">Pulau</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    "</div>" +
    '<section class="chart-grid">' +
    '<article class="card"><h2>Sepuluh provinsi terpadat 2024</h2>' + chart + "</article>" +
    '<article class="card"><h2>Struktur umur 2024</h2>' + age +
    "<p>Indonesia masih menikmati bonus demografi: hampir 69% penduduk berada pada usia produktif (15–64 tahun).</p></article>" +
    "</section>" +
    '<section class="card"><h2>Catatan</h2><p>Enam dari sepuluh provinsi terpadat berada di Pulau Jawa, yang menampung ' +
    "sekitar 55% penduduk Indonesia di atas kurang dari 7% luas daratannya. " +
    'Lihat tabel lengkapnya di halaman <a href="#/regions">Provinsi</a>.</p></section>'
  );
}

export function viewEmployment() {
  const trend = lineChart(
    UNEMPLOYMENT.map((d) => ({ label: String(d.year), value: d.value })),
    {
      title: "Tingkat pengangguran terbuka 2019–2024",
      valueLabel: (v) => v.toFixed(2).replace(".", ",") + "%",
      tickFormat: (t) => t + "%",
    },
  );
  return (
    "<h1>Ketenagakerjaan</h1>" +
    '<p class="lede">Angkatan kerja dan pengangguran Indonesia, survei Agustus.</p>' +
    '<div class="kpi-grid">' +
    '<article class="kpi"><p class="kpi-value">' + LABOUR_2024.labourForce.value.toFixed(2).replace(".", ",") + " jt</p>" +
    '<p class="kpi-label">Angkatan kerja, Agustus 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">' + LABOUR_2024.employed.value.toFixed(2).replace(".", ",") + " jt</p>" +
    '<p class="kpi-label">Penduduk bekerja, Agustus 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">' + LABOUR_2024.unemployed.value.toFixed(2).replace(".", ",") + " jt</p>" +
    '<p class="kpi-label">Penganggur terbuka, Agustus 2024</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    '<article class="kpi"><p class="kpi-value">' + LABOUR_2024.participation.value.toFixed(2).replace(".", ",") + "%</p>" +
    '<p class="kpi-label">Tingkat partisipasi angkatan kerja</p><p class="kpi-source">Sumber: BPS, 2024</p></article>' +
    "</div>" +
    '<section class="chart-grid">' +
    '<article class="card"><h2>Tingkat pengangguran terbuka 2019–2024</h2>' + trend +
    srcLine("BPS, 2019–2024. Survei Angkatan Kerja Nasional, Agustus. Puncak 7,07% pada 2020 adalah dampak pandemi.") +
    "</article>" +
    '<article class="card"><h2>Upah minimum</h2>' +
    '<p class="big-number">Rp ' + formatNumber(UMP_DKI_2025.value, 0) + "</p>" +
    "<p><strong>UMP DKI Jakarta 2025</strong> — upah minimum provinsi tertinggi di Indonesia. " +
    "UMP ditetapkan tiap provinsi dan berbeda-beda menurut daerah.</p>" +
    srcLine("BPS / Pemprov DKI Jakarta, 2025.") +
    "<h3>Pekerja informal</h3>" +
    "<p><strong>" + LABOUR_2024.informalShare.value.toFixed(2).replace(".", ",") + "%</strong> penduduk bekerja berada di sektor informal pada Agustus 2024 (BPS).</p>" +
    "</article></section>"
  );
}

export function viewPrices() {
  const inflation = barChart(
    INFLATION.map((d) => ({ label: String(d.year), value: d.value })),
    {
      title: "Inflasi tahunan 2019–2024",
      valueLabel: (v) => v.toFixed(2).replace(".", ",") + "%",
      tickFormat: (t) => t + "%",
    },
  );
  const poverty = lineChart(
    POVERTY.map((d) => ({ label: String(d.year), value: d.value })),
    {
      title: "Tingkat kemiskinan 2019–2024",
      valueLabel: (v) => v.toFixed(2).replace(".", ",") + "%",
      tickFormat: (t) => t + "%",
    },
  );
  return (
    "<h1>Harga &amp; Kemiskinan</h1>" +
    '<p class="lede">Inflasi, kemiskinan, ketimpangan, dan pembangunan manusia.</p>' +
    '<div class="kpi-grid">' +
    kpi(HEADLINE.inflation2024, "1,57%") +
    kpi(HEADLINE.povertySep2024, "8,57%") +
    kpi(HEADLINE.giniSep2024, "0,381") +
    kpi(HEADLINE.hdi2024, "75,02") +
    kpi(HEADLINE.lifeExpectancy2024, "74,15 thn") +
    kpi(HEADLINE.meanSchooling2024, "9,32 thn") +
    "</div>" +
    '<section class="chart-grid">' +
    '<article class="card"><h2>Inflasi tahunan 2019–2024</h2>' + inflation +
    srcLine("BPS, 2019–2024. Inflasi IHK Desember, year-on-year. Lonjakan 2022 dipicu penyesuaian harga BBM bersubsidi.") +
    "</article>" +
    '<article class="card"><h2>Tingkat kemiskinan 2019–2024</h2>' + poverty +
    srcLine("BPS, 2019–2024. Survei September. Pada September 2024, 24,06 juta jiwa hidup di bawah garis kemiskinan.") +
    "</article></section>" +
    '<section class="card"><h2>Membaca angka-angka ini</h2>' +
    "<p><strong>Rasio Gini 0,381</strong> (September 2024) mengukur ketimpangan pengeluaran: 0 berarti pemerataan sempurna, " +
    "1 berarti ketimpangan total. <strong>IPM 75,02</strong> menempatkan Indonesia pada kategori pembangunan manusia tinggi, " +
    "dengan harapan hidup 74,15 tahun dan rata-rata lama sekolah 9,32 tahun (BPS, 2024).</p></section>"
  );
}

export function viewRegions(state) {
  const query = (state.search || "").toLowerCase();
  let rows = PROVINCES_2024.slice();
  if (query) {
    rows = rows.filter(
      (p) => p.name.toLowerCase().includes(query) || p.island.toLowerCase().includes(query),
    );
  }
  const key = state.sortKey || "population";
  const dir = state.sortDir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    const av = key === "name" ? a.name : key === "share" ? provinceShare(a) : a.population;
    const bv = key === "name" ? b.name : key === "share" ? provinceShare(b) : b.population;
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
  const arrow = (k) => (state.sortKey === k ? (state.sortDir === "asc" ? " ▲" : " ▼") : "");
  const body = rows
    .map(
      (p, i) =>
        "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" + p.island +
        "</td><td>" + p.population.toFixed(2).replace(".", ",") +
        "</td><td>" + provinceShare(p).toFixed(2).replace(".", ",") + "%</td></tr>",
    )
    .join("");
  return (
    "<h1>Provinsi</h1>" +
    '<p class="lede">Lima belas provinsi terpadat di Indonesia, pertengahan 2024. Klik judul kolom untuk mengurutkan, ketik untuk mencari.</p>' +
    '<div class="controls"><label>Cari provinsi atau pulau ' +
    '<input type="search" id="province-search" placeholder="mis. Jawa, Sumatera…" value="' +
    (state.search || "").replace(/"/g, "&quot;") + '" aria-label="Cari provinsi"></label></div>' +
    '<div class="table-wrap"><table><thead><tr>' +
    '<th scope="col">No</th>' +
    '<th scope="col"><button type="button" class="sort-btn" data-sort="name">Provinsi' + arrow("name") + "</button></th>" +
    '<th scope="col"><button type="button" class="sort-btn" data-sort="island">Pulau' + arrow("island") + "</button></th>" +
    '<th scope="col"><button type="button" class="sort-btn" data-sort="population">Penduduk (juta)' + arrow("population") + "</button></th>" +
    '<th scope="col"><button type="button" class="sort-btn" data-sort="share">Pangsa' + arrow("share") + "</button></th>" +
    "</tr></thead><tbody>" +
    (body || '<tr><td colspan="5">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>') +
    "</tbody></table></div>" +
    srcLine("BPS, 2024. Total penduduk Indonesia pertengahan 2024: " +
      formatNumber(TOTAL_POPULATION_2024, 1) + " juta jiwa.")
  );
}

export function viewMethodology() {
  return (
    "<h1>Metodologi &amp; Sumber</h1>" +
    '<p class="lede">Dari mana angka-angka di situs ini berasal dan apa artinya.</p>' +
    '<section class="card"><h2>Sumber data</h2>' +
    "<p>Seluruh angka di NusaStat berasal dari publikasi <strong>Badan Pusat Statistik (BPS)</strong> — " +
    "instansi resmi statistik Indonesia. Setiap angka di situs ini mencantumkan sumber dan tahunnya. " +
    "NusaStat bukan situs resmi BPS dan tidak berafiliasi dengan BPS; situs ini menyajikan ulang angka-angka " +
    "publik BPS dalam tampilan yang mudah dijelajahi.</p></section>" +
    '<section class="card"><h2>Definisi</h2><dl class="defs">' +
    "<dt>PDB harga berlaku</dt><dd>Nilai tambah seluruh barang dan jasa yang dihasilkan dalam setahun, dinilai pada harga tahun berjalan.</dd>" +
    "<dt>Pertumbuhan ekonomi</dt><dd>Perubahan PDB riil (harga konstan) terhadap tahun sebelumnya, dalam persen year-on-year.</dd>" +
    "<dt>Inflasi</dt><dd>Perubahan Indeks Harga Konsumen (IHK) terhadap periode yang sama tahun sebelumnya.</dd>" +
    "<dt>Tingkat pengangguran terbuka (TPT)</dt><dd>Pangsa angkatan kerja yang tidak bekerja dan sedang mencari pekerjaan, dari Survei Angkatan Kerja Nasional (Sakernas) Agustus.</dd>" +
    "<dt>Tingkat kemiskinan</dt><dd>Pangsa penduduk dengan pengeluaran per kapita di bawah garis kemiskinan, dari Survei Sosial Ekonomi Nasional (Susenas) September.</dd>" +
    "<dt>Rasio Gini</dt><dd>Ukuran ketimpangan pengeluaran dari 0 (merata sempurna) sampai 1 (timpang total).</dd>" +
    "<dt>IPM</dt><dd>Indeks Pembangunan Manusia: gabungan harapan hidup, pendidikan, dan standar hidup layak.</dd>" +
    "</dl></section>" +
    '<section class="card"><h2>Catatan</h2><ul class="facts">' +
    "<li>Angka penduduk adalah hasil proyeksi pertengahan tahun BPS 2024.</li>" +
    "<li>Pangsa provinsi dihitung terhadap total penduduk 281,6 juta jiwa dan dibulatkan ke dua desimal.</li>" +
    "<li>Struktur umur dibulatkan; jumlah pangsa adalah 100%.</li>" +
    "<li>Angka perdagangan dalam dolar AS; surplus adalah selisih ekspor dan impor.</li>" +
    "</ul></section>"
  );
}

export function renderRoute(route, state) {
  switch (route) {
    case "economy": return viewEconomy(state);
    case "population": return viewPopulation(state);
    case "employment": return viewEmployment();
    case "prices": return viewPrices();
    case "regions": return viewRegions(state);
    case "methodology": return viewMethodology();
    case "overview":
    default: return viewOverview();
  }
}
