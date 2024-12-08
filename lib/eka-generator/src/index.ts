import { exit } from "process";
import kbdKeyMaps from "./kbd";
import { readLayoutTemplate, writeLayout } from "./mac";

async function main() {
  const kbd = kbdKeyMaps();
  const parsedLayout = await readLayoutTemplate();
  macTransform(kbd, parsedLayout);
  console.log(parsedLayout);
  await writeLayout(parsedLayout);
}

function macTransform(kbd: string[][], parsedLayout: any) {
  kbd.forEach((key) => {
    const code = key[6];
    const outputs = [
      key[4], // main
      key[0], // shift
      key[8], // alt
      key[2], // shiftalt
      key[5], // cmd
      key[3], // shiftcmd
    ];
    parsedLayout.keyboard.keyMapSet.keyMap.forEach(
      (keyMap: any, index: number) => {
        const keyIndex = keyMap.key.findIndex(
          (key: any) => key["@_code"] == code,
        );
        if (keyIndex < 0) {
          console.error("AYYAYYAOOO " + code);
          exit();
        }
        if (outputs[index] !== undefined) {
          keyMap.key[keyIndex]["@_output"] = outputs[index];
        } else if (outputs[0] !== undefined) {
          keyMap.key[keyIndex]["@_output"] = outputs[0];
        }
      },
    );
  });
}

main();
