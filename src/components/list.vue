<script>
	import { getTopicList } from '../vuex/getters';
	import { fetchList } from '../vuex/actions';
	export default {
		computed: {
			getLists () {
				return this.lists[0];
			}
		},
		created() {
			this.fetchList();
		},
		vuex: {
			getters: {
				lists: getTopicList
			},
			actions: {
				fetchList
			}
		}
	}
</script>

<template>
	<div>
		<div class="topic_list">
			<div class="topic_item" v-for="item in getLists">
        <div class="user_avatar">
          <img :src="item.author.avatar_url"/> 
        </div> 
        <a v-link="{ path: '/t/' + item.id }" class="topic_title">
        	<h4>{{ item.title }}</h4> 
        </a> 
        <div class="reply_view">
          <span class="reply_number"> {{ item.reply_count }} </span> 
          <span class="seperate">/</span>
          <span class="view_number"> {{ item.visit_count}} </span> 
        </div> 
      </div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.topic_list {
	padding: 0 5px;
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