import kbdKeyMaps from "./kbd";
import { readLayoutTemplate } from "./mac";

async function main() {
  const kbd = kbdKeyMaps();
  console.log(kbd);
  const parsedLayout = await readLayoutTemplate();
  console.log(parsedLayout);
  console.log(parsedLayout[1]);
}

main();
