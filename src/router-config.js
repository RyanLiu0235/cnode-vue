export function routerConfig(router) {
  router.map({
    '/': {
      component: (resolve) => require(['./components/list'], resolve)
    },
    '/tab/:tabType': {
      component: (resolve) => require(['./components/list'], resolve)
    },
    '/t/:tid': {
      component: (resolve) => require(['./components/topic'], resolve)
    },
    '/u/:username': {
      component: (resolve) => require(['./components/user'], resolve)
    }
  });
}
