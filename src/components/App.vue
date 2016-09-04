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
		<global-header :loginname="loginname" :avatar_url="avatar_url"></global-header>
		<router-view></router-view>
	</div>
</template>

<style lang="less">
	* {
		margin: 0;
		padding: 0;
		font-family: 'Microsoft Yahei';
	}
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
	}
	body {
		background-color: #efefef;
	}
</style>