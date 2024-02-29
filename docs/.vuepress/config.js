import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    lang: 'en-US',
    title: 'Sh Frontend!',
    description: 'This is my first VuePress site',
    sidebar: 'auto',
    themeConfig: {
        sidebar: 'auto'
    },
    theme: defaultTheme({
        colorMode: 'auto',
        colorModeSwitch: true,
        navbar: [
            {
                text: 'Documentation',
                link: '/guide/introduction'
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
            '/guide':[
                {
                    text:'Guide',
                     collapsible: false,
                    children: [
                        "/guide/introduction",
                    ]
                },
                {
                    text:'Layouts',
                    collapsible: false,
                    children: [
                       "/guide/components/shcardlayout",

                    ]
                },
                {
                    text:'Components',
                    collapsible: false,
                    children: [
                        "/guide/components/shmodal",
                        "/guide/components/shcanvas",
                        "/guide/components/shconfirmationaction",
                        "/guide/components/shroutes",
                        "/guide/components/shtabs",
                        "/guide/components/shdynamictabs",
                        "/guide/components/shform",
                       "/guide/components/shtable",
                        "/guide/components/",

                    ]
                },
                {
                    text:'Helpers',
                    collapsible: true,
                    children: [
                       "/guide/helpers/",
                       "/guide/helpers/shuser/",
                       "/guide/helpers/shapi/",
                       "/guide/helpers/shrepo/"
                    ]
                },
                {
                    text:'About',
                    collapsible: false,
                    children: [
                       "/guide/about/overview",
                       "/guide/about/team"
                        ]
                }
            ]
        }
    })
})
