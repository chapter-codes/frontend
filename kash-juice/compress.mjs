// compress.js
import { exec } from "child_process";
import { readdirSync } from "fs";
import { extname, join } from "path";

const inputDir = "./assets/images";
const outputDir = "./assets/images/compressed";

// allowed image extensions
const exts = [".jpg", ".jpeg", ".png", ];

// get list of files in inputDir
const files = readdirSync(inputDir).filter(file =>
  exts.includes(extname(file).toLowerCase())
);

async function compressFiles() {
  for (const file of files) {
    const inputPath = join(inputDir, file);
    console.log(`👉 Compressing: ${file}`);

    await new Promise((resolve, reject) => {
      exec(
        `npx @squoosh/cli --webp "{\\"quality\\":75}" --output-dir ${outputDir} "${inputPath}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ Error with ${file}:`, stderr);
            reject(error);
          } else {
            console.log(`✅ Done: ${file}`);
            resolve();
          }
        }
      );
    });
  }

  console.log("🎉 All images compressed!");
}

compressFiles();
