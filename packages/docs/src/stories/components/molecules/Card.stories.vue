<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  CardMedia,
  Text,
  Button,
  Stack,
  Divider,
} from '@morphink/ui'
import { componentRounded, componentShadow, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
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
})
</script>

<template>
  <Story name="Playground">
    <template #template="{ args }">
      <Card
        :variant="args.variant"
        :rounded="args.rounded"
        :shadow="args.shadow"
        style="max-width: 400px"
      >
        <CardHeader>
          <CardTitle>Featured Collection</CardTitle>
          <CardDescription>Curated for easy discovery</CardDescription>
          <template #actions>
            <Button size="sm" variant="outline">View All</Button>
          </template>
        </CardHeader>
        <CardBody>
          <Text>Use cards to group information and surface actions.</Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid" size="sm">Primary</Button>
          <Button variant="outline" size="sm">Secondary</Button>
        </CardFooter>
      </Card>
    </template>
  </Story>

  <Story name="Minimal" asChild>
    <Stack gap="lg" direction="row" wrap>
      <Card style="width: 280px">
        <CardBody>
          <Text>The simplest Card usage — just Card + CardBody for quick content grouping.</Text>
        </CardBody>
      </Card>
      <Card variant="outline" style="width: 280px">
        <CardBody>
          <Text>Outline variant with body only. No header or footer needed.</Text>
        </CardBody>
      </Card>
    </Stack>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="lg">
      <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
      <Stack gap="lg" direction="row" wrap>
        <Card variant="elevated" style="width: 200px">
          <CardHeader><CardTitle>Elevated</CardTitle></CardHeader>
          <CardBody><Text>Default card with shadow</Text></CardBody>
        </Card>
        <Card variant="outline" style="width: 200px">
          <CardHeader><CardTitle>Outline</CardTitle></CardHeader>
          <CardBody><Text>Border only, no shadow</Text></CardBody>
        </Card>
        <Card variant="ghost" style="width: 200px">
          <CardHeader><CardTitle>Ghost</CardTitle></CardHeader>
          <CardBody><Text>Transparent, hover to reveal</Text></CardBody>
        </Card>
        <Card variant="soft" style="width: 200px">
          <CardHeader><CardTitle>Soft</CardTitle></CardHeader>
          <CardBody><Text>Muted background</Text></CardBody>
        </Card>
        <Card variant="interactive" style="width: 200px">
          <CardHeader><CardTitle>Interactive</CardTitle></CardHeader>
          <CardBody><Text>Hover for shadow lift</Text></CardBody>
        </Card>
      </Stack>
    </Stack>
  </Story>

  <Story name="WithMedia" asChild>
    <Stack gap="lg">
      <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">
        with media
      </div>
      <Stack gap="lg" direction="row" wrap>
        <Card style="width: 300px">
          <CardMedia>
            <div
              style="
                height: 160px;
                background: linear-gradient(
                  135deg,
                  var(--morphink-color-primary),
                  var(--morphink-color-accent)
                );
              "
            />
          </CardMedia>
          <CardHeader>
            <CardTitle>Gradient Card</CardTitle>
            <CardDescription>Media slot at the top</CardDescription>
          </CardHeader>
          <CardBody>
            <Text>Content below the media area.</Text>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="solid">Action</Button>
          </CardFooter>
        </Card>
        <Card style="width: 300px">
          <CardHeader>
            <CardTitle>Bottom Media</CardTitle>
            <CardDescription>Media placed after content</CardDescription>
          </CardHeader>
          <CardBody>
            <Text>Content above the media area.</Text>
          </CardBody>
          <CardMedia>
            <div
              style="
                height: 120px;
                background: linear-gradient(
                  135deg,
                  var(--morphink-color-accent),
                  var(--morphink-color-secondary)
                );
              "
            />
          </CardMedia>
        </Card>
      </Stack>
    </Stack>
  </Story>

  <Story name="RoundedAndShadow" asChild>
    <Stack gap="2xl">
      <Stack direction="column" gap="md">
        <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">
          rounded
        </div>
        <Stack gap="md" direction="row" wrap>
          <Card rounded="none" style="width: 160px"
            ><CardBody><Text>none</Text></CardBody></Card
          >
          <Card rounded="sm" style="width: 160px"
            ><CardBody><Text>sm</Text></CardBody></Card
          >
          <Card rounded="md" style="width: 160px"
            ><CardBody><Text>md</Text></CardBody></Card
          >
          <Card rounded="lg" style="width: 160px"
            ><CardBody><Text>lg</Text></CardBody></Card
          >
          <Card rounded="xl" style="width: 160px"
            ><CardBody><Text>xl</Text></CardBody></Card
          >
        </Stack>
      </Stack>
      <Stack direction="column" gap="md">
        <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">
          shadow
        </div>
        <Stack gap="md" direction="row" wrap>
          <Card shadow="none" style="width: 160px"
            ><CardBody><Text>none</Text></CardBody></Card
          >
          <Card shadow="sm" style="width: 160px"
            ><CardBody><Text>sm</Text></CardBody></Card
          >
          <Card shadow="md" style="width: 160px"
            ><CardBody><Text>md</Text></CardBody></Card
          >
          <Card shadow="lg" style="width: 160px"
            ><CardBody><Text>lg</Text></CardBody></Card
          >
        </Stack>
      </Stack>
    </Stack>
  </Story>
</template>
