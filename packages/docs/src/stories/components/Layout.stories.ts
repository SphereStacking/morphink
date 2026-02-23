import type { Meta, StoryObj } from '@storybook/vue3'
import { Grid, Stack, Card, Text, Heading } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Layout',
  argTypes: {
    columns: { control: 'text' },
    gap: { control: 'text' },
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
  },
  args: {
    columns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    direction: 'column',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Grid, Stack, Card, Text, Heading },
    setup() {
      return { args }
    },
    template: `
      <Stack :direction="args.direction" gap="16px">
        <Heading :level="4">レイアウトプレビュー</Heading>
        <Grid :columns="args.columns" :gap="args.gap">
          <Card>
            <Heading :level="5">ブロックA</Heading>
            <Text>構成を試すためのカード。</Text>
          </Card>
          <Card>
            <Heading :level="5">ブロックB</Heading>
            <Text>グリッド列数と間隔を調整。</Text>
          </Card>
          <Card>
            <Heading :level="5">ブロックC</Heading>
            <Text>Stack方向を切り替え可能。</Text>
          </Card>
        </Grid>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Grid, Stack, Card, Text, Heading },
    template: `
      <div style="display: grid; gap: 30px;">
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="16px">
            <Heading :level="4">Default layout</Heading>
            <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap="16px">
              <Card>
                <Heading :level="5">Block A</Heading>
                <Text>Card content</Text>
              </Card>
              <Card>
                <Heading :level="5">Block B</Heading>
                <Text>Card content</Text>
              </Card>
              <Card>
                <Heading :level="5">Block C</Heading>
                <Text>Card content</Text>
              </Card>
            </Grid>
          </Stack>
        </div>
        <div class="border border-[var(--color-border)]"></div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">direction</div>
          <Stack direction="row" gap="16px">
            <Card>
              <Heading :level="5">Row A</Heading>
              <Text>Stack row</Text>
            </Card>
            <Card>
              <Heading :level="5">Row B</Heading>
              <Text>Stack row</Text>
            </Card>
          </Stack>
          <Stack direction="column" gap="16px">
            <Card>
              <Heading :level="5">Column A</Heading>
              <Text>Stack column</Text>
            </Card>
            <Card>
              <Heading :level="5">Column B</Heading>
              <Text>Stack column</Text>
            </Card>
          </Stack>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">columns</div>
          <Grid columns="repeat(2, minmax(0, 1fr))" gap="16px">
            <Card>
              <Heading :level="5">2 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
            <Card>
              <Heading :level="5">2 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
          </Grid>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="16px">
            <Card>
              <Heading :level="5">3 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
            <Card>
              <Heading :level="5">3 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
            <Card>
              <Heading :level="5">3 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
          </Grid>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">gap</div>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="8px">
            <Card>
              <Heading :level="5">8px</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">8px</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">8px</Heading>
              <Text>Grid gap</Text>
            </Card>
          </Grid>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="24px">
            <Card>
              <Heading :level="5">24px</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">24px</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">24px</Heading>
              <Text>Grid gap</Text>
            </Card>
          </Grid>
        </div>
      </div>
    `,
  }),
}
