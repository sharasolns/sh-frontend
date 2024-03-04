import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/about/overview.html.vue"
const data = JSON.parse("{\"path\":\"/guide/about/overview.html\",\"title\":\"Overview\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Features\",\"slug\":\"features\",\"link\":\"#features\",\"children\":[]}],\"git\":{\"updatedTime\":1709537255000,\"contributors\":[{\"name\":\"silah\",\"email\":\"silakosy@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"guide/about/overview.md\"}")
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
