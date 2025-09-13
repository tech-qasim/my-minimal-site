import type {
  GithubConfig,
  Link,
  PhotoData,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
  WorkExperienceConfig,
} from '~/types'

//--- Readme Page Config ---
export const SITE: Site = {
  title: 'Qasim',
  description:
    'Litos is a modern blogging theme built on Astro.js, designed for developers. It supports multiple post layouts, photo displays, project displays, and more, providing an elegant user experience and powerful customization capabilities.',
  website: 'https://litos.vercel.app/',
  lang: 'en',
  base: '/',
  author: 'Dnzzk2',
  ogImage: '/og-image.webp',
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Readme',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/tech-qasim',
    icon: 'icon-[ri--github-fill]',
  },
  {
    name: 'twitter',
    url: 'https://x.com/devqasim_',
    icon: 'icon-[ri--twitter-x-fill]',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/qasimxo/',
    icon: 'icon-[ri--linkedin-fill]',
  },
]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'Dart',
          icon: 'icon-[simple-icons--dart]',
        },
        {
          name: 'Java',
          icon: 'icon-[mdi--language-java]',
        },
        {
          name: 'Kotlin',
          icon: 'icon-[mdi--language-kotlin]',
        },
        {
          name: 'Javascript',
          icon: 'icon-[mdi--language-javascript]',
        },
        {
          name: 'Typescript',
          icon: 'icon-[mdi--language-typescript]',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Flutter',
          icon: 'icon-[material-symbols--flutter]',
        },
        {
          name: 'Node.js',
          icon: 'icon-[mdi--nodejs]',
        },
        {
          name: 'Native Android',
          icon: 'icon-[mdi--android]',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Bloc/Cubit',
          icon: 'icon-[file-icons--bloc]',
        },
        {
          name: 'Git',
          icon: 'icon-[mdi--git]',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[lineicons--mongodb]',
        },
        {
          name: 'http',
          icon: 'icon-[material-symbols--http]',
        },
        {
          name: 'GetX',
          icon: 'icon-[simple-icons--getx]',
        },
        {
          name: 'Riverpod',
          icon: 'icon-[material-symbols--flutter]',
        },
        {
          name: 'Provider',
          icon: 'icon-[material-symbols--flutter]',
        },
      ],
    },
  ],
}

export const WORK_EXPERIENCE_CONFIG: WorkExperienceConfig = {
  WORK_EXPERIENCE_ENABLED: true,
  WORK_EXPERIENCE_DATA: [
    {
      company: 'Appstree, Sargodha',
      role: 'Software Engineer (Flutter)',
      period: 'June 2024 - Present',
      description: [
        'Built and maintained scalable, high-performance mobile applications using Flutter, with a focus on MVVM architecture, responsive UI, and seamless user experiences across Android and iOS.',
        'Implemented state management solutions like Riverpod and integrated Firebase services (Auth, Firestore, Cloud Messaging) to enable real-time features and cloud functionality.',
        'Collaborated closely with designers and other Flutter developers, contributing to app architecture, feature planning, and end-to-end delivery.',
      ],
    },
    {
      company: 'CodeSquare, Sargodha',
      role: 'Software Engineer Intern (Android)',
      period: 'Nov 2023 - March 2024',
      description: [
        'Assisted in developing and testing new features for Android applications under the guidance of senior developers.',
        'Created a variety of small-scale apps for hands-on practice and skill development.',
        'Designed and developed a real-time chat application for lawyers and clients using Android (Java/Kotlin), ensuring secure and efficient communication.',
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'tech-qasim',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by Dnzzk2',
  introduce: 'Here, I will share the usage instructions for this theme to help you quickly use it.',
  author: 'Dnzzk2',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
  recommendText: 'REC',
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'The examples of my projects.',
  introduce: 'The examples of my projects.',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: 'Here I will record some photos taken in daily life.',
  introduce: 'Here I will record some photos taken in daily life.',
}

export const PhotosList: PhotoData[] = [
  {
    title: "Friend's Adorable Cat",
    icon: {
      type: 'emoji',
      value: '🌠',
    },
    description: 'So kawaii (*^ω^*)',
    date: '2025-06-21',
    travel: '',
    photos: [
      {
        src: '/photos/cat1.webp',
        alt: "Friend's Adorable Cat",
        width: 1080,
        height: 810,
        variant: '4x3',
      },
      {
        src: '/photos/cat2.webp',
        alt: "Friend's Adorable Cat",
        width: 1080,
        height: 810,
        variant: '4x3',
      },
      {
        src: '/photos/cat3.webp',
        alt: "Friend's Adorable Cat",
        width: 1080,
        height: 810,
        variant: '4x3',
      },
      {
        src: '/photos/cat4.webp',
        alt: "Friend's Adorable Cat",
        width: 1080,
        height: 810,
        variant: '4x3',
      },
    ],
  },
  {
    title: 'Ningbo · Dongqian Lake',
    icon: {
      type: 'emoji',
      value: '🌅',
    },
    description: 'Cycling around Dongqian Lake. Although I got leg cramps a few times, the scenery was beautiful.',
    date: '2025-03-01',
    travel: '',
    photos: [
      {
        src: '/photos/dqh1.webp',
        alt: 'Ningbo · Dongqian Lake',
        width: 1080,
        height: 1358,
        variant: '4x5',
      },
      {
        src: '/photos/dqh2.jpg',
        alt: 'Ningbo · Dongqian Lake',
        width: 1080,
        height: 1080,
        variant: '1x1',
      },
      {
        src: '/photos/dqh3.jpg',
        alt: 'Ningbo · Dongqian Lake',
        width: 1440,
        height: 1080,
        variant: '4x3',
      },
    ],
  },
  {
    title: 'Ningbo · Zhoushan',
    icon: {
      type: 'emoji',
      value: '🌉',
    },
    description: '',
    date: '2024-09-07',
    travel: '',
    photos: [
      {
        src: '/photos/zs1.webp',
        alt: 'Ningbo · Zhoushan',
        width: 1210,
        height: 908,
        variant: '4x3',
      },
      {
        src: '/photos/zs2.webp',
        alt: 'Ningbo · Zhoushan',
        width: 1080,
        height: 810,
        variant: '4x3',
      },
    ],
  },
]
