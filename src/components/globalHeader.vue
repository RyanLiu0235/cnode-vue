<script>
	import { fetchList } from '../vuex/actions';
	import { getLoginName } from '../vuex/getters';

	export default {
		vuex: {
			actions: {
				fetchList
			},
			getters: {
				loginname: getLoginName
			}
		}
	}
</script>

<template>
	<div class="panel">
		<div class="header_container">
			<a class="back_button" href="javascript:history.go(-1);">&lt;</a>
			<div class="tab_list">
				<a class="tab_item" v-link="{ path: '/tab/all', exact: true }">全部</a>
				<a class="tab_item" v-link="{ path: '/tab/good', exact: true }">精华</a>
				<a class="tab_item" v-link="{ path: '/tab/share', exact: true }">分享</a>
				<a class="tab_item" v-link="{ path: '/tab/ask', exact: true }">问答</a>
				<a class="tab_item" v-link="{ path: '/tab/job', exact: true }">招聘</a>
			</div>
			<div class="login">
				<a v-if="!loginname" class="tab_item" v-link="{ path: '/signin' }">登录</a>
				<a v-if="loginname" class="tab_item user_name" v-link="{ path: '/u/' + loginname }">{{ loginname }}</a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.panel {
		padding: 10px 5px;
		margin: 10px 5px 0;
		background-color: #fff;
		.panel_title {
			line-height: 30px;
			font-size: 16px;
			color: #333;
			border-bottom: 1px #e0e0e0 solid;
		}
		.panel_empty {
			line-height: 16px;
			margin-top: 5px;
			font-size: 12px;
			color: #666;
		}
		.panel_row {
			margin-top: 10px;
		}
	}
	.header_container {
		display: flex;
		height: 34px;
		align-items: center;
		justify-content: space-between;
		.back_button {
			display: block;
			width: 34px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			color: #333;
		}
		.tab_list {
			display: flex;
			flex: 1;
		}
		.login {
			display: flex;
		}
		.tab_item {
			display: block;
			width: 40px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			font-size: 14px;
			color: #333;
			&.v-link-active {
				color: #fff;
				background-color: #ff3c3c;
			}
			&.user_name {
				width: auto;
				max-width: 100px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
</style>