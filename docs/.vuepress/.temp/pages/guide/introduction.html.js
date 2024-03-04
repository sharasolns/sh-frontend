import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/introduction.html.vue"
const data = JSON.parse("{\"path\":\"/guide/introduction.html\",\"title\":\"Introduction\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Getting Started\",\"slug\":\"getting-started\",\"link\":\"#getting-started\",\"children\":[]},{\"level\":2,\"title\":\"Installation\",\"slug\":\"installation\",\"link\":\"#installation\",\"children\":[{\"level\":3,\"title\":\"Boostrap 5\",\"slug\":\"boostrap-5\",\"link\":\"#boostrap-5\",\"children\":[]}]},{\"level\":2,\"title\":\"usage\",\"slug\":\"usage\",\"link\":\"#usage\",\"children\":[]}],\"git\":{\"updatedTime\":1709227408000,\"contributors\":[{\"name\":\"silah\",\"email\":\"silakosy@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"guide/introduction.md\"}")
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
