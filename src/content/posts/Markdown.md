---
title: 'Markdown 功能展示'
pubDate: 2024-07-26
description: '展示 Astro 主题中支持的各种 Markdown 功能。'
tags: ['Markdown', '示例', 'Astro', '插件']
---

本文档旨在演示此 Astro 主题支持的各种 Markdown 功能，包括标准 Markdown 语法以及通过 Remark 和 Rehype 插件增强的功能。

# 这是一级标题 (h1)

## 这是二级标题 (h2)

### 这是三级标题 (h3)

#### 这是四级标题 (h4)

##### 这是五级标题 (h5)

###### 这是六级标题 (h6)

**注意**: `rehypeSlug` 插件会自动为每个标题添加 ID，`rehypeAutolinkHeadingsrehypeAutolinkHeadingsrehypeAutolinkHeadingsrehypeAutolinkHeadings` 插件会在标题后追加一个可点击的 `#` 锚链接。

### 段落和换行

这是一个普通的段落。Markdown 中的段落由一个或多个连续的文本行组成，段落之间由一个或多个空行分隔。

如果需要强制换行，
可以在行尾添加两个或多个空格，然后按回车键。
像这样。

### 文本格式化

*这是斜体文本*
_这也是斜体文本_

**这是粗体文本**
__这也是粗体文本__

***这是粗斜体文本***
___这也是粗斜体文本___

~~这是删除线文本~~

`remarkSmartypants` 插件会自动转换标点符号，例如将直引号 "" 转换为弯引号 “”，将三个点 ... 转换为省略号 …，将 -- 转换为 –，将 --- 转换为 —。

### 引用

> 这是一个块引用。
> 它可以跨越多行。

> 嵌套引用：
>> 这是嵌套的引用。

### 列表

#### 无序列表

* 列表项 1
* 列表项 2
  * 嵌套列表项 2.1
  * 嵌套列表项 2.2
+ 列表项 3 (使用 +)
- 列表项 4 (使用 -)

#### 有序列表

1. 列表项 1
2. 列表项 2
3. 列表项 3
   1. 嵌套列表项 3.1
   2. 嵌套列表项 3.2

### 代码

#### 行内代码

可以使用 `反引号` 来标记行内代码，例如 `const greeting = 'Hello';`。

#### 代码块 (astro-expressive-code)

使用 `astro-expressive-code` 插件可以增强代码块的显示效果。

**基础语法高亮:**

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('World');
```

**带文件标题:**

```python title="hello.py"
def greet(name):
    print(f"Hello, {name}!")
greet('World')
```

**行高亮:**

```js {2}
function greet(name) {
  console.log(`Hello, ${name}!`); // 高亮此行
}
greet('World');
```

**行范围高亮:**

```js {1-3}
function greet(name) { // 高亮范围开始
  console.log(`Hello, ${name}!`);
} // 高亮范围结束
greet('World');
```

**单词高亮 (使用正则表达式):**

```js /console/
function greet(name) {
  console.log(`Hello, ${name}!`); // 高亮 'console'
}
greet('World');
```

**插入和删除标记 (diff):**

```diff
- const oldVariable = 'old';
+ const newVariable = 'new';
```

### 分隔线

可以使用三个或更多的星号、减号或下划线来创建水平分隔线：

***

---

___

### 链接

[这是一个内联链接](https://example.com "链接标题")

这是一个自动链接： <https://example.com>

邮箱自动链接： <contact@example.com>

**注意**: `rehypeExternalLinks` 插件会自动为所有外部链接添加 `target="_blank"` 和 `rel="noopener noreferrer"` 属性。

### 图片

标准图片语法：
![替代文本](/og-image.png "图片标题")

**使用 `remarkImgAttr` 添加属性:**

可以为图片添加 ID、类名或自定义属性。

![带属性的图片](/favicon.svg "SVG 图标")(#icon .logo width=32 height=32)

**注意**: `rehypeUnwrapImages` 插件会自动移除图片外层的 `<p>` 标签。

### 表格

| 表头 1 | 表头 2 | 居中表头 | 右对齐表头 |
| :----- | :----- | :------: | -------: |
| 单元格 1 | 单元格 2 | 单元格 3 | 单元格 4 |
| 单元格 5 | 单元格 6 | 单元格 7 | 单元格 8 |

### 任务列表 (Task List)

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个未完成的任务

### 脚注 (Footnotes)

这是一个带有脚注的句子[^footnote1]。

[^footnote1]: 这是脚注的内容。

这是另一个脚注[^footnote2]。

[^footnote2]: 这是另一个脚注的详细说明，可以包含多段文字。

    也可以包含代码块：
    ```
    code in footnote
    ```

## 插件增强功能

### Callouts (`rehype-callouts`)

::: [note]
这是一个提示 Callout。
:::

:::tip
这是一个建议 Callout。
:::

:::info
这是一个信息 Callout。
:::

:::caution
这是一个警告 Callout。
:::

:::danger
这是一个危险 Callout。
:::

### 数学公式 (`remark-math` + `rehype-katex`)

行内公式： $E = mc^2$

块级公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 自定义指令 (`remark-directive` + `remark-directive-sugar`)

#### 徽章 (Badge)

这是一个新特性 :badge-n。

#### 链接增强 (Link)

自动添加图标和增强链接。

**GitHub 用户/组织:**
:link[Stephanie Lin]{#@lin-stephanie} / :link[Vite]{id=@vitejs}

**GitHub 仓库:**
:link[Astro]{#withastro/astro}

**NPM 包:**
:link{#remark-directive-sugar}

**自定义 URL:**
:link[MDN]{id=https://developer.mozilla.org/en-US/docs/Web/JavaScript}

**自定义样式/图标:**
:link[Google]{id=https://www.google.com/ class=rounded}
:link[Vite]{id=@vitejs img=https://vitejs.dev/logo.svg}

### MDX (`@astrojs/mdx`)

可以在 Markdown 文件中导入和使用 Astro 或 React 组件。

```jsx title="示例：导入并使用组件" import={MyComponent from "@/components/MyComponent.astro"}
<MyComponent message="Hello from MDX!" />
```

*(要使此示例工作，您需要在 `src/components/` 目录下创建一个名为 `MyComponent.astro` 的组件)*

---

以上展示了此 Astro 主题支持的主要 Markdown 功能。您可以根据这些示例来自定义样式或添加更多内容。