<script>
	import list from './list';
	import store from '../vuex/store';

	export default {
		store,
		components: {
			list
		}
	}
</script>

<template>
	<div>
		<list></list>
	</div>
</template>

<style lang="less">
	* {
		margin: 0;
		padding: 0;
	}
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
	}
</style>