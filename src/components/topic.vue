<script>
	import { fetchTopic, deCollectTopic, collectTopic, num } from '../vuex/actions';
  import { getAccessToken, getCollectedTopics } from '../vuex/getters';
	import { timeFormat, prefixUrl } from '../utils';
	import '../public/less/markdown.less';
  import toTop from './toTop';
  import loading from './loading';

	export default {
    data() {
      return {
        topic: {
          author: {
            avatar_url: '',
            loginname: ''
          },
          replies: []
        },
        loading: true,
        topicCollected: false,
        collectState: ''
      }
    },
		filters: {
			timeFormat
		},
    methods: {
      handleCollectTopic() {
        this.collectState = '处理中...';
        if (this.topicCollected) {
          // 如果已收藏，则取消收藏
          this.deCollectTopic(this.accesstoken, this.topic.id)
            .then(res => {
              this.collectState = '';
              this.topicCollected = false;  
            }, res => {
              this.collectState = '';
              alert('取消收藏失败，请稍后重试');
            });
        } else {
          // 收藏
          this.collectTopic(this.accesstoken, this.topic.id)
            .then(res => {
              this.collectState = '';
              this.topicCollected = true;
            }, res => {
              this.collectState = '';
              alert('收藏失败，请稍后重试');
            });
        }
      }
    },
		vuex: {
			actions: {
				fetchTopic, collectTopic, deCollectTopic
			},
      getters: {
        accesstoken: getAccessToken,
        collectedTopics: getCollectedTopics
      }
		},
		components: {
			toTop, loading
		},
    route: {
      data (transition) {
        this.fetchTopic(this.$route.params.tid)
          .then(res => {
            transition.next({topic: res});
            this.loading = false;
            
            this.$nextTick(() => {
              // 将页面上的通过 @ 方式形成的用户详情页链接转换成 #!/user/somebody 的格式
              let mLink = document.querySelectorAll('a');
              mLink.forEach((link, index) => {
                let _url = prefixUrl(link.getAttribute('href'));
                if (!!_url) {
                  link.setAttribute('href', _url);
                }
              });

              // 判断本帖子用户是否已经收藏
              if (this.accesstoken) { // 只针对登录用户判断
                this.topicCollected = this.collectedTopics.indexOf(this.topic.id) > -1;
              }
            });
          }, res => {
            return {topic: {}}
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
      <div class="panel topic_detail">
        <div class="topic_header">
          <h2 class="topic_title">{{topic.title}}</h2>
          <div class="topic_info">
            <div class="info">
              <a class="topic_author_link" v-link="{path: '/user/' + topic.author.loginname}">
                <div class="author_avatar">
                  <img :src="topic.author.avatar_url" />
                </div>
                <span class="topic_author">{{topic.author.loginname}}</span>
              </a>
              <span>{{topic.create_at | timeFormat}}</span>
              <span>{{topic.reply_count}} / {{topic.visit_count}}</span>    
            </div>
            <div class="button_container">
              <div v-if="accesstoken" class="button" :class="collectState === '处理中...' ? 'process' : ''" :class="topicCollected ? 'collected' : ''" @click="handleCollectTopic">{{ !collectState ? (topicCollected ? '已收藏' : '收藏') : collectState }}</div>
            </div>
          </div>
        </div>
        <div class="topic_body">
          <div v-html="topic.content"></div>
        </div>
      </div>
      <div class="panel comment_detail">
        <div class="panel_title">{{topic.replies.length > 0 ? '评论列表' : '暂无评论'}}</div> 
        <div class="comment_list">
          <div class="comment_item" v-for="reply in topic.replies"> 
            <div class="user_info">
              <a class="user_link" v-link="{path: '/user/' + reply.author.loginname}">
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
    <to-top></to-top>
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
        justify-content: space-between;
        height: 34px;
        line-height: 34px;
        margin-top: 5px;
        .info {
          display: flex;
          align-items: center;
        }
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
  	        color: #666;
  	      }
        }
        span {
          display: block;
          height: 28px;
          line-height: 28px;
          margin-right: 4px;
          font-size: 12px;
          color: #999;
          text-align: center;
          &:nth-child(2) {
            color: #666;
          }
        }
      }
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
        background-color: #efd443;
        &.process {
          background-color: darken(#efd443, 20%);
        }
        &.collected {
          background-color: lighten(#efd443, 20%);
        }
      }
    }
    .topic_body {
      padding: 10px;
      margin-top: 10px;
      background-color: #fff;
    }
  }

  // 帖子评论
  .comment_item {
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
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
</style>
