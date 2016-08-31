<script>
	import { fetchUser } from '../vuex/actions';
	import { getUserDetail } from '../vuex/getters';

	export default {
		created() {
			this.fetchUser(this.$route.params.username);
		},
		computed: {
			getUser() {
				return this.user;
			}
		},
		vuex: {
			actions: {
				fetchUser
			},
			getters: {
				user: getUserDetail
			}
		}
	}
</script>

<template>
	<div>
	</div>
</template>