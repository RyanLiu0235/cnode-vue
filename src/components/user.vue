<script>
	import { getCurUser } from '../vuex/actions';
	import { getUser } from '../vuex/getters';

	export default {
		created() {
			this.getCurUser(this.$route.params.username);
		},
		computed: {
			getUserDetail() {
				return this.user;
			}
		},
		vuex: {
			actions: {
				getCurUser
			},
			getters: {
				user: getUser
			}
		}
	}
</script>

<template>
	<div>
	</div>
</template>