import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/installation.html.vue"
const data = JSON.parse("{\"path\":\"/guide/installation.html\",\"title\":\"Installation\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"Boostrap 5\",\"slug\":\"boostrap-5\",\"link\":\"#boostrap-5\",\"children\":[]}],\"git\":{\"updatedTime\":1709472824000,\"contributors\":[{\"name\":\"Hosea Kibet\",\"email\":\"kibethosea8@gmail.com\",\"commits\":2},{\"name\":\"silah\",\"email\":\"silakosy@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"guide/installation.md\"}")
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
