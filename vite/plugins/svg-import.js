import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
export default function createSvgImport () {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[name]'
  })
}