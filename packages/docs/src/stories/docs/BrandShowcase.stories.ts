import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Divider,
  Heading,
  Input,
  Nav,
  Panel,
  Stack,
  Switch,
  Text,
  Toolbar,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Brand Showcase',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => ({
    components: {
      Badge,
      Button,
      Card,
      CardBody,
      CardDescription,
      CardHeader,
      CardTitle,
      Checkbox,
      Divider,
      Heading,
      Input,
      Nav,
      Panel,
      Stack,
      Switch,
      Text,
      Toolbar,
    },
    template: `
      <div class="mi-theme" data-theme="dark" style="
        width: 100%;
        height: 100vh;
        background: var(--morphink-color-background);
        color: var(--morphink-color-foreground);
        position: relative;
        overflow: hidden;
      ">

        <!-- Radial glow -->
        <div style="
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(248,72,94,0.10) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        "></div>

        <!-- ============================================ -->
        <!-- TOP-LEFT zone: Checkbox Card + Toolbar       -->
        <!-- ============================================ -->
        <div style="position: absolute; top: 20px; left: 50px; width: 200px; z-index: 2;">
          <Card variant="outline" rounded="lg" shadow="md">
            <CardBody>
              <Stack direction="column" gap="md">
                <Stack direction="row" gap="sm" align="center">
                  <Checkbox tone="primary" :modelValue="true" size="sm" />
                  <Text size="sm">Default</Text>
                </Stack>
                <Stack direction="row" gap="sm" align="center">
                  <Checkbox tone="base" size="sm" />
                  <Text size="sm">Comfortable</Text>
                </Stack>
                <Stack direction="row" gap="sm" align="center">
                  <Checkbox tone="base" size="sm" />
                  <Text size="sm">Compact</Text>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </div>

        <!-- ============================================ -->
        <!-- TOP-CENTER zone: FAQ Panel                   -->
        <!-- ============================================ -->
        <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 270px; z-index: 2;">
          <Panel variant="outline" rounded="lg" shadow="md" style="padding: 0; overflow: hidden;">
            <div style="padding: 14px 20px;">
              <Stack direction="row" justify="space-between" align="center">
                <Text size="sm" weight="semibold">Is it accessible?</Text>
                <Text size="xs" color="muted">▲</Text>
              </Stack>
            </div>
            <Divider />
            <div style="padding: 14px 20px;">
              <Text size="sm" color="muted">Yes. It adheres to the WAI-ARIA design pattern.</Text>
            </div>
            <Divider />
            <div style="padding: 14px 20px;">
              <Stack direction="row" justify="space-between" align="center">
                <Text size="sm" weight="semibold">Can it be animated?</Text>
                <Text size="xs" color="muted">▼</Text>
              </Stack>
            </div>
          </Panel>
        </div>

        <!-- ============================================ -->
        <!-- TOP-RIGHT zone: Slider/Input + Alert Dialog  -->
        <!-- ============================================ -->
        <div style="position: absolute; bottom: 50px; right: 300px; z-index: 2;">
          <Stack direction="column" gap="md">
            <div style="width: 150px; position: relative; height: 6px; background: var(--morphink-color-border); border-radius: 99px;">
              <div style="width: 60%; height: 100%; background: #f8485e; border-radius: 99px;"></div>
              <div style="position: absolute; top: -5px; left: 58%; width: 16px; height: 16px; background: white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
            </div>
            <Input placeholder="Select a fruit" size="sm" tone="base" style="width: 170px;" />
          </Stack>
        </div>

        <div style="position: absolute; top: 20px; right: -50px; width: 280px; z-index: 3;">
          <Card variant="outline" rounded="lg" shadow="lg">
            <CardHeader>
              <CardTitle>
                <Stack direction="row" gap="sm" align="center">
                  <span style="color: #f8485e;">⚠</span>
                  Are you absolutely sure?
                </Stack>
              </CardTitle>
              <CardDescription>This action cannot be undone. This will permanently delete your account and remove your data.</CardDescription>
            </CardHeader>
            <CardBody>
              <Stack direction="row" gap="sm" justify="end">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="solid" tone="destructive" size="sm">Delete account</Button>
              </Stack>
            </CardBody>
          </Card>
        </div>

        <!-- ============================================ -->
        <!-- MID-LEFT zone: Edit Profile Card             -->
        <!-- ============================================ -->
        <div style="position: absolute; top: 50%; left: -100px; transform: translateY(-50%); width: 270px; z-index: 3;">
          <Card variant="outline" rounded="lg" shadow="lg">
            <CardHeader>
              <Stack direction="row" justify="space-between" align="center">
                <CardTitle>Edit Profile</CardTitle>
                <Button variant="ghost" size="xs">✕</Button>
              </Stack>
              <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardBody>
              <Stack direction="column" gap="md">
                <Stack direction="column" gap="xs">
                  <Text size="sm" weight="medium">Name</Text>
                  <Input size="sm" modelValue="Pedro Duarte" tone="base" />
                </Stack>
                <Stack direction="column" gap="xs">
                  <Text size="sm" weight="medium">Username</Text>
                  <Input size="sm" modelValue="@peduarte" tone="base" />
                </Stack>
                <Button variant="solid" tone="success" size="sm" style="align-self: flex-end;">Save changes</Button>
              </Stack>
            </CardBody>
          </Card>
        </div>

        <!-- ============================================ -->
        <!-- CENTER: Logo                                 -->
        <!-- ============================================ -->
        <div style="
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        ">
          <img src="/ink-ui-logo.svg" alt="morphink" style="
            height: 80px; width: auto;
            filter: drop-shadow(0 4px 32px rgba(248, 72, 94, 0.35));
          " />
        </div>

        <!-- ============================================ -->
        <!-- MID-RIGHT zone: Toggle Toolbar + Checkbox    -->
        <!-- ============================================ -->
        <div style="position: absolute; top: 60%; right: 200px; z-index: 2;">
          <Stack direction="column" gap="xl" align="end">
            <Toolbar variant="outline" rounded="md" size="sm">
              <Button variant="ghost" size="sm">☰</Button>
              <Button variant="soft" size="sm" tone="primary">☰</Button>
              <Button variant="ghost" size="sm">☰</Button>
            </Toolbar>
            <Card variant="outline" rounded="lg" shadow="md">
              <CardBody>
                <Stack direction="row" gap="sm" align="center">
                  <Checkbox tone="success" :modelValue="true" />
                  <Text size="sm">Accept terms and conditions</Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </div>

        <!-- ============================================ -->
        <!-- BOTTOM-LEFT zone: Nav Card + Editor Toolbar  -->
        <!-- ============================================ -->
        <div style="position: absolute; bottom: -10px; left: 30px; width: 230px; z-index: 2;">
          <Card variant="outline" rounded="lg" shadow="md">
            <CardHeader>
              <CardTitle>Radix Primitives</CardTitle>
              <CardDescription>An open-source UI component library.</CardDescription>
            </CardHeader>
            <CardBody>
              <Nav variant="ghost" size="sm">
                <Button variant="ghost" size="sm">Blog</Button>
                <Button variant="ghost" size="sm">Docs</Button>
                <Button variant="ghost" size="sm">Source</Button>
              </Nav>
            </CardBody>
          </Card>
        </div>

        <div style="position: absolute; bottom: -6px; left: 30px; z-index: 4;">
          <Toolbar variant="outline" rounded="lg" size="sm">
            <Button variant="ghost" size="sm"><b>B</b></Button>
            <Button variant="ghost" size="sm"><i>I</i></Button>
            <Button variant="soft" tone="primary" size="sm"><u>U</u></Button>
            <Divider orientation="vertical" style="height: 20px;" />
            <Button variant="ghost" size="sm">☰</Button>
            <Button variant="ghost" size="sm">☰</Button>
            <Button variant="ghost" size="sm">☰</Button>
            <Divider orientation="vertical" style="height: 20px;" />
            <Text size="xs" color="muted" style="padding: 0 8px;">Edited 2 hours ago</Text>
            <Button variant="solid" tone="success" size="sm">Share</Button>
          </Toolbar>
        </div>

        <!-- ============================================ -->
        <!-- BOTTOM-CENTER zone: Switch + Badge + Add     -->
        <!-- ============================================ -->
        <div style="position: absolute; bottom: 100px; left: 40%; transform: translateX(-50%); z-index: 2;">
          <Stack direction="column" gap="md" align="center">
            <Badge tone="primary" variant="soft" size="sm">Add to library</Badge>
            <Stack direction="row" gap="lg" align="center">
              <Card variant="outline" rounded="lg" shadow="md">
                <CardBody>
                  <Stack direction="row" gap="md" align="center">
                    <Switch tone="success" :modelValue="true" size="md" />
                    <Stack direction="column" gap="0">
                      <Text size="sm" weight="medium">Remember me</Text>
                      <Text size="xs" color="muted">Save my login details.</Text>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              <Button variant="outline" rounded="lg" size="lg" style="width: 44px; height: 44px; padding: 0;">+</Button>
            </Stack>
          </Stack>
        </div>

        <!-- ============================================ -->
        <!-- BOTTOM-RIGHT zone: Menu Card + Profile Card  -->
        <!-- ============================================ -->
        <div style="position: absolute; bottom: 180px; right: 40px; width: 210px; z-index: 3;">
          <Card variant="outline" rounded="lg" shadow="lg" style="overflow: hidden;">
            <div style="padding: 6px 8px; border-bottom: 1px solid var(--morphink-color-border);">
              <Nav variant="ghost" size="xs">
                <Button variant="soft" tone="primary" size="xs">File</Button>
                <Button variant="ghost" size="xs">Edit</Button>
                <Button variant="ghost" size="xs">View</Button>
                <Button variant="ghost" size="xs">Profiles</Button>
              </Nav>
            </div>
            <CardBody>
              <Stack direction="column" gap="xs">
                <Stack direction="row" justify="space-between" align="center" style="padding: 6px 8px; border-radius: 6px;">
                  <Text size="sm">New Tab</Text>
                  <Text size="xs" color="muted">⌘ T</Text>
                </Stack>
                <Stack direction="row" justify="space-between" align="center" style="padding: 6px 8px; border-radius: 6px; background: var(--morphink-color-primary); color: white;">
                  <Text size="sm" style="color: white;">New Window</Text>
                  <Text size="xs" style="color: rgba(255,255,255,0.7);">⌘ N</Text>
                </Stack>
                <Stack direction="row" justify="space-between" align="center" style="padding: 6px 8px;">
                  <Text size="sm" color="muted">New Incognito</Text>
                </Stack>
                <Divider />
                <Stack direction="row" justify="space-between" align="center" style="padding: 6px 8px;">
                  <Text size="sm">Share</Text>
                  <Text size="xs" color="muted">›</Text>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </div>

        <div style="position: absolute; bottom: -30px; right: -30px; width: 240px; z-index: 4;">
          <Card variant="outline" rounded="lg" shadow="lg">
            <CardBody>
              <Stack direction="column" gap="md">
                <Stack direction="row" gap="md" align="center">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #f8485e, #ff8a65); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; flex-shrink: 0;">M</div>
                  <Stack direction="column" gap="0">
                    <Text size="sm" weight="semibold">Morphink</Text>
                    <Text size="xs" color="muted">@morphink</Text>
                  </Stack>
                </Stack>
                <Text size="sm" color="muted">Components, colors, and tokens for building accessible UI.</Text>
                <Stack direction="row" gap="lg">
                  <Text size="xs"><strong>0</strong> <span style="color: var(--morphink-color-muted-foreground);">Following</span></Text>
                  <Text size="xs"><strong>∞</strong> <span style="color: var(--morphink-color-muted-foreground);">Followers</span></Text>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </div>

      </div>
    `,
  }),
}
