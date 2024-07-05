import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgImport from './svg-import'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createSetupMock from './setup-mock'
export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSvgImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSetupMock())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
