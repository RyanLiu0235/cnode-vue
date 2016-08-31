export function routerConfig(router) {
	router.map({
		'/': {
			component: (resolve) => require(['./components/list'], resolve)
		},
		'/t/:tid': {
			component: (resolve) => require(['./components/topic'], resolve)
		}
	});
}