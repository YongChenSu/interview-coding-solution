# 環境設置：TypeScript-ESlint-Prettier

## Prettier 套件安裝
透過 create-next-app 建立專案，再安裝以下的套件

```javascript
npm install -D prettier eslint-plugin-prettier eslint-config-prettier prettier-plugin-tailwindcss
```

Final `package.json` below:
```json
// package.json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.4",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "postcss": "^8",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.13",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

## 修改 `.eslintrc.json`
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:prettier/recommended" // Add this one
  ]
}
```

**What is `plugin:prettier/recommended`**
原先不懂 `prettier` 跟 `plugin:prettier/recommended` 之間有什麼差別，找到一篇[文章](https://stackoverflow.com/questions/72868581/prettier-eslint-use-prettier-or-pluginprettier-recommended-with-react-type)，說明 `plugin:prettier/recommended`相當於

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

## 新增 `.prettierrc`
不在 `.eslintrc.json` 新增規則，僅透過 prettier 來控制 format

```json
{
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

## VSCode User Settings
```javascript
"editor.defaultFormatter": "dbaeumer.vscode-eslint",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit"
},
"[javascript][typescript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.tabSize": 2,
},
```
