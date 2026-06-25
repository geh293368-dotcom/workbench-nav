# workbench-nav

冯先生工作台：AI / Coding / Game VFX 的个人启动台。

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

链接入口集中维护在 `src/data/links.json`。

图标文件放在 `public/icons/`，配置中只写文件名，例如：

```json
"brand": {
  "label": "ChatGPT",
  "icon": "chatgpt.png",
  "background": "#ecfdf5",
  "foreground": "#047857"
}
```
