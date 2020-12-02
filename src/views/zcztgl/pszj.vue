<template>
  <select-layout slot="" :rightShow="true" :leftStyle="leftStyle">
    <span slot="title" >专家主体刻画</span>
    <span slot="describe">查询专家信息</span>
    <span slot="listTitle">
      <svg-icon icon-class="liebiao"/>
      专家列表
    </span>
    <span slot="chart1-title" >
      <svg-icon icon-class="tongji"/>
      专家年龄性别统计
    </span>
    <span slot="chart2-title" >
      <svg-icon icon-class="bingtu"/>
      专家数量统计
    </span>
    <Pie slot="chart1" id="pie" :option="nlxbtj" height="100%" width="100%" />
    <Bar slot="chart2" id="bar" :option="zjsltj" height="100%" width="100%" />
    <div slot="conditional" class="zc-conditional">
      <el-form :model="listQuery" ref="listQuery" :inline="true">
        <el-form-item label="专家姓名:" prop="xm">
          <el-input
            class="zc-wth-100 zc-mb-10"
            size="medium"
            type="text"
            placeholder=""
            v-model="listQuery.xm"
            @keyup.enter.native="getList()"
          ></el-input>
        </el-form-item>
      <!-- <el-select v-model="listQuery.xb" placeholder="请选择" clearable>
        <el-option
          v-for="item in xbOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
        <el-form-item label="联系电话:" prop="sjhm">
          <el-input
            style="width:130px"
            size="medium"
            type="text"
            placeholder=""
            v-model="listQuery.sjhm"
            @keyup.enter.native="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="zjhm">
          <el-input
            class="zc-wth-200 zc-mb-10"
            size="medium"
            type="text"
            placeholder=""
            v-model="listQuery.zjhm"
            @keyup.enter.native="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作单位:" prop="gzdw">
          <el-input
            class="zc-wth-200 zc-mb-10"
            size="medium"
            type="text"
            placeholder=""
            v-model="listQuery.gzdw"
            @keyup.enter.native="getList()"
          ></el-input>
        </el-form-item>
      <el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						@click="getList()"
						>搜索</el-button
					>
					<el-button
						icon="el-icon-refresh-right"
						@click="resetForm()"
						>重置</el-button
					>
				</el-form-item>
      </el-form>
    </div>
    <el-table
      :max-height="screenWidth"
      slot="resultList"
      v-loading="listLoading"
      :data="list"
      :header-cell-style="{
        color: '#333',
        fontWeight: '600',
        border: 'none',
      }"
      :cell-style="{ border: 'none' }"
      fit
      :stripe="true"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="left" min-width="60" label="专家姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.xm }}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="left" min-width="60" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.sjhm }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="30" label="性别">
        <template slot-scope="scope">
          <span v-text="sexConvert(scope.row.xb)"></span>
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="80" label="身份证号">
        <template slot-scope="scope">
          <span>{{ scope.row.zjhm }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="left" label="工作单位">
        <template slot-scope="scope">
          	<span class="zc-table-span" :title="scope.row.gzdw | e">{{ scope.row.gzdw | e}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="40" align="left" label="专家学历">
        <template slot-scope="scope">
          <span>{{ scope.row.zgxl | e }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="40" label="专家惩罚">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.tmcf =='1'" type="warning" style="cursor: pointer;" >疑似</el-tag>
          <el-tag  v-if="scope.row.tmcf =='0'" type="success" style="cursor: pointer;">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" min-width="60">
        <template slot-scope="scope">
          <router-link
            :to="'/zcztgl/pszj-detail/' + scope.row.id"
            class="link-type"
            style="color: #4e95ff"
          >
            <span>进入画像</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      slot="resultList"
      v-show="total > 0"
      :total="total"
      :page-sizes="[14, 24, 34, 44]"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList(false)"
    />
  </select-layout>
</template>
<script>
// 查询列表页layout
import SelectLayout from "./components/SelectLayout";
// 数据
import {
  fetchPszjxxList,
  fetchPszjxxNlxbtj,
  fetchPszjxxZjsltj,
} from "@/api/zcztgl";
// 分页插件
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
// echarts 支持
import Bar from './components/Bar'
import Pie from './components/Pie'
import echarts from 'echarts'

export default {
  name: "pszj",
  components: {
    Pagination,
    Bar,
    Pie,
    SelectLayout,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    e(str) {
      return str || "暂无数据";
    },
  },
  data() {
    return {
      screenWidth: document.body.clientWidth<1400?600:645,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 14,
        xm: "",
        xb: "",
        zjhm: "",
        gzdw: "",
        sjhm:"",
      },
      xbOptions: [
        {
          value: "0",
          label: "未知",
        },
        {
          value: "1",
          label: "男性",
        },
        {
          value: "2",
          label: "女性",
        },
        {
          value: "9",
          label: "未说明",
        },
      ],
      nlxbtj: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var result = params[0].axisValue 
            params.forEach(function (item) {
              let color = item.seriesIndex==0?
              'background-image: linear-gradient(180deg,#6a87ff 0%,#48deb9 100%), linear-gradient(#95bfff, #95bfff)':
              'background-image: linear-gradient(180deg, #6b71ad 0%, #e295ff 100%),linear-gradient(#6b99ad, #6b99ad);'
              result +='</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;'+color+'"></span>'+ item.seriesName + ": " + item.data
            })
            return result
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top:'16%',
          containLabel: true
        },
        legend: {
        data: ['男性专家','女性专家' ],
        left: 0,
        top:10,
        textStyle: {
            color: "#333"
        },
        itemWidth: 12,
        itemHeight: 10,
        // itemGap: 35
    },
        xAxis: [{
          type: 'category',
          data: [],
          axisLine: {
            show:false
          },
          axisTick:{
              show:false
          },
          axisLabel: {
            textStyle: {
              color:'#333'
            }
          },
        }],

        yAxis: [{
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick:{
              show:false
          },
          axisLabel: {
            textStyle: {
              color:'#333'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e6e6e6'
            }
          },
        }],
        series: [{
          name: '男性专家',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6a87ff'
                }, {
                    offset: 1,
                    color: '#48deb9'
                }]),
                barBorderRadius: [12,12,0,0],
            },
          },
          data: []
        },
        {
          name: '女性专家',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6b71ad'
                }, {
                    offset: 1,
                    color: '#e295ff'
                }]),
                barBorderRadius: [12,12,0,0],
            }
            
          },
          data: []
        },
        ]
      },
      zjsltj: {
        grid: [
          {
            //左侧的柱状图grid
            width: "100%",
            left: "3%",
            top: "10%",
            right: "0",
            bottom: "0",
          },
        ],
        xAxis: [
          {
            //左侧柱状图的X轴
            gridIndex: 0, //x 轴所在的 grid 的索引
            show: false,
          },
        ],
        yAxis: [
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              verticalAlign: "bottom",
              align: "left",
              padding: [0, 0, 15, 15],
              textStyle: {
                color: "#333333",
                fontSize: "14",
              },
            },
            data: [],
            inverse: true,
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: [],
            inverse: true,
            axisLabel: {
              show: true,
              verticalAlign: "bottom",
              align: "right",
              padding: [0, 60, 15, 0],
              textStyle: {
                color: "#333",
                fontSize: "16",
              },
              formatter: function (value) {
                return value + "个";
              },
              rich: {
                y: {
                  color: "#befbff",
                  fontSize: 14,
                },
                x: {
                  color: "#f6cf42",
                  fontSize: 14,
                },
              },
            },
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: [],
          },
        ],
        series: [
          {
            name: "检查",
            type: "bar",
            xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: [],
            barWidth: 8,
            barMinHeight: 70,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  [
                    // 'rgba(68, 180, 255, 0.2)',
                    // 'rgba(68, 180, 255, 1)',
                    "rgba(157, 163, 255, 1)",
                    // 'rgba(206, 161, 204, 1)',
                    "rgba(255, 159, 152, 1)",
                  ].map((color, offset) => ({
                    color,
                    offset,
                  }))
                ),
                barBorderRadius: 6,
              },
            },
            z: 2,
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            barGap: "-100%",
            hoverAnimation:false,
            data: [],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: "#f2f2f2",
                barBorderRadius: 6,
              },
            },
            emphasis:{
              itemStyle:{
                color:'#f2f2f2'
              }
            },
            z: 0,
          },
        ],
      },
      leftStyle: 18,
    };
  },
  created() {
    this.getList();
    this.getNlxbtj();
    this.getZjsltj();
  },
  methods: {
    resetForm() {
			this.$refs['listQuery'].resetFields()
		},
    getList(status) {
      if(status===undefined){
        this.listQuery.page=1
      }
      this.listLoading = true;
      fetchPszjxxList(this.listQuery).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.list = response.data;
          this.total = response.pageInfo.totalCount;
          this.listQuery.limit = response.pageInfo.pageSize
        }else{
          this.$message.error('没有查询到结果')
        }
        this.listLoading = false;
      });
    },
    getNlxbtj() {
      fetchPszjxxNlxbtj().then((response) => {
        if (response) {
          for (const k in response[0]) {
            if (response[0].hasOwnProperty(k)) {
              this.nlxbtj.xAxis[0].data.push(k);
              this.nlxbtj.series[0].data.push(response[0][k]);
            }
          }
          for (const k in response[1]) {
            if (response[1].hasOwnProperty(k)) {
              this.nlxbtj.series[1].data.push(response[1][k]);
            }
          }
        }
      });
    },
    getZjsltj() {
      fetchPszjxxZjsltj().then((response) => {
        if (response) {
          let j = 0;
          let count = 0;
          for (let i = response.length - 1; i >= 0; i--) {
            count = count + response[i].num;
          }
          for (let i = 0; i < response.length; i++) {
            // 名称
            this.zjsltj.yAxis[0].data.push(
              "NO." + ++j + "    " + response[i].pslb
            );
            // 个数
            this.zjsltj.yAxis[1].data.push(response[i].num);
            // 柱状图长度
            this.zjsltj.series[0].data.push(response[i].num);
            // 柱状图外框
            this.zjsltj.series[1].data.push(count);
          }
        }
      });
    },
    sexConvert(xb) {
      let sex = "未知";
      switch (xb) {
        case "0":
          sex = "未知";
          break;
        case "1":
          sex = "男";
          break;
        case "2":
          sex = "女";
          break;
        case "9":
          sex = "未说明";
          break;
      }
      return sex;
    },
  },
};
</script>

<style  type="text/css" scoped>
.pagination-container {
    margin-top: 5px;
}
</style>
