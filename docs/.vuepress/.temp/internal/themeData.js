export const themeData = JSON.parse("{\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[{\"text\":\"Documentation\",\"link\":\"/guide/introduction\"},{\"text\":\"Backend Docs\",\"link\":\"https://backend-documentation.pages.dev/\"},{\"text\":\"Github\",\"link\":\"https://github.com/sharasolns/sh-frontend\"}],\"sidebar\":{\"/guide\":[{\"text\":\"Guide\",\"collapsible\":false,\"children\":[\"/guide/introduction\"]},{\"text\":\"Layouts\",\"collapsible\":false,\"children\":[\"/guide/components/shcardlayout\"]},{\"text\":\"Components\",\"collapsible\":false,\"children\":[\"/guide/components/shmodal\",\"/guide/components/shmodalform\",\"/guide/components/shcanvas\",\"/guide/components/shconfirmationaction\",\"/guide/components/shroutes\",\"/guide/components/shtabs\",\"/guide/components/shdynamictabs\",\"/guide/components/shform\",\"/guide/components/shautoform\",\"/guide/components/shtable\"]},{\"text\":\"Graph Ql\",\"collapsible\":true,\"children\":[\"/guide/graphql/\"]},{\"text\":\"Helpers\",\"collapsible\":true,\"children\":[\"/guide/helpers/shuser/\",\"/guide/helpers/shapi/\",\"/guide/helpers/shrepo/\",\"/guide/helpers/shfetch/\"]},{\"text\":\"About\",\"collapsible\":false,\"children\":[\"/guide/about/overview\",\"/guide/about/team\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
