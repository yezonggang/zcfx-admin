<template>
	<detail-layout slot="" :rightShow="true" :rightStyle=7>
		<span slot="title" class="zc-title">供应商画像</span>
		<span slot="describe">查看供应商查询画像</span>
		<span slot="chart1-title" class="zc-title"><svg-icon icon-class="leida" />&nbsp;&nbsp;供应商雷达图</span>
		<span slot="chart2-title" class="zc-title"><svg-icon icon-class="guanxi" />&nbsp;&nbsp;企业综合能力评估</span>
		<Radar slot="chart1" :id="radar" 
			:option="option"
			:height="chartWidth"  :width="chartWidth" />
		<div slot="chart2">
			<div class="ztpm">
			<div class="ztpfxj">
				<el-col :span="8">
					<div>总体评分</div>
				</el-col>
				<el-col :span="8">
					<div>总体排名</div>
				</el-col>
				<el-col :span="6">
					<span>超越了</span>
					
				</el-col>
			</div>
			</div>
			<div class="ztpm">
				
			<div class="ztpfxj">
				<el-col :span="8">
					<span class="vlaue-1">{{ztpm}}</span>
					<span>名</span>
				</el-col>
				<el-col :span="8">
				<span class="vlaue-1">{{ztdf}}</span>
					<span>分</span>
				</el-col>
				<el-col :span="8">
					<span class="vlaue-2">{{ztcy}}%</span>
				</el-col>
				
			</div>  
			</div>
			
			<el-divider></el-divider>

			<span class="lszbxm"><svg-icon icon-class="xiangmu" />&nbsp;&nbsp;历史中标项目</span>

		 <el-carousel
        :direction="carousel.direction"
        indicator-position="none"
        :interval="carousel.interval"
        height="400px"
      >
        <el-carousel-item v-for="(item,i) in tableData" :key="i">
          <el-row>
            <el-table :data="item" 
            :header-cell-style="{fontWeight:'normal',border:'none'}"
            :cell-style="{border:'none'}"
            fit
            :stripe="true">
              <el-table-column prop="name" align="left" label="项目名称" min-width="65">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" label="开标时间" min-width="35">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-carousel-item>
      </el-carousel>

		</div>
		<template v-slot:left>
			<el-col :span="11">
				<el-card>
					<div class="zc-title">
						<el-col :span="22" :offset="1">
							<div name="detail-title">
							<svg-icon icon-class="qiye" />&nbsp;&nbsp;
							<span>供应商基本信息</span>
						</div>
						</el-col>
					</div>
					<el-row :gutter="20" class="zc-mt-20 zc-row1">
						<el-col :span="20" :offset="1">
							<div>
							<span style="font-size: 24px" v-if="resultData">{{resultData.ztmc}}</span>
							<span style="font-size: 24px" v-else>********</span>
							</div>
						</el-col>
					</el-row>
					
					<div>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>统一社会信用代码：</span>
							</el-col>
							<el-col :span="18">
								<span>{{ resultData.ztdm | isNull }}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>注册地址：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.jgdz | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>企业类型：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.ztlb
										| isNull
										| conventDmmc(dmmcList)
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>注册资本：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.zczj
										| currency('￥', 2, '元')
										| isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>合作次数：</span>
							</el-col>
							<el-col :span="18">
								<span> {{ resultData.zbcs | isNull }} </span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>营业期限：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData"
									>{{ resultData.clrq }}至无固定期限</span
								>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>中标率：</span>
							</el-col>
							<el-col :span="18">
								<span> {{ resultData.zbl | isNull }} </span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span> 人员规模[演示]：</span>
							</el-col>
							<el-col :span="18">
								<span>200人以上</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>法人名称：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.frmc | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>法人机构类别：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.frjglb
										| isNull
										| conventDmmc(frjglbList)
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>联系人：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.lxr | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>联系人方式：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.lxrdh | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>联系人地址：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.lxrdz | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>企业邮政编码：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.yzbm | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>经营范围：</span>
							</el-col>
							<el-col :span="18">
								<span v-if="resultData">{{
									resultData.jyfw | isNull
								}}</span>
							</el-col>
						</el-row>
						<el-row :gutter="24" class="zc-mt-20">
							<el-col :span="6" class="zc-field">
								<span>简介：</span>
							</el-col>
							<el-col :span="18">
								<span
									v-if="resultData && resultData.jj != null"
								>
									{{ resultData.jj | isNull }}
								</span>
								<span v-else> 暂无 </span>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<div class="qyqk">
					<div class="qyqk-card qyqk-card-bg-1">
						<div class="qyqk-card-title-1"> 历史投标次数 </div>
						<div class="qyqk-card-context">
							<span>{{ history.tbcs.value | isNull('0') }}</span>
							<div>
							<span>第{{ history.tbcs.rank | isNull('0') }}名</span>
							<span>超越{{ history.tbcs.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
						
					</div>
					<div class="qyqk-card qyqk-card-bg-1">
						<div class="qyqk-card-title-1"> 历史中标次数 </div>
						<div class="qyqk-card-context">
							<span>{{ history.zbcs.value | isNull('0') }}</span>
							<div>
							<span>第{{ history.zbcs.rank | isNull('0') }}名</span>
							<span>超越{{ history.zbcs.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
					</div>
					<div class="qyqk-card qyqk-card-bg-1">
						<div class="qyqk-card-title-1"> 历史中标金额(万元) </div>
						<div class="qyqk-card-context">
							<span>{{ history.zbje.value | isNull('0') }}</span>
							<div>
							<span>第{{ history.zbje.rank | isNull('0') }}名</span>
							<span>超越{{ history.zbje.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
					</div>
					<div class="qyqk-card qyqk-card-bg-2">
						<div class="qyqk-card-title-2"> 近一年投标次数 </div>
						<div class="qyqk-card-context">
							<span>{{ oneYear.tbcs.value | isNull('0') }}</span>
							<div>
							<span>第{{ oneYear.tbcs.rank | isNull('0') }}名</span>
							<span>超越{{ oneYear.tbcs.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
					</div>
					<div class="qyqk-card qyqk-card-bg-2">
						<div class="qyqk-card-title-2"> 近一年中标次数 </div>
						<div class="qyqk-card-context">
							<span>{{ oneYear.zbcs.value | isNull('0') }}</span>
							<div>
							<span>第{{ oneYear.zbcs.rank | isNull('0') }}名</span>
							<span>超越{{ oneYear.zbcs.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
					</div>
					<div class="qyqk-card qyqk-card-bg-2">
						<div class="qyqk-card-title-2"> 近一年中标金额(万元) </div>
						<div class="qyqk-card-context">
							<span>{{ oneYear.zbje.value | isNull('0') }}</span>
							<div>
							<span>第{{ oneYear.zbje.rank | isNull('0') }}名</span>
							<span>超越{{ oneYear.zbje.percentage | isNull('0') }}%的企业 </span>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</template>
	</detail-layout>
</template>

<script>
import DetailLayout from './components/DetailLayout'
import Radar from './components/Radar'
import { currency, isNull , dateFormat} from '@/utils/zcfx-filters'
import echarts from 'echarts'
import {
	gysjbxx,
	gystbzbqk,
	gystbzbqkpm,
	gysyntbzbqk,
	gysyntbzbqkpm,
	getdmmc,
	gysldt,
	gysdfpm,
	gyslszbxm
} from '@/api/zcztgl'

let data = [0, 0, 0, 0, 0,0];
let maxdata = [100, 100, 100, 100, 100,100];
let indicatorname = ['投标规范度', '信用值', '能力值', '经营值', '投标成功率','活跃指数'];
function getData(data) {
    var res = {
        series: [{
			type: 'radar',
			// 设置成相对的百分比
			center: ['40%', '50%'],
            symbolSize: 10,
            symbol: "circle",
            areaStyle: {
                color: "#39B2FF",
                opacity: 0.3
            },
            lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00A2FF'
                }, {
                    offset: 1,
                    color: '#0060FF'
                }], false),
                width: 3
            },
            itemStyle: {
                color: "#fff ",
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00DEFF'
                }, {
                    offset: 1,
                    color: '#1598FF'
                }], false),
                borderWidth: 4,
                opacity: 1
            },
            label: {
                show: false,
            },
            data: [{
                value: data,
            }],
            z: 100
        }, ],
    };
    for (let i = 0; i < data.length; i++) {
        res.series.push({
			type: 'radar',
            data: [{
                value: innerdata(i),
            }],
            symbol: 'none',
            lineStyle: {
                width: 0
            },
            itemStyle: {
                color: '#fff'
            },
            areaStyle: {
                color: '#fff',
                shadowColor: 'rgba(14,122,191,0.15)',
                shadowBlur: 30,
                shadowOffsetY: 20
            }
        });
    }
    return res;
}
const optionData = getData(data)

function contains(arrays, obj) {
    var i = arrays.length;
    while (i--) {
        if (arrays[i] === obj) {
            return i;
        }
    }
    return false;
}

function innerdata(i) {
    var innerdata = [];
    for (let j = 0; j < data.length; j++) {
        innerdata.push(100 - 20 * i)
    }
    return innerdata
}

const option =  {
    backgroundColor: '#fff',
    tooltip: {
        formatter: function(params) {
			var html = '';
            for (var i = 0; i < params.data.value.length; i++) {
                html += indicatorname[i] + ' : ' + params.data.value[i] +'<br>'
            }
            return html
        }
	}, 
    radar: {
		radius:'60%',
        indicator: [
        {name: '投标规范度', max: 100},
        {name: '信用值', max: 100},
        {name: '能力值', max: 100},
        {name: '经营值', max: 100},
        {name: '投标成功率', max: 100},
        {name: '活跃指数', max: 100},
      ],
        splitArea: {
            show: true,
            areaStyle: {
                color: '#fff',
                shadowColor: 'rgba(14,122,191,0.19)',
                shadowBlur: 30,
                shadowOffsetY: 20
            }
        },
        splitLine: {
            show: false,

        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false
        },
        name: {
            textStyle: {
                rich: {
                    a: {
                        fontSize: '16',
                        color: '#333',
                        align: 'center',
                        lineHeight: '30',
                        fontWeight: 'bold',
                    },
                    b: {
                        fontSize: '14',
                        color: '#666',
                        align: 'center',
                    }
                },
            },

            formatter: function(params, index) {
				var i = contains(indicatorname, params);
                var percent = data[i] / 100 * 100;
                return '{a|' + percent + '}\n' + '{b|' + params + '}'
            },
        },
    },
    series: optionData.series
};

export default {
	name: 'gys-detail',
	components: { DetailLayout, Radar },
	data() {
		return {
			ztdf:'',
			ztpm:'',
			ztcy:'',
			radar:'radar',
			chartWidth: '100%',
			option:option,
			listLoading: null,
			gysxx: null,
			queryParams: {
				id: null,
			},
				queryParams1: {
				id: null,
				year:''
			},
			gysbh:null,
			resultData: {},
			year: null,
			tableData: [],
			carousel: {
            carousel: 5000,
            direction: "vertical",
            },
			history: {
				tbcs: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
				zbcs: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
				zbje: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
			},
			oneYear: {
				tbcs: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
				zbcs: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
				zbje: {
					value: 0,
					rank: 0,
					percentage: 0,
				},
			},
			dmmcList: new Map(),
			frjglbList: new Map(),
		}
	},

	created() {
		this.queryParams.id = this.$route.params.id
		this.gysjbxx()
		this.gystbzbqk()
		this.gysyntbzbqk(),
		this.gysldt(),
		this.gysdfpm(),
		this.gyslszbxm(),
		//读取代码名称list,获取企业类型list
		this.dmmcList = this.getdmmcList('2099C0C9830D4E91AE57AE5181EC1B78')
		//读取代码名称list,获取法人机构类别list
		this.frjglbList = this.getdmmcList('7B0DD34A292C49CF9E63532EF1B00E89')
		//读取供应商历史投标信息:投标次数
		this.gystbzbqkpm({ id: this.$route.params.id, col: 'tbcs' })
		//读取供应商历史投标信息:中标次数
		this.gystbzbqkpm({ id: this.$route.params.id, col: 'zbcs' })
		//读取供应商历史投标信息:中标金额
		this.gystbzbqkpm({ id: this.$route.params.id, col: 'zbje' })
		//读取供应商近一年投标信息:投标次数
		this.gysyntbzbqkpm({ id: this.$route.params.id, col: 'tbcs' })
		//读取供应商近一年投标信息:中标次数
		this.gysyntbzbqkpm({ id: this.$route.params.id, col: 'zbcs' })
		//读取供应商近一年投标信息:中标金额
		this.gysyntbzbqkpm({ id: this.$route.params.id, col: 'zbje' })
	},
	methods: {
		gysjbxx() {
			this.listLoading = true
			gysjbxx(this.queryParams).then((response) => {
				this.resultData = response
				this.listLoading = false
			})
		},
		gystbzbqk() {
			gystbzbqk(this.queryParams).then((response) => {
				if (response) {
					this.history.tbcs.value = response.tbcs
					this.history.zbcs.value = response.zbcs
					let num = response.zbje / 10000
					this.history.zbje.value = num.toFixed(2)
				}
			})
		},
		gysyntbzbqk() {
			gysyntbzbqk(this.queryParams).then((response) => {
				if (response) {
					this.oneYear.tbcs.value = response.tbcs
					this.oneYear.zbcs.value = response.zbcs
					let num = response.zbje / 10000
					this.oneYear.zbje.value = num.toFixed(2)
				}
			})
		},
		/**
		 * 读取供应商历史投标信息
		 * @param {Object} 用户id和具体信息组合的对象
		 */
		gystbzbqkpm(data) {
			gystbzbqkpm(data).then((response) => {
				if (response) {
					let rank = response.rank
					let percentage =
						Math.floor(response.percentage * 10000) / 100
					this.history[data.col].rank = rank
					this.history[data.col].percentage = percentage
				}
			})
		},
		/**
		 * 读取供应商近一年投标信息
		 * @param {Object} 用户id和具体信息组合的对象
		 */
		gysyntbzbqkpm(data) {
			gysyntbzbqkpm(data).then((response) => {
				if (response) {
					let rank = response.rank
					let percentage =
						Math.floor(response.percentage * 10000) / 100
					this.oneYear[data.col].rank = rank
					this.oneYear[data.col].percentage = percentage
				}
			})
		},
		/**
		 * 根据代码类别id获取对应集合
		 * @param {String} 代码类别id
		 * @returns {Map} 对应集合
		 */
		getdmmcList(dmlbid) {
			let map = new Map()
			getdmmc({ dmlbid: dmlbid }).then((response) => {
				if (response) {
					for (const dm of response) {
						map.set(dm.dmbs, dm.dmmc)
					}
				}
			})
			return map
		},
		//根据供应商编号查询对应雷达图
			gysldt() {
			this.listLoading = true
			gysldt(this.queryParams).then((response) => {
				
				if (response) {
				let arr = [response.bltbxw,response.xyz,response.nlz,response.jyz,response.tbcgl,response.tbhyzs]
				console.log(arr)
				data=arr
				option.series=getData(arr).series
				this.ztdf=response.zdf			
        		}else{
					option.series=getData([0,0,0,0,0,0]).series
				}
			})
		},

			//根据供应商编号查询总体评分和排名
			gysdfpm() {
			gysdfpm(this.queryParams).then((response) => {
				if (response) {
					let rank = response.rank
					let percentage =
						Math.floor(response.percentage * 10000) / 100
					this.ztpm = rank
					this.ztcy = percentage
				}
			})
		},
		  gyslszbxm() {
     	 gyslszbxm(this.queryParams).then((response) => {
        this.tableData=[]
        if(response){
			console.log(response)
          let size = 5
          for(var i=0;i<response.length;i=i+size){
            this.tableData.push(response.slice(i,i+size));
          }
        }
      })
    },

	},

	
	filters: {
		currency: currency,
		isNull: isNull,
		conventDmmc(value, list) {
			return list.get(value)
		},
		dateFormat: dateFormat

	},
}
</script>

<style  type="text/css" scoped>
.lszbxm {
font-size: 20px
}
.qyqk-card {
	width: 100%;
	height: 125px;
	padding: 10px 0;
	color: rgb(255, 255, 255);
	background-blend-mode: normal, 
		normal;
	box-shadow: 3px 3px 16px 0px 
		rgba(85, 118, 224, 0.36);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;

}
.qyqk-card:not(:last-child) {
	margin-bottom: 20px;
}
/* 标题 */
.qyqk-card-title-1 {
	font-size: 22px;
	color: #ffffff;
	border-bottom: 1px solid #ffffff;
	padding: 10px;
}
.qyqk-card-title-2 {
	font-size: 22px;
	color: #ffffff;
	border-bottom: 1px solid #ffffff;
	padding: 10px;
}
.qyqk-card-title-1:before {
	content:"";
	position:relative;
	top: 26px;
	left: -20px;
	border-bottom: 10px solid transparent;
	border-top: 10px solid transparent;
	border-right: 10px solid #ca77f6;
	font-size: 0;
	width: 0;
	height: 0;
}
.qyqk-card-title-2:before {
	content:"";
	position:relative;
	top: 26px;
	left: -20px;
	border-bottom: 10px solid transparent;
	border-top: 10px solid transparent;
	border-right: 10px solid #48deb9;
	font-size: 0;
	width: 0;
	height: 0;
}
/* 内容 */
.qyqk-card-context {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
}

.qyqk-card-context>span:first-child {
	/* padding-left: 10px; */
	font-size: 40px;
}

.qyqk-card-context>div:nth-child(2){
	padding: 10px;
	font-size: 14px;
	display: flex;
	flex-direction: column;
    align-items: flex-end;
}

.qyqk-card-bg-1 {
	background: linear-gradient(to left, #d5ab64, #e1b365, #e9bf78);
		background-image: linear-gradient(270deg, 
		#6a87ff 0%, 
		#ca77f6 100%), 
	linear-gradient(
		#95bfff, 
		#95bfff);
}

.qyqk-card-bg-2 {
	background-image: linear-gradient(270deg, 
		#6a87ff 0%, 
		#48deb9 100%), 
	linear-gradient(270deg, 
		#e63839 0%, 
		#ff7e7f 100%), 
	linear-gradient(
		#95bfff, 
		#95bfff);
}



.ztpfxj {
	display: flex;
	align-items: flex-end;
	text-align: center;
	margin: 10px auto;
	height: 50px;
}

.ztpfxj .vlaue-1 {
	font-size: 32px;
	color: rgb(2, 167, 240);
}
.ztpfxj .vlaue-2 {
	color: rgb(2, 167, 240);
	font-size: 34px;
}
.qyqk {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items:flex-end;
}




</style>