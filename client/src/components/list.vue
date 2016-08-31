<script>
	import { getStories } from '../vuex/getters';
	import { getNews } from '../vuex/actions';
	export default {
		computed: {
			getAllLists() {
				return this.lists[0];
			}
		},
		filters: {
			formatSrcUrl (srcUrl) { 
				return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'http://localhost:5001/img/p');
			}
		},
		created() {
			this.getNews();
		},
		vuex: {
			getters: {
				lists: getStories
			},
			actions: {
				getNews
			}
		}
	}
</script>

<template>
	<div>
		<ul>
			<li v-for="item in getAllLists">
				<a class="story_item" v-link="{path: '/t/'+item.id}">
					<div class="story_img">
						<img :src="item.images[0] | formatSrcUrl">
					</div>
					<p class="story_title">{{ item.title }}</p>
				</a>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
	ul {
		padding: 20px;
		li {
			margin-top: 10px;
			border-style: 1px #e0e0e0 solid;
		}
	}
	.story_item {
		display: flex;
		.story_img {
			width: 60px;
			height: 60px;
			margin-right: 10px;
			img {
				display: block;
				max-width: 100%;
			}
		}
		.story_title {
			flex: 1;
			max-height: 60px;
			color: #333;
			overflow: hidden;
		}
	}
</style>