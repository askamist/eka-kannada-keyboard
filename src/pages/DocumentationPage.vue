<script setup lang="ts">
import source from "../../lib/eka-generator/kle-source/eka-kannada-keyboard.kbd.json";
import keyboard from "../../lib/eka-generator/kle-source/eka.src.json";

const parseKey = (key: any) => {
  return {
    w: 1,
    h: 1,
  };
};

const parseLine = (_line: any) => {
  const line = [..._line];
  const newLine: {}[] = [];
  while (line.length > 0) {
    const keyDesc = line.shift();
    const keyStr = line.shift().split("\n");
    newLine.push({
      ...parseKey(keyDesc),
      labels: keyStr,
    });
  }
  return newLine;
};

const sourceTwo = {
  nameEn: "eka kannada keyboard",
  name: "ಏಕ ಕನ್ನಡ ಕೀಲಿಮಣೆ",
  owner: "S K Amarnath",
  board: [...source.splice(1).map(parseLine)],
};

setTimeout(() => console.log(JSON.stringify(sourceTwo)));
</script>

<template>
  <Keyboard :keyboard="keyboard" />
</template>
