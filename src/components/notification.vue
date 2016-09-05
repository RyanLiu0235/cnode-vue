<script>
	import { getNotifications, getAccessToken } from '../vuex/getters';
	import { fetchNotifications, markAllNotifications } from '../vuex/actions';
	import { timeFormat } from '../utils';
	import loading from './loading';
	import toTop from './toTop';
	import '../public/less/markdown.less';

	export default {
		data() {
			return {
				loading: true,
				markState: '全部标为已读'
			}
		},
		components: {
			loading, toTop
		},
		filters: {
			timeFormat
		},
		methods: {
			handleMark() {
				this.markState = '标记中...';
				this.markAllNotifications(this.accesstoken)
					.then(res => {
						this.markState = '标记成功';
					});
			}
		},
		vuex: {
			actions: {
				fetchNotifications, markAllNotifications
			},
			getters: {
				notifications: getNotifications,
				accesstoken: getAccessToken
			}
		},
		route: {
			data(transition) {
				this.fetchNotifications(this.accesstoken)
					.then(res => {
						this.loading = false;
					});
			}
		}
	}
</script>

<template>
	<div>
		<div v-show="loading" class="panel">
			<loading loading="loading"></loading>
		</div>
		<div v-if="!loading">
			<!-- 未读消息 -->
			<div class="unread_notifications panel">
				<div class="panel_title unread_title" >
					<span class="title">未读消息</span>
					<div v-if="notifications.hasnot_read_messages.length > 0" class="button_container">
						<span class="mark_all button button_warning" :class="markState === '标记中...' ? 'process' : ''" @click="handleMark">{{ markState }}</span>
					</div>
				</div>
				<p class="panel_empty" v-if="notifications.hasnot_read_messages.length === 0">没有未读消息</p>
				<div class="notification_list" v-if="notifications.hasnot_read_messages.length > 0">
					<div class="notification_item" v-for="item in notifications.hasnot_read_messages">
						<div class="notification_author">
							<div class="author_avatar">
								<img :src="item.author.avatar_url">
							</div>
							<a v-link="{ path: '/user/' + item.author.loginname }" class="author_name">{{ item.author.loginname }}</a>
							<span class="reply_time">{{ item.create_at | timeFormat }}</span>
						</div>
						<div class="reply_topic">
							回复了主题：<a v-link="{ path: '/topic/' + item.topic.id }">{{ item.topic.title }}</a>
						</div>
						<div class="reply_content" v-html="item.reply.content"></div>
		      </div>
				</div>
			</div>
			<!-- 过往消息 -->
			<div class="read_notifications panel">
				<div class="panel_title">过往消息</div>
				<p class="panel_empty" v-if="notifications.has_read_messages.length === 0">没有未读消息</p>
				<div class="notification_list" v-if="notifications.has_read_messages.length > 0">
					<div class="notification_item" v-for="item in notifications.has_read_messages">
						<div class="notification_author">
							<div class="author_avatar">
								<img :src="item.author.avatar_url">
							</div>
							<a v-link="{ path: '/user/' + item.author.loginname }" class="author_name">{{ item.author.loginname }}</a>
							<span class="reply_time">{{ item.create_at | timeFormat }}</span>
						</div>
						<div class="reply_topic">
							回复了主题：<a v-link="{ path: '/topic/' + item.topic.id }">{{ item.topic.title }}</a>
						</div>
						<div class="reply_content" v-html="item.reply.content"></div>
		      </div>
				</div>
			</div>
		</div>
		<to-top></to-top>
	</div>
</template>

<style lang="less" scoped>
	.unread_title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			display: block;
		}
		.button_container {
			text-align: center;
			.button {
				display: inline-block;
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				text-align: center;
				font-size: 14px;
				color: #fff;
				&.button_warning {
					background-color: #f64c4c;
					&.process {
						background-color: lighten(#f64c4c, 10%); 
					}
				}
				&.button_primary {
					background-color: #6666ff;
				}
			}
		}
	}
	.notification_list {
		background-color: #fff;
		.notification_item {
			padding-bottom: 5px;
			border-bottom: 1px #e0e0e0 solid;
		}
		.notification_author {
			display: flex;
			align-items: center;
			color: #333;
			font-size: 14px;
			.author_avatar {
				display: block;
				width: 30px;
				margin-right: 5px;
				border-radius: 50%;
				overflow: hidden;
				img {
					display: block;
					width: 100%;
				}
			}
			.author_name {
				display: block;
				line-height: 50px;
				margin-right: 15px;
				overflow: hidden;
				color: #333;
			}
			.reply_time {
				display: block;
				color: #999;
			}
		}
		.reply_topic {
	    line-height: 20px;
	    font-size: 12px;
	    color: #666;
			white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    a {
	    	color: #06c;
	    }
		}
		.reply_content {
			max-height: 44px;
	    padding: 5px;
	    margin-top: 5px;
	    background: #d4d4d4;
	    border-radius: 5px;
	    overflow: hidden;
	    box-sizing: border-box;
		}
	}
</style>