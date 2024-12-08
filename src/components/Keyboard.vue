<script setup lang="ts">
import { computed, PropType } from "vue";

enum KeyStyle {
  "SINGLE" = "SINGLE",
  "DOUBLE" = "DOUBLE",
  "CUSTOM" = "CUSTOM",
}

interface Key {
  w?: number;
  h?: number;
  l?: number;
  t?: number;
  labels: string[];
  keyStyle: KeyStyle;
}

interface Keyboard {
  name: string;
  width: number;
  height: number;
  nameEn: string;
  owner: string;
  board: Key[][];
}

const props = defineProps({
  keyboard: { type: Object as PropType<Keyboard>, required: true },
});

const unit = "80px";

const renderableKeyboard = computed(() => {
  return {
    ...props.keyboard,
    board: props.keyboard.board.map((r) =>
      r.map((k) => ({
        w: 1,
        h: 1,
        ...k,
      }))
    ),
  } as Keyboard;
});
console.log({ renderableKeyboard });
</script>
<template>
  <div class="kb">
    <h2 class="kb-title">{{ renderableKeyboard.name }}</h2>
    <div class="kb-outline">
      <div class="kb-row" v-for="row in renderableKeyboard.board">
        <div
          class="kb-key"
          :class="{ centered: key.labels.length === 1 }"
          v-for="key in row"
          :style="{
            aspectRatio: key.w / key.h,
            width: 'auto',
            height: 'calc(' + unit + ' * ' + key.h + ')',
            ...(key.l || key.t
              ? {
                  position: 'absolute',
                  left: 'calc(' + unit + ' * ' + key.l + ')',
                  top: 'calc(' + unit + ' * ' + key.t + ')',
                }
              : {}),
          }"
          v-html="
            key.labels.length === 1 ? key.labels[0] : key.labels.join(' ')
          "
        />
      </div>
    </div>
  </div>
</template>
<style>
.kb {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kb-outline {
  border: 1px solid var(--eka-primary-color);
  display: flex;
  flex-direction: column;
  padding: 6px;
  border-radius: 6px;
}

.kb-row {
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  position: relative;
}

.kb-key {
  border: 1px solid var(--eka-primary-color);
  margin: 2px;
  overflow: hidden;
  border-radius: 4px;

  &.centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
