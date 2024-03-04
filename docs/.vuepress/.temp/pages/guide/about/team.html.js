import comp from "/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/about/team.html.vue"
const data = JSON.parse("{\"path\":\"/guide/about/team.html\",\"title\":\"Team\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"The Team\",\"slug\":\"the-team\",\"link\":\"#the-team\",\"children\":[]},{\"level\":2,\"title\":\"Join Us\",\"slug\":\"join-us\",\"link\":\"#join-us\",\"children\":[]},{\"level\":2,\"title\":\"Contact Us\",\"slug\":\"contact-us\",\"link\":\"#contact-us\",\"children\":[]}],\"git\":{\"updatedTime\":1709537757000,\"contributors\":[{\"name\":\"silah\",\"email\":\"silakosy@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"guide/about/team.md\"}")
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
