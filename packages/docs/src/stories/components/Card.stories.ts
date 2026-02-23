import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Card, SectionHeader, Text, Button, Stack, Divider } from '@ink-ui/ui'
import { componentRounded, componentShadow, componentVariants } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Card },
    rounded: { control: { type: 'select' }, options: componentRounded.Card },
    shadow: { control: { type: 'select' }, options: componentShadow.Card },
  },
  args: {
    variant: 'elevated',
    rounded: 'lg',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Card, SectionHeader, Text, Button, Stack, Divider },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Card :variant="args.variant" :rounded="args.rounded" :shadow="args.shadow">
          <template #header>
            <SectionHeader>
              <template #title>Featured Collection</template>
              <template #subtitle>Curated for easy discovery</template>
              <template #action>
                <Button size="sm" variant="outline">View All</Button>
              </template>
            </SectionHeader>
          </template>
          <Text>Use cards to group information and surface actions.</Text>
          <Divider />
          <Text muted>Supplementary info placed below the body.</Text>
        </Card>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Card, SectionHeader, Text, Button, Stack, Divider },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Card>
              <template #header>
                <SectionHeader>
                  <template #title>Default</template>
                  <template #subtitle>Card subtitle</template>
                </SectionHeader>
              </template>
              <Text>Card content</Text>
              <Divider />
              <Text muted>Sub content</Text>
            </Card>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack gap="12px">
            <Card variant="elevated">
              <Text>Elevated</Text>
            </Card>
            <Card variant="outline">
              <Text>Outline</Text>
            </Card>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack gap="12px">
            <Card rounded="sm">
              <Text>Rounded sm</Text>
            </Card>
            <Card rounded="md">
              <Text>Rounded md</Text>
            </Card>
            <Card rounded="lg">
              <Text>Rounded lg</Text>
            </Card>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack gap="12px">
            <Card shadow="none">
              <Text>Shadow none</Text>
            </Card>
            <Card shadow="sm">
              <Text>Shadow sm</Text>
            </Card>
            <Card shadow="md">
              <Text>Shadow md</Text>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
