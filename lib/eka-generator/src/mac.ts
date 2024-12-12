import { exit } from "node:process";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

import { readFileWrapper, writeFileWrapper } from "./utils/file";

const MAC_TEMPLATE = "lib/eka-generator/mac/eka-template.keylayout";

async function readLayoutTemplate() {
  const templateString = await readFileWrapper(MAC_TEMPLATE);

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    processEntities: true,
    attributeValueProcessor: (name, value) =>
      name === "output" && value === "" ? " " : value,
  });
  const parsedTemplate = xmlParser.parse(templateString);

  return parsedTemplate;
}

async function writeLayout(parsedTemplate: any) {
  const xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: "    ",
    suppressEmptyNode: true,
    processEntities: false,
    unpairedTags: ["!DOCTYPE"],
  });
  const templateRebuilt = xmlBuilder.build({
    "?xml": parsedTemplate["?xml"],
    "!DOCTYPE": {
      "@_keyboard": true,
      "@_PUBLIC": true,
      '@_""': true,
      '@_"file://localhost/System/Library/DTDs/KeyboardLayout.dtd"': true,
    },
    keyboard: parsedTemplate.keyboard,
  });

  writeFileWrapper("eka-generator/mac/eka-rebuilt.keylayout", templateRebuilt);

  return templateRebuilt;
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
          (key: any) => key["@_code"] == code
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
      }
    );
  });
}

export async function main(kbd: string[][]) {
  const parsedLayout = await readLayoutTemplate();
  macTransform(kbd, parsedLayout);
  console.log(parsedLayout);
  await writeLayout(parsedLayout);
}
