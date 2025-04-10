// 检查 localStorage 是否可用，并获取主题设置
// Check if localStorage is available and get the theme setting
;(function () {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    // 如果主题存在，则添加到文档根元素
    // If the theme exists, add it to the document root element
    document.documentElement.classList.add(localStorage.getItem('theme'))
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // 如果没有主题设置，且用户偏好为暗色模式，则添加暗色类
    // If there is no theme setting and the user prefers dark mode, add the dark class
    document.documentElement.classList.add('dark')
  }
})()

// 监听 astro:after-swap 事件以更新主题
// Listen for the astro:after-swap event to update the theme
document.addEventListener('astro:after-swap', () => {
  const theme = localStorage.getItem('theme')
  const root = document.documentElement

  // 根据主题设置或系统偏好来添加或移除暗色类
  // Add or remove the dark class based on the theme setting or system preference
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
})
