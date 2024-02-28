export const themeData = JSON.parse("{\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[{\"text\":\"Documentation\",\"link\":\"/guide/\"},{\"text\":\"Backend Docs\",\"link\":\"https://backend-documentation.pages.dev/\"},{\"text\":\"Github\",\"link\":\"https://github.com/sharasolns/sh-frontend\"}],\"sidebar\":{\"/guide\":[{\"text\":\"Introduction\",\"children\":[\"/guide/\",\"/guide/installation\"]},{\"text\":\"Components\",\"collapsible\":false,\"children\":[\"/guide/components/\",\"/guide/components/shform\",\"/guide/components/shtabs\",\"/guide/components/shdynamictabs\",\"/guide/components/shmodal\",\"/guide/components/shcanvas\",\"/guide/components/shtable\"]},{\"text\":\"Helpers\",\"collapsible\":false,\"children\":[\"/guide/helpers/\",\"/guide/helpers/shuser/\",\"/guide/helpers/shapi/\",\"/guide/helpers/shrepo/\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
