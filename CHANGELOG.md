## [3.0.1](https://github.com/laomao800/vue-listview3/compare/v3.0.0...v3.0.1) (2023-03-20)



# [3.0.0](https://github.com/laomao800/vue-listview3/compare/v3.0.0-beta.1...v3.0.0) (2023-02-24)


### Bug Fixes

* 修正更新 tableColumns 导致布局渲染错误 ([1954402](https://github.com/laomao800/vue-listview3/commit/19544026752c60e9ff3b5488e190a5425623c07f))



# [3.0.0-beta.1](https://github.com/laomao800/vue-listview3/compare/v3.0.0-alpha.6...v3.0.0-beta.1) (2022-10-18)


### Bug Fixes

* 统一命名，pageProps -> pageAttrs ([d019d74](https://github.com/laomao800/vue-listview3/commit/d019d745ce3e23b22a4329d858fb17c5212fef9c))
* 修正 fieldButtons / filterFields 不渲染 Ref 类数据 ([f75eeeb](https://github.com/laomao800/vue-listview3/commit/f75eeeb6b9a7c1a50cf050883d5e7f6fe9af1c2a))
* 修正 filterField.options 未设置时取值错误 ([365fba9](https://github.com/laomao800/vue-listview3/commit/365fba97b98a6d227be7f48e6b1bea29b32bc197))
* 修正 full height `false` 请求数据后 filterbar 布局错误 ([0e56d89](https://github.com/laomao800/vue-listview3/commit/0e56d895714b807a71b0fef1e24a5dc11c9fdb51))
* 修正 listview-container KeepAlive 未缓存子级 ([4272352](https://github.com/laomao800/vue-listview3/commit/42723528850df235c3f39dc6c77c7e3e2e2f9e7c))
* 修正 lvStore `contentMessage` 属性丢失 ([a188af8](https://github.com/laomao800/vue-listview3/commit/a188af863b4d118802f5358e31cab3422b432edd))
* 修正 tableColumns.render 不渲染 VNode 类型 ([2c66d2b](https://github.com/laomao800/vue-listview3/commit/2c66d2b61ae60bec2233e0733eba1c17c5666472))
* 修正未提供 lvStore provide ([a89ca7f](https://github.com/laomao800/vue-listview3/commit/a89ca7fe57e2b6c06588c14f839904b77f0ba1a0))
* LvStore type fix ([0e33e33](https://github.com/laomao800/vue-listview3/commit/0e33e33412acea97005170a45c0dadbc3c2ff008))
* update element plus to 2.2.17 ([d5de909](https://github.com/laomao800/vue-listview3/commit/d5de9093ce7a5006d594e05949c22ef815a500c6))


### Features

* 添加 content-empty slot ([13b96ba](https://github.com/laomao800/vue-listview3/commit/13b96ba0349de1cfd26eb33c7895bc5f62eb0d9a))
* 增加 slot `header` `filterbar` `footer` ([6c4aed3](https://github.com/laomao800/vue-listview3/commit/6c4aed3cb398113e47ea27dffad527d873c83f1c))
* filterFields select/cascader 类型通过 multiple 开启多选 ([45f1ed4](https://github.com/laomao800/vue-listview3/commit/45f1ed48fe1304571cb61e88a7ac0a5ac92449e9))
* lvStore 增加 resetFilterModel() ([8ace56c](https://github.com/laomao800/vue-listview3/commit/8ace56c401b17b5d5865ce3c50b0939ce745eace))


### BREAKING CHANGES

* filterFields 取消 multipleSelect 类型
* props `pageProps` 更改为 `pageAttrs`



