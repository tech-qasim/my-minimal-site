---
title: 'Getting Started'
pubDate: 2025-05-05
description: 'Getting Started with the Litos Theme'
recommend: true
tags: ['Tutorial']
heroImage: 'Getting-Started.png'
ogImage: 'Getting-Started.png'
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

## Configure Project

Before configuring a project, we should first understand the [project structure](/posts/project-structure)  .
