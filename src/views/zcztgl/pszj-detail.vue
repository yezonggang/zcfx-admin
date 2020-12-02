<template>
  <detail-layout :leftStyle="12" :rightStyle="12" :defaultOffset="defaultOffset">
    <span slot="title" class="zc-title">专家画像</span>
    <span slot="describe">查看专家信息</span>
    <span slot="detail-title" class="zc-title"><svg-icon icon-class="qiye" />&nbsp;&nbsp;专家基本信息</span>
    <span slot="chart1-title" class="zc-title"><svg-icon icon-class="leida" />&nbsp;&nbsp;年度统计项目数</span>
    <Radar slot="chart1" :option="option" id="radar" height="100%" width="100%" />
    <div slot="chart2-title" class="zc-title zc-title-date">
      <span><svg-icon icon-class="guanxi" />&nbsp;&nbsp;专家评审项目</span>
      <el-date-picker
        style="zc-detail-year"
        size="mini"
        v-model="year"
        value-format="yyyy"
        type="year"
        placeholder="选择年份"
      ></el-date-picker>
    </div>
    <div slot="chart2" style="text-align: center">

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
              <el-table-column prop="name" align="left" label="项目名称" min-width="75">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" label="开标时间" min-width="25">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row slot="row1" :gutter="20" class="zc-mt-20 zc-row1">
      <el-col :span="20" :offset="defaultOffset">
        <div class="grid-content">
          <span style="font-size: 24px">{{ pszj.xm }}</span>
        </div>
      </el-col>
    </el-row>
    <div slot="rowes">
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家联系电话</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.sjhm }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家籍贯</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.jiguan }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家性别</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.xb }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家年龄</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.nl }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家评审类别</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.pslb }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家评标专业</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.pbzy1 }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">评审次数</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.cqcs==null?0:pszj.cqcs }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家组组长次数</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.zrcs==null?0:pszj.zrcs }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">毕业院校</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.byyx }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家工作单位</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.gzdw }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家评分偏离度</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ Percent(pszj.pld)}}%</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家身份证号</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ pszj.zjhm }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="grid-content ">
            <span class="zc-field">专家不良行为历史记录</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-tag type="warning" style="cursor: pointer;" @click="dialogTableVisible = true">同名专家处罚通报</el-tag>
        </el-col>
      </el-row>
      <el-dialog title="处罚信息" :visible.sync="dialogTableVisible">
        <el-table :data="cfxwData">
          <el-table-column property="newsTitle" min-width="200" label="标题" ></el-table-column>
          <el-table-column property="newsIssueDate" min-width="60" label="日期" ></el-table-column>
          <el-table-column property="newsUrl" min-width="60" label="地址">
            <template slot-scope="scope">
              <el-link type="primary"  :href="scope.row.newsUrl" target="_blank">查看</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </detail-layout>
</template>

<script>
// 数据
import { fetchPszjxxById,fetchPszjxxCyxms,fetchPszjxxZjpsxm,fetchPszjxxCfxw } from "@/api/zcztgl";
import DetailLayout from "./components/DetailLayout";
import Radar from "./components/Radar";
import echarts from 'echarts';
import { date } from 'jszip/lib/defaults';
import { dateFormat } from '@/utils/zcfx-filters';
export default {
  name: "pszj-detail",
  props: ["id"],
  data() {
    return {
      dialogTableVisible: false,//弹框
      defaultOffset:1,
      pszj: {},
      year: null,
      tableData: [],
      cfxwData:[],
      carousel: {
        carousel: 5000,
        direction: "vertical",
      },
      option: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "5%",
          bottom: "15%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show:false
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
              lineStyle: {
                width: 1,
              },
            },
            axisLabel: {
              width: 100,
            },
            data: [],
          },
        ],

        yAxis: [
          {
            type: "value",
            scale: false,
            minInterval: 1,
            splitNumber: 5,
            max: function (value) {
              return value.max==0?5:value.max;
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e6e6e6",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 20,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "专家参与项目数",
            type: "line",
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
            smooth: true,//平滑展示
            lineStyle: {
              normal: {
                color: "#6f5dfa",
              },
              borderColor: '#f0f'
            },
            itemStyle: {
              color: "#6f5dfa",
            },
            areaStyle: { //区域填充样式
              normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: '#b2a8ff'
                      },
                      {
                          offset: 1,
                          color: 'rgba(157,145,252,0)'
                      }
                  ], false),
              }
            },
            data: [],
          },
        ],
      },
    };
  },
  components: { DetailLayout, Radar },
  filters:{
    e(str) {
      return str || "暂无数据";
    },
    dateFormat: dateFormat
  },
  created() {
    this.getInfo()
    this.getCyxmstj()
    this.getPsxmList()
  },
  computed:{
    Percent(){
	    return function(index) {
		    let pi= parseFloat((this.pszj.pld * 100).toPrecision(12));
			    return pi;
	      }
      }
  },
  methods: {
    getInfo() {
      fetchPszjxxById({ id: this.id }).then((response) => {
        this.pszj = response;
        this.getCfxwList()
      });
    },
    getCyxmstj() {
      fetchPszjxxCyxms({ id: this.id }).then((response) => {
        if(response){
          let obj ={}
          response.forEach(o => {
             obj[o.year]=o.num
          });
          let date = new Date()
          for(let i=0; i<=(Number(date.getFullYear())-2016);i++){
              this.option.xAxis[0].data.push(2016 + i)//x轴
            this.option.series[0].data.push(obj[2016+i]==undefined ?0:obj[2016+i]);
          }
        }
      })
    },
    getPsxmList() {
      fetchPszjxxZjpsxm({ id: this.id,year: this.year }).then((response) => {
        this.tableData=[]
        if(response){
          let size = 8
          for(var i=0;i<response.length;i=i+size){
            this.tableData.push(response.slice(i,i+size));
          }
        }
      })
    },
    getCfxwList() {
      fetchPszjxxCfxw({ name: this.pszj.xm }).then((response)=>{
        if(response){
          this.cfxwData=response
        }
      })
    }
  },
  watch: {
		year: {
			handler: function (val, oldval) {
				this.getPsxmList()
			},
		},
	},
};
</script>

<style  type="text/css" scoped>
/* 两端对齐 */
.zc-title-date {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
/* 日期选择框的宽度 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 140px;
}
/* 伪装表头 */
.table-header {
  display: inline-block;
  line-height: 40px;
}
/* 设置数据标题的样式 */
.zc-field{
  font-weight: normal;
}
</style>