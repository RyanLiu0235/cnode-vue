<script>
	export default {
		data() {
			return {
				showButton: false
			}
		},
		ready() {
			window.addEventListener('scroll', () => {
				if(window.scrollY > 150){
					this.showButton = true;
				} else {
					this.showButton = false;
				}    
			}, false);
		},
		methods: {
			returnTop() {
				window.scrollTo(0, 0);
			}
		}
	}
</script>

<template>
	<div @click="returnTop" v-show="showButton" class="toTop"></div>
</template>

<style lang="less" scoped>
	.toTop {
    position: fixed;
    bottom: 17px;
    right: 20px;
    z-index: 100;
    width: 44px;
    height: 44px;
    background-image: url('../public/img/top.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
	}
</style>