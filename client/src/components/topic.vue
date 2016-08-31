<script>
	import { getCurTopic } from '../vuex/actions';
	import { getTopic } from '../vuex/getters';
	export default {
		data() {
			return {
				tid: ''
			}
		},
		created() {
			this.getCurTopic(this.$route.params.tid);
		},
		filters: {
			formatSrcUrl (srcUrl) { 
				if (!srcUrl) return;
				return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'http://localhost:5001/img/p');
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
	<div>
		{{topic.body}}
		<div v-html="topic.body">
			
		</div>
	</div>
	<style type="text/css">
		{{topic.css}}
	</style>
</template>

