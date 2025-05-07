---
title: 'Getting Started'
pubDate: 2025-05-05
description: 'Getting Started with the Litos Theme'
recommend: true
tags: ['Tutorial']
heroImage: 'Getting-Started.webp'
ogImage: 'Getting-Started.webp'
---

Welcome to  **[Litos Theme](https://github.com/Dnzzk2/Litos)** ! This guide will guide you through quickly setting up and launching a project.

## Preparation

Before starting, please ensure that the following software or tools is installed in your development environment:

- :link[Node.js]{id=https://nodejs.org/en/download} - Run the environment and development project locally.
- :link[pnpm]{id=https://pnpm.io/installation} - Used for managing project dependencies.
- :link[Git]{id=https://git-scm.com/} - Used for version control.
- :link[VS Code]{id=https://code.visualstudio.com/} - Provide a good code editing experience.

If you have other alternative tools, it's also a good choice.

## Create Project

After having the above development environment, you can create a new project using the following methods:

**Github**

Create a new project by [forking](https://github.com/Dnzzk2/Litos/fork) the code of this project, and then clone it locally:

```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
```

## Startup Project

After cloning the project, you can start the project by running the following command:

```bash
# Install dependencies
pnpm install

# Start project
pnpm dev
```

> [!note]+
>
> After the project is launched, there will be:
>
> ``` text
> Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
> 1. You might have mismatching versions of React and the renderer (such as React DOM)
> 2. You might be breaking the Rules of Hooks
> 3. You might have more than one copy of React in the same app
> See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.
> ```
>
> This is caused by the **React plugin** and **MDX plugin**, and the Astro official statement in Issues states that this warning can be ignored.

## Configure Project

Before configuring a project, we should first understand the [project structure](/posts/project-structure)  .

We can start with the following three configuration files:

- [**Basic configuration**](/posts/basic-configuration): Can be configured in the `src/config.ts` file.
- [**ExpressiveCode configuration**](/posts/expressivecode-configuration): Can be configured in the `ec.config.mjs` file.
- [**MD configuration**](/posts/md-configuration): Can be configured in the `/plugins/index.ts` file.

## Markdown Syntax

This theme supports both basic and enhanced markdown syntax.

The support for markdown enhanced syntax comes from [**plugins**](/posts/md-configuration), and you can add plugins to support more.
