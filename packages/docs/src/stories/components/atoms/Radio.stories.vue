<script setup lang="ts">
import { ref } from 'vue'
import { Radio, RadioGroup, Stack } from '@morphink/ui'
import { componentDurations, componentEasings, componentSizes, componentTones, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const selected = ref('apple')

const { Story } = defineMeta({
  title: 'Components/Atoms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Radio },
    tone: { control: { type: 'select' }, options: componentTones.Radio },
    size: { control: { type: 'select' }, options: componentSizes.Radio },
    orientation: { control: { type: 'select' }, options: ['vertical', 'horizontal'] },
    duration: { control: { type: 'select' }, options: componentDurations.Radio },
    easing: { control: { type: 'select' }, options: componentEasings.Radio },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'outline',
    tone: 'primary',
    size: 'md',
    orientation: 'vertical',
    duration: 'fast',
    easing: 'standard',
    disabled: false,
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <RadioGroup v-bind="args" v-model="selected">
        <div class="flex items-center gap-2">
          <Radio value="apple" id="apple" />
          <label for="apple" class="text-sm text-[var(--morphink-color-foreground)]">Apple</label>
        </div>
        <div class="flex items-center gap-2">
          <Radio value="banana" id="banana" />
          <label for="banana" class="text-sm text-[var(--morphink-color-foreground)]">Banana</label>
        </div>
        <div class="flex items-center gap-2">
          <Radio value="cherry" id="cherry" />
          <label for="cherry" class="text-sm text-[var(--morphink-color-foreground)]">Cherry</label>
        </div>
      </RadioGroup>
      <p class="mt-4 text-sm text-[var(--morphink-color-muted-foreground)]">
        Selected: {{ selected }}
      </p>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack direction="row" gap="xl">
      <div v-for="v in ['outline', 'solid', 'ghost', 'soft']" :key="v">
        <p class="mb-2 text-xs font-medium text-[var(--morphink-color-muted-foreground)]">
          {{ v }}
        </p>
        <RadioGroup :variant="v" default-value="a">
          <div class="flex items-center gap-2">
            <Radio value="a" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Option A</span>
          </div>
          <div class="flex items-center gap-2">
            <Radio value="b" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Option B</span>
          </div>
        </RadioGroup>
      </div>
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack direction="row" gap="xl" wrap>
      <div
        v-for="t in ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'destructive']"
        :key="t"
      >
        <p class="mb-2 text-xs font-medium text-[var(--morphink-color-muted-foreground)]">
          {{ t }}
        </p>
        <RadioGroup :tone="t" default-value="a" orientation="horizontal">
          <div class="flex items-center gap-2">
            <Radio value="a" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">A</span>
          </div>
          <div class="flex items-center gap-2">
            <Radio value="b" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">B</span>
          </div>
        </RadioGroup>
      </div>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="row" gap="xl" align="start">
      <div v-for="s in ['xs', 'sm', 'md', 'lg', 'xl']" :key="s">
        <p class="mb-2 text-xs font-medium text-[var(--morphink-color-muted-foreground)]">
          {{ s }}
        </p>
        <RadioGroup :size="s" default-value="a" orientation="horizontal">
          <div class="flex items-center gap-2">
            <Radio value="a" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">A</span>
          </div>
          <div class="flex items-center gap-2">
            <Radio value="b" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">B</span>
          </div>
        </RadioGroup>
      </div>
    </Stack>
  </Story>

  <Story name="Disabled" asChild>
    <RadioGroup disabled default-value="a">
      <div class="flex items-center gap-2">
        <Radio value="a" id="d-a" />
        <label for="d-a" class="text-sm text-[var(--morphink-color-foreground)]"
          >Selected (disabled)</label
        >
      </div>
      <div class="flex items-center gap-2">
        <Radio value="b" id="d-b" />
        <label for="d-b" class="text-sm text-[var(--morphink-color-foreground)]"
          >Unselected (disabled)</label
        >
      </div>
    </RadioGroup>
  </Story>

  <Story name="Horizontal" asChild>
    <RadioGroup orientation="horizontal" default-value="sm">
      <div class="flex items-center gap-2">
        <Radio value="sm" id="h-sm" />
        <label for="h-sm" class="text-sm text-[var(--morphink-color-foreground)]">Small</label>
      </div>
      <div class="flex items-center gap-2">
        <Radio value="md" id="h-md" />
        <label for="h-md" class="text-sm text-[var(--morphink-color-foreground)]">Medium</label>
      </div>
      <div class="flex items-center gap-2">
        <Radio value="lg" id="h-lg" />
        <label for="h-lg" class="text-sm text-[var(--morphink-color-foreground)]">Large</label>
      </div>
    </RadioGroup>
  </Story>
</template>
