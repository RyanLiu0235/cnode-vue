<script>
	import store from '../vuex/store';

	export default {
		store
	}
</script>

<template>
	<div>
		<router-view></router-view>
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