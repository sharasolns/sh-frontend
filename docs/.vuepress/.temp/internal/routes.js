export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Guide"} }],
  ["/guide/installation.html", { loader: () => import(/* webpackChunkName: "installation.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/installation.html.js"), meta: {"title":"Installation"} }],
  ["/guide/introduction.html", { loader: () => import(/* webpackChunkName: "introduction.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/introduction.html.js"), meta: {"title":"Introduction"} }],
  ["/guide/about/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/about/index.html.js"), meta: {"title":"About"} }],
  ["/guide/about/overview.html", { loader: () => import(/* webpackChunkName: "overview.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/about/overview.html.js"), meta: {"title":"Overview"} }],
  ["/guide/about/team.html", { loader: () => import(/* webpackChunkName: "team.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/about/team.html.js"), meta: {"title":"Team"} }],
  ["/guide/components/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/index.html.js"), meta: {"title":"Components"} }],
  ["/guide/components/shautoform.html", { loader: () => import(/* webpackChunkName: "shautoform.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shautoform.html.js"), meta: {"title":"Sh Auto Form"} }],
  ["/guide/components/shcanvas.html", { loader: () => import(/* webpackChunkName: "shcanvas.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shcanvas.html.js"), meta: {"title":"Sh Canvas"} }],
  ["/guide/components/shcardlayout.html", { loader: () => import(/* webpackChunkName: "shcardlayout.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shcardlayout.html.js"), meta: {"title":"sh card layout"} }],
  ["/guide/components/shconfirmationaction.html", { loader: () => import(/* webpackChunkName: "shconfirmationaction.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shconfirmationaction.html.js"), meta: {"title":"Confirmation Action"} }],
  ["/guide/components/shdynamictabs.html", { loader: () => import(/* webpackChunkName: "shdynamictabs.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shdynamictabs.html.js"), meta: {"title":"Sh Dynamic Tabs"} }],
  ["/guide/components/shform.html", { loader: () => import(/* webpackChunkName: "shform.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shform.html.js"), meta: {"title":"Sh Form"} }],
  ["/guide/components/shmodal.html", { loader: () => import(/* webpackChunkName: "shmodal.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shmodal.html.js"), meta: {"title":"ShModal"} }],
  ["/guide/components/shmodalform.html", { loader: () => import(/* webpackChunkName: "shmodalform.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shmodalform.html.js"), meta: {"title":"Sh modal Form"} }],
  ["/guide/components/shroutes.html", { loader: () => import(/* webpackChunkName: "shroutes.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shroutes.html.js"), meta: {"title":"Routes"} }],
  ["/guide/components/shtable.html", { loader: () => import(/* webpackChunkName: "shtable.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shtable.html.js"), meta: {"title":"Sh Table"} }],
  ["/guide/components/shtabs.html", { loader: () => import(/* webpackChunkName: "shtabs.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/components/shtabs.html.js"), meta: {"title":"Sh Tabs"} }],
  ["/guide/helpers/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/index.html.js"), meta: {"title":"Helpers"} }],
  ["/guide/helpers/shapi/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/shapi/index.html.js"), meta: {"title":"shApi"} }],
  ["/guide/helpers/shuser/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/shuser/index.html.js"), meta: {"title":"shUser"} }],
  ["/guide/helpers/shrepo/", { loader: () => import(/* webpackChunkName: "index.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/guide/helpers/shrepo/index.html.js"), meta: {"title":"shRepo"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/private/var/www/html/shara/sh-frontend/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
