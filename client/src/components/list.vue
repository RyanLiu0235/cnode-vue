<script>
	import { getStories } from '../vuex/getters';
	import { getNews } from '../vuex/actions';
	export default {
		computed: {
			getAllLists() {
				this.getNews();
				return this.getLists[0];
			}
		},
		filters: {
			formatSrcUrl (srcUrl) { 
				return srcUrl[0].replace(/http\w{0,1}:\/\/p/g, 'http://localhost:5001/img/p');
			}
		},
		vuex: {
			getters: {
				getLists: getStories
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
						<img :src="item.images | formatSrcUrl">
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
			width: 40px;
			height: 40px;
			margin-right: 10px;
			img {
				display: block;
				max-width: 100%;
			}
		}
		.story_title {
			flex: 1;
			color: #333;
			overflow: hidden;
		}
	}
</style>