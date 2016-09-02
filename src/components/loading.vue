<script>
	export default {
		props: ['loading']
	}
</script>

<template>
	<div class="loading" v-show="loading"></div>
</template>

<style lang="less" scoped>
	.loading {
		width: 40px;
		height: 40px;
		margin: 10px auto;
		background-image: url('../public/img/loading.png');
	  background-repeat: no-repeat;
	  background-position: center center;
	  background-size: cover;
	  animation: rotate 1s linear infinite;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-180deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>