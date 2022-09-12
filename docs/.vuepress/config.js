const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  lang: 'en-US',
  title: 'Sh Frontend!',
  description: 'This is my first VuePress site',
  sidebar: 'auto',
  themeConfig: {
    sidebar: 'auto'
  },
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
          // collapsible: false,
          children: [
            "/guide/",
            "/guide/installation"
          ]
        },
        {
          text:'Components',
          collapsible: false,
          children: [
              '/guide/components',
              '/guide/components/shform',
              '/guide/components/shtabs',
              '/guide/components/shdynamictabs',
              '/guide/components/shmodal',
              '/guide/components/shcanvas',
              '/guide/components/shtable'
          ]
        },
        {
          text: 'Helpers',
          collapsible: false,
          children: [
              '/guide/helpers',
              '/guide/helpers/shuser',
              '/guide/helpers/shapi',
              '/guide/helpers/shrepo'
          ]
        }
      ]
    }
  })
}
