import { parse } from "../android/parser.mjs";
import { readFileWrapper, writeFileWrapper } from "./utils/file";

const ANDROID_TEMPLATE = "lib/eka-generator/android/eka-template.kcm";
const ANDROID_OUTPUT = "lib/eka-generator/android/eka-rebuilt.kcm";

// const outputs = [
//   key[4], // main
//   key[0], // shift
//   key[8], // alt
//   key[2], // shiftalt
//   key[5], // cmd
//   key[3], // shiftcmd
// ];
// kbd = ["ೄ", null, "ೠ", "Q", "ೃ", "q", "12", null, "ಋ"];
// key Q {
//   label:                              '\u0C8B'
//   base:                               '\u0CC3'
//   shift, capslock:                    '\u0CC4'
//   alt:                                '\u0C8B'
//   alt+shift:                          '\u0CE0'
//   ctrl, meta:                         'a'
//   ctrl+shift, meta+shift:             'A'
// }

const numberLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const labelExceptions = ["L", "Z"];

function updateKCM(inputKCM: KCM, _kbd: string[][]): KCM {
  let kbd = [..._kbd.map((v) => [...v])];
  const newKCM = {
    type: inputKCM.type,
    values: inputKCM.values.map((val) => {
      if (val.type === "comment") {
        return { ...val };
      } else {
        const kdbIndex = kbd.findIndex(
          (v) => v[3] === val.key || v[4] === val.key
        );
        if (kdbIndex === -1) return { ...val };
        const updates = processKeys(kbd.splice(kdbIndex, 1)[0]);
        console.log({ updates });
        const value: Record<string, string>[] = [];
        if (!updates[4]) process.exit();
        if (updates[4]) {
          value.push({
            label:
              updates[8] &&
              !labelExceptions.includes(val.key) &&
              !numberLabels.includes(val.key)
                ? updates[8]
                : updates[4],
          });
          value.push({ base: updates[4] });
        }
        if (updates[0]) {
          value.push({
            [numberLabels.includes(val.key) ? "shift" : "shift, capslock"]:
              val.key === "7" ? "&" : updates[0],
          });
        }
        if (updates[8]) {
          value.push({ alt: updates[8] });
        }
        if (updates[2]) {
          value.push({ "alt+shift": updates[2] });
        }
        if (updates[5]) {
          value.push({ "ctrl, meta": updates[5] });
        }
        if (updates[3]) {
          value.push({ "ctrl+shift, meta+shift": updates[3] });
        }

        return {
          type: val.type,
          key: val.key,
          value,
        };
      }
    }),
  };
  return newKCM;
}

const rebuild = (parsedTemplate: KCM) => {
  const templateRebuilt =
    `type ${parsedTemplate.type}\n` +
    parsedTemplate.values
      .map((entry) =>
        entry.type == "comment"
          ? `###${entry.value}\n`
          : `key ${entry.key} {\n` +
            entry.value
              .map(
                (kv) =>
                  `    ${Object.keys(kv)[0]}:`.padEnd(40, " ") +
                  `'${Object.values(kv)[0]}'\n`
              )
              .join("") +
            `}\n`
      )
      .join("");

  writeFileWrapper(ANDROID_OUTPUT, templateRebuilt);

  return templateRebuilt;
};

const processKeys = (keys: string[]) =>
  keys.map((key) => {
    if (!key || (key.codePointAt(0) || 0) < 256) return key;
    var hex = key.codePointAt(0)?.toString(16);
    console.log({ hex });
    return hex
      ? "\\u" + "0000".substring(0, 4 - hex.length || 0) + hex
      : "\\u0000";
  });

interface KCM {
  type: "OVERLAY";
  values: (KCMComment | KCMKeyDef)[];
}

interface KCMComment {
  type: "comment";
  value: string;
}

interface KCMKeyDef {
  type: "key";
  key: string;
  value: Record<string, string>[];
}

export async function main(kbd: string[][]) {
  const kcm = parse(await readFileWrapper(ANDROID_TEMPLATE)) as KCM;
  const updatedKCM = updateKCM(kcm, kbd);
  console.log(updatedKCM);
  rebuild(updatedKCM);
}
