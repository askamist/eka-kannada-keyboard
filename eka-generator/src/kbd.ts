import kbddef from "../kle-source/eka-kannada-keyboard.kbd.json";
import { Serial } from "@ijprest/kle-serial";

const INTERESTED_RAGES: [number, number][] = [
  [15, 25],
  [29, 39],
  [43, 52],
  [56, 63],
];

const inRange = (index: number): boolean =>
  INTERESTED_RAGES.findIndex((range) => range[0] <= index && index < range[1]) >
  -1;

export default function kbdKeyMaps() {
  return Serial.deserialize(kbddef)
    .keys.filter((_, i) => inRange(i))
    .map((k) => k.labels);
}
