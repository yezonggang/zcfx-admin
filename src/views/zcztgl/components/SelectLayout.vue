<template>
	<div class="app-container">
		<!-- titie start-->
		<el-card v-if="titleActive" class="zc-mb-20">
			<div>
				<slot name="title">
					<span>在这里写标题文字</span>
				</slot>
				<el-divider></el-divider>
				<slot name="describe">
					<span>在这里写介绍文字</span>
				</slot>
			</div>
		</el-card>
		<!-- content start-->
		<el-row
			:gutter="24"
			name="main"
			style="display: flex; align-items: stretch"
		>
			<slot>
				<!-- left start -->
				<slot name="left">
					<el-col :span=leftStyle style="display: flex;flex-direction: column;justify-content: space-between;height:820px;">
						<el-card style="height: 100%">
							<div class="zc-title">
								<slot name="listTitle">
									<span>这里写标题文字</span>
								</slot>
							</div>
							<slot name="conditional">
								<el-form>
									<el-input
										class="zc-wth-200 zc-mb-10"
										size="medium"
										type="text"
										placeholder="这里输入内容"
									></el-input>
									<el-input
										class="zc-wth-200 zc-mb-10"
										size="medium"
										type="text"
										placeholder="这里输入内容"
									></el-input>
									<el-input
										class="zc-wth-200 zc-mb-10"
										size="medium"
										type="text"
										placeholder="这里输入内容"
									></el-input>
									<el-button
										type="primary"
										class="zc-mb-10"
										icon="el-icon-search"
										style="float: right"
										>搜索</el-button
									>
								</el-form>
							</slot>
							<slot name="resultList">
								<h1>这里写表格</h1>
							</slot>
						</el-card>
					</el-col>
				</slot>
				<!-- right start -->
				<slot name="right" v-if="rightShow">
					<el-col :span=rightStyle style="display: flex;flex-direction: column;justify-content: space-between;height: 820px;">
						<el-card style="margin-bottom:20px;">
							<div class="zc-title">
								<slot name="chart1-title">
									<span>chart1-title</span>
								</slot>
							</div>
							<div class="zc-chart-container">
								<slot name="chart1">
									<Pie
										id="pie"
										height="100%"
										width="100%"
									/>
								</slot>
							</div>
						</el-card>
						<el-card>
								<div class="zc-title">
									<slot name="chart2-title">
										<span>chart2-title</span>
									</slot>
								</div>
								<div class="zc-chart-container">
									<slot name="chart2">
										<h1>随便写点东西</h1>
									</slot>
								</div>
						</el-card>
					</el-col>
				</slot>
			</slot>
		</el-row>
	</div>
</template>
<script>
import '@/styles/zc.css'
export default {
	name: 'SelectLayout',
	props: {
		titleActive: {
			type: Boolean,
			default() {
				return false
			},
		},
		rightShow: {
			type: Boolean,
			default() {
				return true
			},
		},
		leftStyle: {
			type: Number,
			default: 18
		},
		rightStyle: {
			type: Number,
			default: 6
		},
	},
	watch: {
		rightShow: {
			handler: function (val, oldval) {
				// console.log("架构初始化",val,oldval)
			},
			deep: true,
		},
	},
	created() {
		// console.log("架构初始化",this.rightShow)
		// console.log('titleActive', this.titleActive)
	},
}
</script>

<style  type="text/css" scoped>
body {
	font-size: 14px;
}
.el-divider--horizontal {
	margin: 10px 0;
}

.zc-chart-container {
	position: relative;
	width: 100%;
	height: 350px;
}
.zc-card-shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
