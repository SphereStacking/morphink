import type { Meta, StoryObj } from '@storybook/vue3'
import { SectionHeader, Button, Stack, Text } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/SectionHeader',
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showSubtitle: { control: 'boolean' },
    showAction: { control: 'boolean' },
    actionLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    title: '注目コンテンツ',
    subtitle: '最新の更新をまとめて表示します。',
    showSubtitle: true,
    showAction: true,
    actionLabel: 'すべて見る',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { SectionHeader, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Text muted>セクションの見出しとアクションを整理します。</Text>
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
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <SectionHeader>
            <template #title>Default</template>
            <template #subtitle>Subtitle</template>
            <template #action>
              <Button size="sm" variant="outline">Action</Button>
            </template>
          </SectionHeader>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack gap="12px">
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
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">showSubtitle</div>
          <Stack gap="12px">
            <SectionHeader>
              <template #title>Subtitle on</template>
              <template #subtitle>Subtitle</template>
            </SectionHeader>
            <SectionHeader>
              <template #title>Subtitle off</template>
            </SectionHeader>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">showAction</div>
          <Stack gap="12px">
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
