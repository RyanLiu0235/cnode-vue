<script>
	import { fetchUser } from '../vuex/actions';
	import { getUserDetail } from '../vuex/getters';
	import { timeFormat } from '../utils';
	import globalHeader from './globalHeader';

	export default {
		created() {
			this.fetchUser(this.$route.params.username);
		},
		computed: {
			getUser() {
				return this.user;
			}
		},
		filters: {
			timeFormat
		},
		vuex: {
			actions: {
				fetchUser
			},
			getters: {
				user: getUserDetail
			}
		},
		components: {
			globalHeader
		}
	}
</script>

<template>
	<div>
		<global-header></global-header>
		<div class="user_info panel">
			<div class="panel_title">个人简介</div>
			<div class="panel_container">
				<div class="user_row panel_row">
					<div class="user_avatar">
						<img :src="getUser.avatar_url" />
					</div>
					<div class="user_name">{{ getUser.loginname }}</div>
				</div>
				<div class="user_github panel_row">github名称：{{ getUser.githubUsername }}</div>
				<div class="user_createdAt panel_row">注册于：{{ getUser.create_at | timeFormat }}</div>
				<div class="user_score panel_row">积分：{{ getUser.score }}</div>
			</div>
		</div>
		<!-- 最近参与 -->
		<div class="recent_topics panel">
			<div class="panel_title">最近参与的话题</div>
			<p class="panel_empty" v-if="getUser.recent_topics.length === 0">最近没有参与话题</p>
			<div class="topic_list" v-if="getUser.recent_topics.length > 0">
				<div class="topic_item" v-for="item in getUser.recent_topics">
	        <div class="user_avatar">
	          <img :src="item.author.avatar_url"/> 
	        </div> 
	        <a v-link="{ path: '/t/' + item.id }" class="topic_title">
	        	<h4>{{ item.title }}</h4> 
	        </a> 
	        <div class="reply_view">{{ item.last_reply_at | timeFormat }}</div> 
	      </div>
			</div>
		</div>
		<!-- 最近回复 -->
		<div class="recent_replies panel">
			<div class="panel_title">最近回复的话题</div>
			<p class="panel_empty" v-if="getUser.recent_replies.length === 0">最近没有参与话题</p>
			<div class="topic_list" v-if="getUser.recent_replies.length > 0">
				<div class="topic_item" v-for="item in getUser.recent_replies">
	        <div class="user_avatar">
	          <img :src="item.author.avatar_url"/> 
	        </div> 
	        <a v-link="{ path: '/t/' + item.id }" class="topic_title">
	        	<h4>{{ item.title }}</h4> 
	        </a> 
	        <div class="reply_view">{{ item.last_reply_at | timeFormat }}</div> 
	      </div>
			</div>
	</div>
</template>

<style lang="less" scoped>
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
    margin-right: 5px;
    font-size: 14px;
    color: #666;
  }
  .user_github {
  	font-size: 16px;
  }
  .user_createdAt {
  	font-size: 12px;
  }
  .user_score {
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