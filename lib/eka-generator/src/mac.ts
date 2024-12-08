import { XMLParser, XMLBuilder } from "fast-xml-parser";

import { readFileWrapper, writeFileWrapper } from "./utils/file";

const MAC_TEMPLATE = "eka-generator/mac/eka-template.keylayout";

export async function readLayoutTemplate() {
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

export async function writeLayout(parsedTemplate: any) {
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
