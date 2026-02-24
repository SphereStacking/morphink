import { addons, types } from 'storybook/manager-api'
import { create } from 'storybook/theming'

import { ADDON_ID, PANEL_ID } from '../src/addons/token-editor/constants'
import { TokenEditorPanel } from '../src/addons/token-editor/Panel'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'morphink UI',
    brandImage: '/ink-ui-logo.svg',
    brandUrl: '/',
  }),
})

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Tokens',
    render: TokenEditorPanel,
  })
})
