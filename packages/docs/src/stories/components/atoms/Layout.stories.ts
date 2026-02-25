import { Grid, Stack, Card, Text, Heading } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Atoms/Layout',
  argTypes: {
    columns: { control: 'text' },
    gap: {
      control: { type: 'select' },
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
  },
  args: {
    columns: 'auto-fit',
    gap: 'lg',
    direction: 'column',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Grid, Stack, Card, Text, Heading },
    setup() {
      return { args }
    },
    template: `
      <Stack :direction="args.direction" gap="lg">
        <Heading :level="4">Layout Preview</Heading>
        <Grid :columns="args.columns" :gap="args.gap">
          <Card>
            <Heading :level="5">Block A</Heading>
            <Text>A card for testing composition.</Text>
          </Card>
          <Card>
            <Heading :level="5">Block B</Heading>
            <Text>Adjust grid columns and gap.</Text>
          </Card>
          <Card>
            <Heading :level="5">Block C</Heading>
            <Text>Toggle stack direction.</Text>
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
      <Stack gap="2xl">
        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Stack gap="lg">
            <Heading :level="4">Default layout</Heading>
            <Grid min-width="200px" gap="lg">
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
        </Stack>

        <div class="border border-[var(--morphink-color-border)]"></div>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">direction</div>
          <Stack direction="row" gap="lg">
            <Card>
              <Heading :level="5">Row A</Heading>
              <Text>Stack row</Text>
            </Card>
            <Card>
              <Heading :level="5">Row B</Heading>
              <Text>Stack row</Text>
            </Card>
          </Stack>
          <Stack direction="column" gap="lg">
            <Card>
              <Heading :level="5">Column A</Heading>
              <Text>Stack column</Text>
            </Card>
            <Card>
              <Heading :level="5">Column B</Heading>
              <Text>Stack column</Text>
            </Card>
          </Stack>
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">columns</div>
          <Grid :columns="2" gap="lg">
            <Card>
              <Heading :level="5">2 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
            <Card>
              <Heading :level="5">2 cols</Heading>
              <Text>Grid columns</Text>
            </Card>
          </Grid>
          <Grid :columns="3" gap="lg">
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
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">gap</div>
          <Grid :columns="3" gap="sm">
            <Card>
              <Heading :level="5">sm (8px)</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">sm</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">sm</Heading>
              <Text>Grid gap</Text>
            </Card>
          </Grid>
          <Grid :columns="3" gap="xl">
            <Card>
              <Heading :level="5">xl (24px)</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">xl</Heading>
              <Text>Grid gap</Text>
            </Card>
            <Card>
              <Heading :level="5">xl</Heading>
              <Text>Grid gap</Text>
            </Card>
          </Grid>
        </Stack>
      </Stack>
    `,
  }),
}
