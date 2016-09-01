export function routerConfig(router) {
  router.map({
    '/': {
      component: (resolve) => require(['./components/list'], resolve)
    },
    '/tab/:tabType': {
      component: (resolve) => require(['./components/list'], resolve)
    },
    '/topic/:tid': {
      component: (resolve) => require(['./components/topic'], resolve)
    },
    '/user/:username': {
      component: (resolve) => require(['./components/user'], resolve)
    },
    '/signin': {
      component: (resolve) => require(['./components/signin'], resolve)
    }
  });
}
