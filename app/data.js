// NusaStat data: figures published by Badan Pusat Statistik (BPS), Indonesia.
// Every figure below carries its source and year on the page that shows it.
// Values are the BPS-published headline numbers; see app/methodology via the
// Methodology page for definitions and how each series is compiled.

export const SOURCE = "BPS (Badan Pusat Statistik)";

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

// GDP at current prices, Rp trillion (BPS, 2019-2024).
export const GDP_NOMINAL = [
  { year: 2019, value: 15833 },
  { year: 2020, value: 15444 },
  { year: 2021, value: 16977 },
  { year: 2022, value: 19588 },
  { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// Real GDP growth, % year-on-year (BPS, 2019-2024).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// GDP per capita at current prices, Rp million (BPS, 2019-2024).
export const GDP_PER_CAPITA = [
  { year: 2019, value: 59.3 },
  { year: 2020, value: 57.3 },
  { year: 2021, value: 62.2 },
  { year: 2022, value: 71.0 },
  { year: 2023, value: 75.0 },
  { year: 2024, value: 78.6 },
];

// Consumer price inflation, % year-on-year in December (BPS, 2019-2024).
export const INFLATION = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Open unemployment rate (TPT), % of labour force, August survey (BPS, 2019-2024).
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Poverty rate, % of population, September survey (BPS, 2019-2024).
export const POVERTY = [
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Headline indicators, latest year available (BPS).
export const HEADLINE = {
  populationMid2024: { value: 281.6, unit: "juta jiwa", label: "Penduduk (pertengahan 2024)", source: "BPS, 2024" },
  gdp2024: { value: 22139, unit: "Rp triliun", label: "PDB harga berlaku 2024", source: "BPS, 2024" },
  gdpGrowth2024: { value: 5.03, unit: "%", label: "Pertumbuhan ekonomi 2024", source: "BPS, 2024" },
  inflation2024: { value: 1.57, unit: "% y-on-y", label: "Inflasi Desember 2024", source: "BPS, 2024" },
  unemploymentAug2024: { value: 4.91, unit: "%", label: "Pengangguran Agustus 2024", source: "BPS, 2024" },
  povertySep2024: { value: 8.57, unit: "%", label: "Kemiskinan September 2024", source: "BPS, 2024" },
  hdi2024: { value: 75.02, unit: "poin", label: "Indeks Pembangunan Manusia 2024", source: "BPS, 2024" },
  giniSep2024: { value: 0.381, unit: "rasio", label: "Rasio Gini September 2024", source: "BPS, 2024" },
  lifeExpectancy2024: { value: 74.15, unit: "tahun", label: "Harapan hidup 2024", source: "BPS, 2024" },
  meanSchooling2024: { value: 9.32, unit: "tahun", label: "Rata-rata lama sekolah 2024", source: "BPS, 2024" },
};

// Labour market, August 2024 (BPS).
export const LABOUR_2024 = {
  labourForce: { value: 152.11, unit: "juta orang", label: "Angkatan kerja" },
  employed: { value: 144.64, unit: "juta orang", label: "Penduduk bekerja" },
  unemployed: { value: 7.47, unit: "juta orang", label: "Penganggur terbuka" },
  participation: { value: 70.63, unit: "%", label: "Tingkat partisipasi angkatan kerja" },
  informalShare: { value: 59.17, unit: "%", label: "Pekerja informal" },
};

// International trade, 2024 (BPS): exports, imports and balance, US$ billion.
export const TRADE_2024 = {
  exports: { value: 264.7, unit: "US$ miliar", label: "Ekspor 2024" },
  imports: { value: 233.66, unit: "US$ miliar", label: "Impor 2024" },
  surplus: { value: 31.04, unit: "US$ miliar", label: "Surplus neraca perdagangan 2024" },
};

// Minimum wage, DKI Jakarta 2025 (BPS / Pemprov DKI Jakarta).
export const UMP_DKI_2025 = { value: 5396761, unit: "Rp/bulan", label: "UMP DKI Jakarta 2025" };

// Age structure, 2024 (BPS, rounded shares).
export const AGE_STRUCTURE_2024 = [
  { group: "0–14 tahun", share: 24.6 },
  { group: "15–64 tahun", share: 68.9 },
  { group: "65+ tahun", share: 6.5 },
];

// Population of the 15 largest provinces, mid-2024 (BPS), in millions.
export const PROVINCES_2024 = [
  { name: "Jawa Barat", population: 50.35, island: "Jawa" },
  { name: "Jawa Timur", population: 41.81, island: "Jawa" },
  { name: "Jawa Tengah", population: 37.89, island: "Jawa" },
  { name: "Sumatera Utara", population: 15.59, island: "Sumatera" },
  { name: "Banten", population: 12.43, island: "Jawa" },
  { name: "DKI Jakarta", population: 10.56, island: "Jawa" },
  { name: "Sulawesi Selatan", population: 9.46, island: "Sulawesi" },
  { name: "Lampung", population: 9.45, island: "Sumatera" },
  { name: "Sumatera Selatan", population: 9.01, island: "Sumatera" },
  { name: "Riau", population: 7.01, island: "Sumatera" },
  { name: "Sumatera Barat", population: 6.06, island: "Sumatera" },
  { name: "Kalimantan Barat", population: 5.83, island: "Kalimantan" },
  { name: "Aceh", population: 5.55, island: "Sumatera" },
  { name: "Bali", population: 4.41, island: "Bali" },
  { name: "DI Yogyakarta", population: 3.76, island: "Jawa" },
];

export const TOTAL_POPULATION_2024 = 281.6;

export function provinceShare(province) {
  return (province.population / TOTAL_POPULATION_2024) * 100;
}

export function formatNumber(value, decimals) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
