export function routerConfig(router) {
	router.map({
		'/t/:tid': {
			component: (resolve) => require(['./components/topic'], resolve)
		}
	});
}