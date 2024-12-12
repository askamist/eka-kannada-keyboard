import { main as macMain } from "./mac";
import { main as androidMain } from "./android";
import kbdKeyMaps from "./kbd";

function main() {
  const kbd = kbdKeyMaps();
  // macMain(kbd);
  androidMain(kbd);
}

main();
