import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/helpers/\",\"title\":\"Helpers\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1657169450000,\"contributors\":[{\"name\":\"Hosea Kibet\",\"email\":\"kibethosea8@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"guide/helpers/README.md\"}")
export { comp, data }

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
