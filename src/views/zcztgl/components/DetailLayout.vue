<template>
	<div class="app-container">
		<!-- titie start-->
		<el-card v-if="titleActive" class="zc-mb-20">
			<div class="zc-title">
				<!-- 标题插槽 -->
				<slot name="title">
					<span>title</span>
				</slot>
				<el-divider></el-divider>
			</div>
			<!-- 标题描述插槽 -->
			<slot name="describe">
				<span>describe</span>
			</slot>
		</el-card>
		<!-- content start-->
		<el-row :gutter="20" style="display: flex; align-items: stretch">
			<!-- 总体内容插槽 -->
			<slot>
				<!-- 左侧内容插槽 -->
				<slot name="left">
					<!-- left start -->
					<el-col :span=leftStyle>
						<el-card style="height: 100%">
							<el-row class="zc-title">
								<el-col :span="22" :offset=defaultOffset>
									<slot name="detail-title">
											<span>detail-title</span>
									</slot>
								</el-col>
							</el-row>
							<slot name="row1">
								<h1>row1 以下是示例内容</h1>
								<el-row
									slot="row1"
									:gutter="20"
									class="zc-mt-20"
								>
									<el-col :span="2">
										<div class="grid-content ">
											图标填充位
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content ">
											<span class="zc-field"
												>公司名称：郑州某有限公司</span
											>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content ">
											<span>情报动态</span>
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content ">
											更多
										</div>
									</el-col>
								</el-row>
							</slot>
							<el-row :gutter="20" class="zc-mt-20">
								<el-col :span="22" :offset=defaultOffset>
									<!-- <slot name="tags">
										<h1>tags 放点标签</h1>
									</slot> -->
								</el-col>
							</el-row>
							<slot name="rowes">
								<h1>rowes 以下是示例样式</h1>
								<el-row :gutter="20" class="zc-mt-20">
									<el-col :span="10" :offset=defaultOffset>
										<div class="grid-content ">
											<span class="zc-field"
												>统一社会信用代码：</span
											>
											<span>23123333557859</span>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content ">
											<span class="zc-field"
												>合作次数：</span
											>
											<span>2</span>
										</div>
									</el-col>
								</el-row>
							</slot>
						</el-card>
					</el-col>
				</slot>

				<!-- 右侧内容插槽 -->
				<slot name="right" v-if="rightShow">
					<!-- right start -->
					<el-col :span=rightStyle style="display: flex;flex-direction: column;justify-content: space-between;">
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
import Pie from './Pie'
import '@/styles/zc.css'

export default {
	name: 'DetailLayout',
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
			default: 18,
		},
		rightStyle: {
			type: Number,
			default: 6,
		},
		defaultOffset:{
			type: Number,
			default: 1
		}
	},
	components: {
		Pie,
	},
}
</script>

<style type="text/css" scoped>
</style>

</style>