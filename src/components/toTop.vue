<script>
	export default {
		data() {
			return {
				showButton: false
			}
		},
		ready : function() {
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
	<div @click="returnTop" v-show="showButton" class="toTop">返回顶部</div>
</template>

<style lang="less" scoped>
	.toTop {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    width: 50px;
    height: 50px;
    line-height: 15px;
    padding: 10px 10px;
    color: #fff;
    font-size: 12px;
    background-color: #f64c4c;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
	}
</style>