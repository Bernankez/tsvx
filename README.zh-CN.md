# tsvx
[![npm](https://img.shields.io/npm/v/tsvx?color=blue&label=npm)](https://www.npmjs.com/package/tsvx)

> TypeScript & Vue Execute (tsvx)

<p align="center">
  <a href="./README.md">English</a> | <b>中文</b>
</p>

## 关于
这是库是[tsx](https://github.com/esbuild-kit/tsx) 3.12.3版本的一个拷贝，相比于tsx修改了[loader](https://github.com/Bernankez/tsvx/tree/master/packages/vue-loader)部分，所以现在可以编译导入的Vue文件了。

我创建这个库是因为想在一个ts文件中使用导入的Vue文件的`name`，所以我没对其他情况进行太多的测试。

这个库大概率不会和`tsx`保持更新，因为这个库我用`unbuild`构建，相比于原版`tsx`修改了一部分内容。目前这个版本已经可以满足我的需求了。

## 用法

可以直接看[tsx](https://github.com/esbuild-kit/tsx#readme)的用法