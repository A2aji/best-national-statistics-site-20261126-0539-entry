// NusaStat entry program: copies app/ and screenshots/ from this repository
// into the output directory and writes dossier.json with buildDossier from
// vendor/makefun-frontend.ts. Node 22, standard library only. Deterministic:
// two runs over the same repository write identical bytes.

import { buildDossier } from "./vendor/makefun-frontend.ts";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

function sortedEntries(dir: string): string[] {
  const names = readdirSync(dir).sort();
  const out: string[] = [];
  for (const name of names) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      for (const sub of sortedEntries(full)) out.push(join(name, sub));
    } else if (st.isFile()) {
      out.push(name);
    }
  }
  return out;
}

function copyTree(srcDir: string, destDir: string): void {
  for (const rel of sortedEntries(srcDir)) {
    const src = join(srcDir, rel);
    const dest = join(destDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    const bytes = readFileSync(src);
    writeFileSync(dest, bytes);
  }
}

function main(): void {
  const appDir = join(repoRoot, "app");
  const shotsDir = join(repoRoot, "screenshots");
  if (!existsSync(appDir)) throw new Error("app/ not found in repository");
  if (!existsSync(shotsDir)) throw new Error("screenshots/ not found in repository");

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(join(outDir, "app"), { recursive: true });
  mkdirSync(join(outDir, "screenshots"), { recursive: true });

  copyTree(appDir, join(outDir, "app"));
  copyTree(shotsDir, join(outDir, "screenshots"));

  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
    app_path_max_bytes: 1000,
  });
  writeFileSync(join(outDir, "dossier.json"), dossier);
}

main();
