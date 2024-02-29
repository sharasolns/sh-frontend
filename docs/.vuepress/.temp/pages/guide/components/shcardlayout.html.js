import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shcardlayout.html.vue"
const data = JSON.parse("{\"path\":\"/guide/components/shcardlayout.html\",\"title\":\"sh card layout\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Importing\",\"slug\":\"importing\",\"link\":\"#importing\",\"children\":[]},{\"level\":2,\"title\":\"Example Usage\",\"slug\":\"example-usage\",\"link\":\"#example-usage\",\"children\":[]},{\"level\":2,\"title\":\"Explanation\",\"slug\":\"explanation\",\"link\":\"#explanation\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"guide/components/shcardlayout.md\"}")
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
