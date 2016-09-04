<script>
	import { getLoginName, getAvatarUrl, getUnreadNotificationsNum } from '../vuex/getters';
	export default {
		props: ['loginname', 'avatar_url'],
		vuex: {
			getters: {
				loginname: getLoginName,
				avatar_url: getAvatarUrl,
				unread: getUnreadNotificationsNum
			}
		}
	}
</script>

<template>
	<div class="panel">
		<div class="header_container">
			<a class="back_button" href="javascript:history.go(-1);"></a>
			<div class="tab_list">
				<a class="tab_item" v-link="{ path: '/tab/all', exact: true }">全部</a>
				<a class="tab_item" v-link="{ path: '/tab/good', exact: true }">精华</a>
				<a class="tab_item" v-link="{ path: '/tab/share', exact: true }">分享</a>
				<a class="tab_item" v-link="{ path: '/tab/ask', exact: true }">问答</a>
				<a class="tab_item" v-link="{ path: '/tab/job', exact: true }">招聘</a>
			</div>
			<div class="login">
				<a v-if="!loginname" class="tab_item" v-link="{ path: '/signin' }">登录</a>
				<a v-if="loginname" class=" user_name" v-link="{ path: '/user/' + loginname }">
					<img :src="avatar_url">
					<i v-if="unread > 0" class="unread_num">{{ unread }}</i>
				</a>
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
			padding: 0 10px;
			line-height: 30px;
			font-size: 16px;
			color: #333;
			border-bottom: 1px #e0e0e0 solid;
		}
		.panel_container {
			padding: 0 10px;
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
			width: 30px;
			height: 30px;
			margin: 0 10px;
			background-image: url('../public/img/back.png');
	    background-repeat: no-repeat;
	    background-position: center center;
	    background-size: cover;
		}
		.tab_list {
			display: flex;
			flex: 1;
		}
		.tab_item {
			display: block;
			width: 36px;
			height: 34px;
			padding: 0 3px;
			line-height: 34px;
			text-align: center;
			font-size: 14px;
			color: #333;
			&.v-link-active {
				color: #fff;
				background-color: #f64c4c;
			}
		}
		.login {
			margin-right: 10px;
		}
		.user_name {
			position: relative;
			display: block;
			width: 30px;
			img {
				display: block;
				width: 100%;
				border-radius: 50%;
			}
			.unread_num {
				position: absolute;
				top: -2px;
				right: -2px;
				z-index: 2; 
		    height: 12px;
		    min-width: 6px;
		    line-height: 14px;
		    padding: 0 3px;
		    border-radius: 6px;
				font-size: 10px;
				color: #fff;
				font-style: normal;
				background-color: #f64c4c;
			}
		}
	}
</style>