<script>
	import { fetchTopic } from '../vuex/actions';
	import { getTopicDetail } from '../vuex/getters';
	import { timeFormat } from '../utils';
	import '../public/less/markdown.less';
	import globalHeader from './globalHeader';

	export default {
		created() {
			this.fetchTopic(this.$route.params.tid);
		},
		filters: {
			timeFormat
		},
		computed: {
			getTopic() {
				return this.topic;
			}
		},
		vuex: {
			actions: {
				fetchTopic
			},
			getters: {
				topic: getTopicDetail
			}
		},
		components: {
			globalHeader
		}
	}
</script>

<template>
	<div v-if="!!getTopic.author">
		<global-header></global-header>
		<div class="panel topic_detail">
			<div class="topic_header">
				<h2 class="topic_title">{{getTopic.title}}</h2>
				<div class="topic_info">
					<a class="topic_author_link" v-link="{path: '/u/' + getTopic.author.loginname}">
						<div class="author_avatar">
							<img :src="getTopic.author.avatar_url" />
						</div>
						<span class="topic_author">{{getTopic.author.loginname}}</span>
					</a>
					<span>{{getTopic.create_at | timeFormat}}</span>
					<span>{{getTopic.reply_count}} / {{getTopic.visit_count}}</span>
				</div>
			</div>
			<div class="topic_body">
				<div v-html="getTopic.content"></div>
			</div>
		</div>
		<div class="panel comment_detail">
			<div class="comment_header">{{topic.replies.length > 0 ? '评论列表' : '暂无评论'}}</div> 
			<div class="comment_list">
				<div class="comment_item" v-for="reply in topic.replies">	
					<div class="user_info">
						<a class="user_link" v-link="{path: '/u/' + reply.author.loginname}">
							<div class="user_avatar">
								<img :src="reply.author.avatar_url" />
							</div>
							<div class="user_name">{{reply.author.loginname}}</div>
						</a>
						<div class="time_stamp">{{reply.create_at | timeFormat }}</div>
						<div class="floor">{{$index + 1}}楼</div>
					</div>
					<div class="comment_content">
						<div v-html="reply.content"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
// 帖子详情
.topic_detail {
  .topic_header {
    padding: 10px;
    border-bottom: 1px #e0e0e0 solid;
    background-color: #fff;
    .topic_title {
      max-height: 40px;
      line-height: 20px;
      font-size: 18px;
      overflow: hidden;
    }
    .topic_info {
    	display: flex;
    	align-items: center;
      height: 34px;
      line-height: 34px;
      margin-top: 5px;
      .topic_author_link {
      	display: flex;
      	align-items: center;
        .author_avatar {
        	width: 30px;
	        margin-right: 10px;
	        border-radius: 50%;
	        overflow: hidden;
        }
        img {
        	display: block;
          width: 100%;
        }
        .topic_author {
	        margin-right: 5px;
	        font-size: 10px;
	        color: #666;
	      }
      }
      span {
        margin-right: 4px;
        font-size: 10px;
        color: #999;
        &:nth-child(2) {
          color: #666;
        }
      }
    }
  }
  .topic_body {
    padding: 10px;
    margin-top: 10px;
    background-color: #fff;
  }
}

.comment_header {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
}

// 帖子评论
.comment_list {
  margin-top: 10px;
  .comment_item {
    margin-top: 5px;
    padding: 10px;
    border-top: 1px solid #f0f0f0;
    background-color: #fff;
    .user_info {
      display: flex;
      align-items: center;
      height: 30px;
      .user_link {
      	display: flex;
      	align-items: center;
      }
      .user_avatar {
        width: 30px;
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
        font-size: 10px;
        color: #666;
      }
      .time_stamp {
        font-size: 10px;
        color: #999;
      }
      .floor {
        margin-left: 4px;
        font-size: 10px;
        color: #999;
      }
    }
    .comment_content {
      margin-top: 6px;
      .markdown-text {
        // display: none;
      }
    }
  }
}
</style>
