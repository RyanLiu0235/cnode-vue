<script>
	import { getCurTopic } from '../vuex/actions';
	import { getTopic } from '../vuex/getters';
	import '../public/less/markdown.less';
	export default {
		created() {
			this.getCurTopic(this.$route.params.tid);
		},
		filters: {
			timeFormat(str) {
				var date = new Date(str);
		    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
		    if (time < 0) {
	        return '';
		    } else if (time / 1000 < 60) {
	        return parseInt((time / 1000)) + '秒前';
		    } else if ((time / 60000) < 60) {
	        return parseInt((time / 60000)) + '分钟前';
		    } else if ((time / 3600000) < 24) {
	        return parseInt(time / 3600000) + '小时前';
		    } else if ((time / 86400000) < 31) {
	        return parseInt(time / 86400000) + '天前';
		    } else if ((time / 2592000000) < 12) {
	        return parseInt(time / 2592000000) + '月前';
		    } else {
	        return parseInt(time / 31536000000) + '年前';
		    }
			}
		},
		computed: {
			getTopic() {
				return this.topic;
			}
		},
		vuex: {
			actions: {
				getCurTopic
			},
			getters: {
				topic: getTopic
			}
		}
	}
</script>

<template>
	<div class="topic_detail">
		<div>
			<div class="topic_header">
				<h2 class="topic_title">{{getTopic.title}}</h2>
				<div class="topic_info">
					<span>{{getTopic.author}}</span>
					<span>{{getTopic.create | timeFormat}}</span>
					<span>{{getTopic.reply}} / {{getTopic.read}}</span>
				</div>
			</div>
			<div class="topic_body">
				<div v-html="getTopic.content"></div>
			</div>
		</div>
		<div>
			<div class="comment_header">{{topic.replies.length > 0 ? '评论列表' : '暂无评论'}}</div> 
			<div class="comment_list">
				<div class="comment_item" v-for="reply in topic.replies">	
					<div class="user_info">
						<div class="user_avatar">
							<img :src="reply.author.avatar_url" />
						</div>
						<div class="user_name">{{reply.author.loginname}}</div>
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

<style lang="less">
	// 帖子详情
	.topic_detail {
	  padding: 5px;
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
	      height: 20px;
	      line-height: 20px;
	      margin-top: 5px;
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
	  margin-top: 20px;
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
	      .user_avatar {
	        position: relative;
	        width: 30px;
	        margin-right: 10px;
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
