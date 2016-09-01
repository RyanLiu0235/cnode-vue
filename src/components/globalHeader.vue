<script>
	export default {

	}
</script>

<template>
	<div class="panel">
		<div class="header_container">
			<a class="back_button" href="javascript:history.go(-1);">&lt;</a>
			<div class="tab_list">
				<a class="tab_item v-link-active" v-link="{ path: '/tab/all', exact: true }">全部</a>
				<a class="tab_item" v-link="{ path: '/tab/good', exact: true }">精华</a>
				<a class="tab_item" v-link="{ path: '/tab/share', exact: true }">分享</a>
				<a class="tab_item" v-link="{ path: '/tab/ask', exact: true }">问答</a>
				<a class="tab_item" v-link="{ path: '/tab/job', exact: true }">招聘</a>
			</div>
			<div class="login">
				<a class="tab_item" v-link="{  }">登录</a>
				<a class="tab_item" v-link="{  }">注册</a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.panel {
		padding: 10px 5px;
		margin: 10px 5px 0;
		background-color: #fff;
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
		}
	}
</style>