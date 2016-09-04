<script>
	import { signin } from '../vuex/actions';

	export default {
		data() {
			return {
				fromPath: '',
				accesstoken: ''
			}
		},
		vuex: {
			actions: {
				signin
			}
		},
		methods: {
			handleSignin() {
				this.signin(this.accesstoken)
					.then(res => {
						this.$router.go({
							path: this.fromPath
						});
					}, res => {
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
				<span class="signup_button" @click="handleSignin">登录</span>
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
.signup_button {
	display: block;
	width: 60px;
	height: 30px;
	line-height: 30px;
	margin: 5px auto 0;
	text-align: center;
	color: #fff;
	background-color: #f64c4c;
}
</style>