const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  lang: 'en-US',
  title: 'Sh Frontend!',
  description: 'This is my first VuePress site',
  theme: defaultTheme({
    // set config here
    colorMode: 'auto',
    colorModeSwitch: true,
    navbar: [
      {
        text: 'Documentation',
        link: '/guide'
      },
      {
        text: 'Backend Docs',
        link: 'https://backend-documentation.pages.dev/'
      },
      {
        text: 'Github',
        link: 'https://github.com/sharasolns/sh-frontend'
      }
    ],
    sidebar: {
      '/guide/':[
        {
          text:'Introduction',
          collapsible: false,
          children: [
            {
              text: 'Installation',
              link: '/guide/installation'
            }
          ]
        },
        {
          text:'Components',
          collapsible: true,
          children: [
            {
              text: 'Sh Form',
              link: '/guide/components/shform.md',
            },
            {
              text: 'Sh Tabs',
              link: '/guide/components/shtabs.md',
            },
            {
              text: 'Sh Modal',
              link: '/guide/components/shmodal.md',
            },
            {
              text: 'Sh Canvas',
              link: '/guide/components/shcanvas.md',
            },
            {
              text: 'Sh Table',
              link: '/guide/components/shtable.md',
            }
          ]
        }
      ]
    }
  })
}
