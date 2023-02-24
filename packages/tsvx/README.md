# tsvx
[![npm](https://img.shields.io/npm/v/tsvx?color=blue&label=npm)](https://www.npmjs.com/package/tsvx)

> TypeScript & Vue Execute (tsvx)

<p align="center">
  <b>English</b> | <a href="./README.zh-CN.md">中文</a>
</p>

## About
This is a copy of [tsx](https://github.com/esbuild-kit/tsx)@3.12.3, but modified the [loader](https://github.com/Bernankez/tsvx/tree/master/packages/vue-loader), so now it's possible to compile imported Vue files.

My original intention for creating this library was to be able to use the `name` of imported Vue files in TypeScript, so I haven't tested it extensively for more complex scenarios.

This library is highly likely not to be consistent with the latest version of `tsx` because I used `unbuild` to build it and made some modifications to its content. The current version already meets my needs.

## Usage

Refer to [tsx](https://github.com/esbuild-kit/tsx#readme)