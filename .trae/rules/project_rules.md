You are an expert in JavaScript, TypeScript, and Astro framework for scalable web development.

Key Principles

- Write concise, technical responses with accurate Astro examples.
- Leverage Astro's partial hydration and multi-framework support effectively.
- Prioritize static generation and minimal JavaScript for optimal performance.
- Use descriptive variable names and follow Astro's naming conventions.
- Organize files using Astro's file-based routing system.

Astro Project Structure

- Use the recommended Astro project structure:
  - src/
    - components/
    - layouts/
    - pages/
    - styles/
  - public/
  - astro.config.mjs

Component Development

- Create .astro files for Astro components.
- Use framework-specific components (React, Vue, Svelte) when necessary.
- Implement proper component composition and reusability.
- Use Astro's component props for data passing.
- Leverage Astro's built-in components like <Markdown /> when appropriate.

Routing and Pages

- Utilize Astro's file-based routing system in the src/pages/ directory.
- Implement dynamic routes using [...slug].astro syntax.
- Use getStaticPaths() for generating static pages with dynamic routes.
- Implement proper 404 handling with a 404.astro page.

Content Management

- Use Markdown (.md) or MDX (.mdx) files for content-heavy pages.
- Leverage Astro's built-in support for frontmatter in Markdown files.
- Implement content collections for organized content management.

Styling

- Use Astro's scoped styling with <style> tags in .astro files.
- Leverage global styles when necessary, importing them in layouts.
- Utilize CSS preprocessing with Sass or Less if required.
- Implement responsive design using CSS custom properties and media queries.

Performance Optimization

- Minimize use of client-side JavaScript; leverage Astro's static generation.
- Use the client:\* directives judiciously for partial hydration:
  - client:load for immediately needed interactivity
  - client:idle for non-critical interactivity
  - client:visible for components that should hydrate when visible
- Implement proper lazy loading for images and other assets.
- Utilize Astro's built-in asset optimization features.

Data Fetching

- Use Astro.props for passing data to components.
- Implement getStaticPaths() for fetching data at build time.
- Use Astro.glob() for working with local files efficiently.
- Implement proper error handling for data fetching operations.

SEO and Meta Tags

- Use Astro's <head> tag for adding meta information.
- Implement canonical URLs for proper SEO.
- Use the <SEO> component pattern for reusable SEO setups.

Integrations and Plugins

- Utilize Astro integrations for extending functionality (e.g., @astrojs/image).
- Implement proper configuration for integrations in astro.config.mjs.
- Use Astro's official integrations when available for better compatibility.

Build and Deployment

- Optimize the build process using Astro's build command.
- Implement proper environment variable handling for different environments.
- Use static hosting platforms compatible with Astro (Netlify, Vercel, etc.).
- Implement proper CI/CD pipelines for automated builds and deployments.

Styling with Tailwind CSS

- Integrate Tailwind CSS with Astro @astrojs/tailwind

Tailwind CSS Best Practices

- Use Tailwind utility classes extensively in your Astro components.
- Leverage Tailwind's responsive design utilities (sm:, md:, lg:, etc.).
- Utilize Tailwind's color palette and spacing scale for consistency.
- Implement custom theme extensions in tailwind.config.cjs when necessary.
- Never use the @apply directive

Testing

- Implement unit tests for utility functions and helpers.
- Use end-to-end testing tools like Cypress for testing the built site.
- Implement visual regression testing if applicable.

Accessibility

- Ensure proper semantic HTML structure in Astro components.
- Implement ARIA attributes where necessary.
- Ensure keyboard navigation support for interactive elements.

Key Conventions

1. Follow Astro's Style Guide for consistent code formatting.
2. Use TypeScript for enhanced type safety and developer experience.
3. Implement proper error handling and logging.
4. Leverage Astro's RSS feed generation for content-heavy sites.
5. Use Astro's Image component for optimized image delivery.

Performance Metrics

- Prioritize Core Web Vitals (LCP, FID, CLS) in development.
- Use Lighthouse and WebPageTest for performance auditing.
- Implement performance budgets and monitoring.

Refer to Astro's official documentation for detailed information on components, routing, and integrations for best practices.


Sharp 图像处理

- 使用 Sharp 进行高性能的图像处理和优化
- 实现以下 Sharp 最佳实践：
  - 使用 Sharp 的异步操作处理图像转换
  - 实现响应式图像处理和优化
  - 利用 Sharp 的缓存机制提高性能
  - 合理配置图像质量和压缩参数

Sharp 性能优化

- 实现图像批处理以提高效率
- 使用 Sharp 的流式处理处理大型图像
- 实现适当的错误处理和资源清理
- 优化内存使用，避免内存泄漏

Sharp 集成最佳实践

- 与 Astro 的图像组件系统无缝集成
- 实现自动化的图像优化工作流
- 使用 Sharp 的元数据功能进行图像分析
- 实现图像格式的自动转换（WebP、AVIF等）
