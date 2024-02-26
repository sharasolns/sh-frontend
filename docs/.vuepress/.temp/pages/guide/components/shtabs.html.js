import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shtabs.html.vue"
const data = JSON.parse("{\"path\":\"/guide/components/shtabs.html\",\"title\":\"Sh Tabs\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Basic Example\",\"slug\":\"basic-example\",\"link\":\"#basic-example\",\"children\":[{\"level\":3,\"title\":\"Importing\",\"slug\":\"importing\",\"link\":\"#importing\",\"children\":[]},{\"level\":3,\"title\":\"Using\",\"slug\":\"using\",\"link\":\"#using\",\"children\":[]},{\"level\":3,\"title\":\"Attributes/Options\",\"slug\":\"attributes-options\",\"link\":\"#attributes-options\",\"children\":[]}]}],\"git\":{\"updatedTime\":1657034382000,\"contributors\":[{\"name\":\"Hosea Kibet\",\"email\":\"kibethosea8@gmail.com\",\"commits\":3}]},\"filePathRelative\":\"guide/components/shtabs.md\"}")
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
