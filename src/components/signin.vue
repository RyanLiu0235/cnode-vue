<script>
	import { signin } from '../vuex/actions';

	export default {
		data() {
			return {
				fromPath: '',
				accesstoken: '',
				landState: '登录'
			}
		},
		vuex: {
			actions: {
				signin
			}
		},
		methods: {
			handleSignin() {
				this.landState = '登录中...';
				this.signin(this.accesstoken)
					.then(res => {
						this.landState = '登录成功';
						this.$router.go({
							path: this.fromPath
						});
					}, res => {
						this.landState = '登录';
						this.accesstoken = '';
					});
			}
		},
		route: {
			data(transition) {
				transition.next({
					fromPath: transition.from.path
				});
			}
		}
	}
</script>

<template>
	<div>
		<div class="panel">
			<p class="panel_title">登录到CNode</p>
			<div class="signup_form">
				<div class="accesstoken">
					<label for="accesstoken">accessToken：</label>
					<div class="form_control">
						<input v-model="accesstoken" type="text" id="accesstoken" name="accesstoken" placeholder="请输入">
					</div>
				</div>
				<div class="button_container">
					<span class="signup_button" :class="landState === '登录中...' ? 'landing' : ''" @click="handleSignin">{{ landState }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.accesstoken {
	display: flex;
	margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
	label {
		line-height: 30px;
		font-size: 14px;
		color: #333;
	}
	.form_control {
    flex: 1;
		margin-top: 5px;
		input {
			width: 100%;
			line-height: 28px;
			padding: 0 4px;
			font-size: 12px;
			color: #666;
			outline: none;
			border: 1px #e0e0e0 solid;
			box-sizing: border-box;
		}
	}
}
.button_container {
	text-align: center;
	.signup_button {
		display: inline-block;
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		margin: 5px auto 0;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background-color: #f64c4c;
		&.landing {
			background-color: darken(#f64c4c, 20%);
		}
	}
}
	
</style>