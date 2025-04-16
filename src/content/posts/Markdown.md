---
title: '两兄弟的躺平生活，最进游戏收益不错，给兄弟加两个菜'
pubDate: 2024-03-20
description: '测试所有已配置的 Markdown 增强功能'
tags: ['Markdown', 'Test']
---

## Callouts 测试

> [!note]
> 这是一个普通提示框。

> [!tip] 自定义标题
> 这是一个带自定义标题的提示框。

> [!important]- 可折叠（默认关闭）
> 这是一个可折叠的提示框。

> [!warning]+ 嵌套示例（默认打开）
> 这是一个嵌套的警告提示框。
> 
> > [!caution]- 内部提示
> > 这是嵌套在内部的提示框。

## Badge 徽章测试

两兄弟的躺平生活，最进游戏收益不错，给兄弟加两个菜

这是一篇文章 :badge-a

这是一个视频 :badge-v

自定义徽章 :badge[测试]{style="background-color: #22c55e"}

## Link 增强链接测试

[Astro 官方文档]([Astro 官方文档](URL_ADDRESS.astro.build/))

## 代码块测试

## GFM 特性测试

### 表格

| 特性 | 支持情况 | 备注 |
|------|----------|------|
| 表格 | ✅ | 基础表格 |
| 删除线 | ~~已完成~~ | GFM 语法 |
| 任务列表 | - [x] 已完成<br>- [ ] 未完成 | 可交互 |
| 脚注 | 支持[^1] | 页面底部 |

[^1]: 这是一个脚注示例

### 数学公式

行内公式：$E = mc^2$

行间公式：
$$
\frac{\partial f}{\partial x} = 2\sqrt{ax}
$$

## 图片和视频测试

### 图片属性
![示例图片](https://picsum.photos/800/400){width=800 height=400 loading=lazy}

### 视频嵌入
:youtube[dQw4w9WgXcQ]

:bilibili[BV1GJ411x7h7]

## 代码块测试

基础语法高亮：
```js
console.log('基础语法高亮测试')
```

<!-- 徽章 -->
这是新内容 :badge-n
这是文章 :badge-a
这是视频 :badge-v
自定义徽章 :badge[自定义]{style="background-color: purple"}

<!-- 链接 -->
访问 :link[GitHub]{#github.com}
查看包 :link[Vue]{#npmjs.com/package/vue}
自定义链接 :link[MDN]{id=developer.mozilla.org}

<!-- 图片 -->
:::image-figure[随机生成的图片]
![示例图片](https://picsum.photos/800/400)
:::

<!-- 视频 -->
:youtube[dQw4w9WgXcQ]
:bilibili[BV1GJ411x7h7]
