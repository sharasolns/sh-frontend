import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/shapi/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/helpers/shapi/\",\"title\":\"shApi\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Importing\",\"slug\":\"importing\",\"link\":\"#importing\",\"children\":[]},{\"level\":2,\"title\":\"Methods\",\"slug\":\"methods\",\"link\":\"#methods\",\"children\":[{\"level\":3,\"title\":\"doGet\",\"slug\":\"doget\",\"link\":\"#doget\",\"children\":[]},{\"level\":3,\"title\":\"doPost\",\"slug\":\"dopost\",\"link\":\"#dopost\",\"children\":[]}]}],\"git\":{\"updatedTime\":1657169450000,\"contributors\":[{\"name\":\"Hosea Kibet\",\"email\":\"kibethosea8@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"guide/helpers/shapi/README.md\"}")
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
