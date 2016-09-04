<script>
	import store from '../vuex/store';
	import globalHeader from './globalHeader';

	export default {
		store,
		components: {
			globalHeader
		}
	}
</script>

<template>
	<div>
		<global-header></global-header>
		<router-view></router-view>
	</div>
</template>

<style lang="less">
</style>