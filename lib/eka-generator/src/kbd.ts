import kbddef from "../kle-source/eka-kannada-keyboard.kbd.json";
import { Serial } from "@ijprest/kle-serial";

const INTERESTED_RAGES: [number, number][] = [
  [15, 25], // 0-9
  [29, 39], // q-p
  [43, 52], // a-l
  [56, 63], // z-m
];

const inRange = (index: number): boolean =>
  INTERESTED_RAGES.findIndex((range) => range[0] <= index && index < range[1]) >
  -1;

export default function kbdKeyMaps() {
  return Serial.deserialize(kbddef)
    .keys.filter((_, i) => inRange(i))
    .map((k) => k.labels);
}
