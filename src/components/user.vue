<script>
	import { fetchUser, signout } from '../vuex/actions';
	import { getLoginName, getUnreadNotificationsNum } from '../vuex/getters';
	import { timeFormat } from '../utils';
  import toTop from './toTop';
  import loading from './loading';

	export default {
		data() {
			return {
				user: {
					recent_topics: [],
					recent_replies: []
				},
				loading: true,
				pageUser: ''
			}
		},
		filters: {
			timeFormat
		},
		methods: {
			handleLogout() {
				this.signout()
					.then(res => {
						this.$router.go('/');
					});
			}
		},
		computed: {
			isSelf() {
				return this.pageUser === this.loginname;
			}
		},
		vuex: {
			actions: {
				fetchUser, signout
			},
			getters: {
				loginname: getLoginName,
				unread: getUnreadNotificationsNum
			}
		},
		components: {
			toTop, loading
		},
    route: {
      data (transition) {
      	this.pageUser = this.$route.params.username;
        this.fetchUser(this.pageUser)
          .then(res => {
          	this.loading = false;
            transition.next({user: res});
          }, res => {
            return {user: {}}
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
		<div v-show="!loading">
			<div class="user_info panel">
				<div class="panel_title">个人简介</div>
				<div class="panel_container">
					<div class="user_row panel_row">
						<div class="user_avatar">
							<img :src="user.avatar_url" />
						</div>
						<div class="user_name">{{ user.loginname }}</div>
						<div class="button_container" v-if="isSelf">
							<div class="button button_warning" @click="handleLogout">登出</div>
							<a v-link="{ path: '/user/' + loginname + '/notifications'}" class="button button_primary">查看消息</a>
						</div>
					</div>
					<div class="user_github panel_row">github名称：{{ user.githubUsername }}</div>
					<div class="user_createdAt panel_row">注册于：{{ user.create_at | timeFormat }}</div>
					<div class="user_score panel_row">积分：{{ user.score }}</div>
					<div class="user_notification panel_row">
						未读消息：{{ unread }}
					</div>
				</div>
			</div>
			<!-- 最近参与 -->
			<div class="recent_topics panel">
				<div class="panel_title">最近参与的话题</div>
				<p class="panel_empty" v-if="user.recent_topics.length === 0">最近没有参与话题</p>
				<div class="topic_list" v-if="user.recent_topics.length > 0">
					<div class="topic_item" v-for="item in user.recent_topics">
		        <div class="user_avatar">
		          <img :src="item.author.avatar_url"/> 
		        </div> 
		        <a v-link="{ path: '/topic/' + item.id }" class="topic_title">
		        	<h4>{{ item.title }}</h4> 
		        </a> 
		        <div class="reply_view">{{ item.last_reply_at | timeFormat }}</div> 
		      </div>
				</div>
			</div>
			<!-- 最近回复 -->
			<div class="recent_replies panel">
				<div class="panel_title">最近回复的话题</div>
				<p class="panel_empty" v-if="user.recent_replies.length === 0">最近没有参与话题</p>
				<div class="topic_list" v-if="user.recent_replies.length > 0">
					<div class="topic_item" v-for="item in user.recent_replies">
		        <div class="user_avatar">
		          <img :src="item.author.avatar_url"/> 
		        </div> 
		        <a v-link="{ path: '/topic/' + item.id }" class="topic_title">
		        	<h4>{{ item.title }}</h4> 
		        </a> 
		        <div class="reply_view">{{ item.last_reply_at | timeFormat }}</div> 
		      </div>
				</div>
			</div>
		</div>
		<to-top></to-top>
	</div>
</template>

<style lang="less" scoped>
	.user_info {
		.user_row {
	  	display: flex;
	  	align-items: center;
	  }
	  .user_avatar {
	    width: 60px;
	    height: 60px;
	    margin-right: 10px;
	    border-radius: 50%;
	    overflow: hidden;
	    img {
	    	display: block;
	      width: 100%;
	    }
	  }
	  .user_name {
	  	flex: 1;
	    margin-right: 5px;
	    font-size: 14px;
	    color: #666;
	  }
		.button_container {
			text-align: center;
			.button {
				display: inline-block;
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				margin: 5px auto 0;
				text-align: center;
				font-size: 14px;
				color: #fff;
				&.button_warning {
					background-color: #f64c4c;
				}
				&.button_primary {
					background-color: #6666ff;
				}
			}
		}
	  .user_github {
	  	font-size: 16px;
	  }
	  .user_createdAt, .user_score, .user_notification {
	  	font-size: 12px;
	  }
	}
	.topic_list {
		background-color: #fff;
		.topic_item {
			display: flex;
			align-items: center;
			height: 50px;
			padding: 0 10px;
			border-bottom: 1px #e0e0e0 solid;
			box-sizing: border-box;
			.user_avatar {
				position: relative;
				display: block;
				width: 30px;
				margin-right: 5px;
				border-radius: 50%;
				overflow: hidden;
				&:after {
					content: '';
					display: block;
					width: 100%;
					padding-top: 100%;
				}
				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
				}
			}
			.topic_title {
				display: block;
				flex: 1;
				height: 50px;
				line-height: 50px;
				margin-right: 5px;
				color: #333;
				font-weight: normal;
				font-size: 14px;
				overflow: hidden;
				h4 {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.reply_view {
				font-size: 12px;
				.reply_number {
					color: #999;
				}
				.view_number {
					color: #666;
				}
			}
		}
	}
</style>