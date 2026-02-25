import { SectionHeader, Button, Stack, Text } from '@morphink/ui'
import { componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Atoms/SectionHeader',
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.SectionHeader },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showSubtitle: { control: 'boolean' },
    showAction: { control: 'boolean' },
    actionLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    title: 'Featured Content',
    subtitle: 'A summary of the latest updates.',
    showSubtitle: true,
    showAction: true,
    actionLabel: 'View All',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { SectionHeader, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Text muted>Organize section headings and actions.</Text>
        <SectionHeader :size="args.size">
          <template #title>{{ args.title }}</template>
          <template v-if="args.showSubtitle" #subtitle>{{ args.subtitle }}</template>
          <template v-if="args.showAction" #action>
            <Button size="sm" variant="outline">{{ args.actionLabel }}</Button>
          </template>
        </SectionHeader>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { SectionHeader, Button, Stack, Text },
    template: `
      <Stack gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <SectionHeader>
            <template #title>Default</template>
            <template #subtitle>Subtitle</template>
            <template #action>
              <Button size="sm" variant="outline">Action</Button>
            </template>
          </SectionHeader>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack gap="md">
            <SectionHeader size="sm">
              <template #title>Small</template>
              <template #subtitle>Subtitle</template>
              <template #action>
                <Button size="sm" variant="ghost">Action</Button>
              </template>
            </SectionHeader>
            <SectionHeader size="md">
              <template #title>Medium</template>
              <template #subtitle>Subtitle</template>
              <template #action>
                <Button size="sm">Action</Button>
              </template>
            </SectionHeader>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">showSubtitle</div>
          <Stack gap="md">
            <SectionHeader>
              <template #title>Subtitle on</template>
              <template #subtitle>Subtitle</template>
            </SectionHeader>
            <SectionHeader>
              <template #title>Subtitle off</template>
            </SectionHeader>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">showAction</div>
          <Stack gap="md">
            <SectionHeader>
              <template #title>Action on</template>
              <template #action>
                <Button size="sm" variant="outline">Action</Button>
              </template>
            </SectionHeader>
            <SectionHeader>
              <template #title>Action off</template>
            </SectionHeader>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
