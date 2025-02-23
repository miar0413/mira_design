export interface NavItem {
  title: string;
  link?: string;
}

export const navList = [
  {
    title: 'Latest ToB Projects',
    children: [
      {
        title: 'ByteHi customer service upgrade',

        link: '/projects/byte_hi',
      },
      {
        title: 'Risk management platform for content reviewing',

        link: '/projects/risk_management',
      },
    ],
  },
  {
    title: 'Service Consulting Project',
    children: [
      {
        title: 'Digital Innovation of future mobility & Cloud service App',
        link: '/projects/digital_innovation',
      },
      {
        title: 'Life design for media & smart health community App',
        link: '/projects/life_design',
      },
      {
        title: 'Digital experience in a collaborative office space',
        link: '/projects/office_design',
      },
      {
        title: 'For Vanke’s Mehos home life service innovation',
        link: '/projects/mehos_design',
      },
    ],
  },
  {
    title: 'Installation art',
    children: [
      {
        title: 'Generative art lab',
        image: '/cover/cover_06.png',
      },
      {
        title: 'The filtered home',
        link: '/projects/filter_home',
      },
      {
        title: '2028 ordinary kitchen',
        link: '/projects/ordinary_kitchen',
      },
      {
        title: 'The green fitness',

        link: '/projects/green_fitness',
      },
      {
        title: 'Unfunctional Dream',
        link: '/projects/unfunctional_dream',
      },
      {
        title: 'Time synchronization',
        link: '/projects/time_synchronization',
      },
    ],
  },
  {
    title: 'Other projects',
    children: [
      {
        title: 'QiaoQiao intelligent bot for chinese learning App',
        link: '/projects/qiaoqiao',
      },
      {
        title: 'Yiker, an Private Guidance of Beauty&Fashion App',
        link: '/projects/yiker',
      },
    ],
  },
];

export const flatList = navList.reduce((acc, cur) => {
  if (cur.children?.length) {
    return acc.concat(cur.children);
  }
  return acc;
}, [] as NavItem[]);
