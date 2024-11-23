import { readFile, writeFile } from "node:fs";

export async function readFileWrapper(filepath: string) {
  return new Promise<string>((resolve, reject) => {
    readFile(filepath, "utf-8", (err, data) =>
      err ? reject(err) : resolve(data),
    );
  });
}

export async function writeFileWrapper(filepath: string, content: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(filepath, content, (err) => (err ? reject(err) : resolve()));
  });
}
