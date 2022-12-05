import { readFile } from "fs/promises";

export async function fetchInput(path: string): Promise<string> {
    return await readFile(`${__dirname}/${path}`, "utf-8");
  }