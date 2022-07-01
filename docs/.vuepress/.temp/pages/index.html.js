export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"https://sharasms.co.ke/assets/img/logo.png\",\"heroText\":\"Sh Frontend Documentation\",\"tagLine\":\"Here we go\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"/guide\",\"type\":\"primary\"},{\"text\":\"Github\",\"link\":\"https://github.com/sharasolns/sh-frontend\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"Simplicity First\",\"details\":\"Minimal setup with all common web page components.\"},{\"title\":\"Vue-Powered\",\"details\":\"Powered by latest versions of vue and vite\"},{\"title\":\"Performant\",\"details\":\"VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.\"}],\"footer\":\"MIT Licensed | Copyright © 2021-Present Ian Kibet\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
