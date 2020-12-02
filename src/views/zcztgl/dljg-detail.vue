<template>
  <detail-layout :leftStyle="12" :rightStyle="12" :defaultOffset="defaultOffset">
    <span slot="title" class="zc-title">代理机构画像</span>
    <span slot="describe">查看招标方详细信息</span>
    <span slot="detail-title" class="zc-title"><svg-icon icon-class="qiye" />&nbsp;&nbsp;代理机构基本信息</span
    >
    <span slot="chart1-title" class="zc-title">
      <svg-icon icon-class="yingbi" />
      代理各板块金额
    </span>
    <div slot="chart2-title" class="zc-title zc-title-date">
      <div>
        <svg-icon icon-class="guanxi" />
        <span>涉及业主</span>
      </div>
      <el-date-picker
        style="zc-detail-year"
        size="mini"
        v-model="year"
        value-format="yyyy"
        type="year"
        placeholder="选择年份"
      ></el-date-picker>
    </div>
    <Radar
      slot="chart1"
      :option="option"
      id="radar"
      height="100%"
      width="100%"
    />
    <div slot="chart2" style="text-align: center">
      <el-carousel
        :direction="carousel.direction"
        indicator-position="none"
        :interval="carousel.interval"
        height="400px"
      >
        <el-carousel-item v-for="(item, i) in tableData" :key="i">
          <el-row>
            <el-table :data="item" 
            :header-cell-style="{fontWeight:'normal',border:'none'}"
            :cell-style="{border:'none'}"
            fit
            :stripe="true"
            >
              <el-table-column
                prop="name"
                align="center"
                label="业主名称"
                min-width="50"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.yzdwmc }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                align="center"
                label="金额"
                min-width="50"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.je }}万元</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row slot="row1" :gutter="20" class="zc-mt-20 zc-row1">
      <el-col :span="20" :offset="defaultOffset">
        <div>
          <span style="font-size: 24px">{{ dljg.dljgmc }}</span>
        </div>
      </el-col>
    </el-row>
    <div slot="rowes">
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>统一社会信用代码</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.ztdm}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>注册资本</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.zczj}}万元</span>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>营业期限</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>[暂无数据]</span>
        </el-col>
      </el-row>

      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>人员规模</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>[暂无数据]</span>
        </el-col>
      </el-row> -->
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>成立日期</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.clrq|dateFormat("YYYYMMDD","YYYY-MM-DD")}}</span>
        </el-col>
      </el-row>


      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>机构地址</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.jgdz}}</span>
        </el-col>
      </el-row>
            <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>法人名称</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.frmc}}</span>
        </el-col>
      </el-row>
            <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>联系人</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.lxr}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>联系人电话</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.lxrdh}}</span>
        </el-col>
      </el-row>
                  <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>单位网站</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.dwwz}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>邮政编码</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.yzbm}}</span>
        </el-col>
      </el-row>

            <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>经营范围</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{dljgxx.jyfw}}</span>
        </el-col>
      </el-row>

            <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>项目代理数量</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ dljg.num+"个" }}</span>
        </el-col>
      </el-row>

            <el-row :gutter="20" class="zc-mt-20">
        <el-col :span="6" :offset="0">
          <div class="zc-field">
            <span>代理项目金额</span>
          </div>
        </el-col>
        <el-col :span="12" :offset="1">
          <span>{{ dljg.dlje+"万元" }}</span>
        </el-col>
      </el-row>

    </div>
  </detail-layout>
</template>

<script>
// api数据
import { fetchDljgDetail, fetchDljgDlgbkje, fetchDljgSjyz, finddljgxx } from "@/api/zcztgl";
import DetailLayout from "./components/DetailLayout";
import Radar from "./components/Radar";
import echarts from 'echarts'
import { dateFormat } from '@/utils/zcfx-filters';

export default {
  name: "dljg-detail",
  components: { DetailLayout, Radar },
  props: ["id"],
  filters: {
    dateFormat : dateFormat
  },
  data() {
    return {
      dljg:{},
      dljgxx:{
        ztdm:'',
        zczj:'',
        clrq:'',
        jgdz:'',
        frmc:'',
        lxr:'',
        lxdh:'',
        dwwz:'',
        yzbm:'',
        jyfw:'',
      },
      defaultOffset:1,
      year: undefined,
      tableData: [],
      carousel: {
        carousel: 5000,
        direction: "vertical",
      },
      option: {
        color: ["#74D390", "#63B5FD", "#67D4D4"],
        legend: [
          {
            orient: "vertical",
            right: "20%",
            bottom: "center",
            data: [],
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}万元 ({d}%)",
        },
        series: [
          {
            name: "金额",
            type: "pie",
            minAngle: 15, //最小角度
            startAngle: 180, //起始角度
            radius: ["45%", "75%"],
            center: ["35%", "50%"],
            label: {
              formatter: "{c}万元"
            },
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 10,
                color: function (params) {
                  var colorList = [
                    {
                      c1: "#6a87ff", //管理
                      c2: "#48deb9",
                    },
                    {
                      c1: "#6a87ff", //实践
                      c2: "#ca77f6",
                    },
                    {
                      c1: "#ffad25", //操作
                      c2: "#ffc057",
                    },
                    {
                      c1: "#4463ff",
                      c2: "#5ab3fe"
                    },
                    {
                      c1: "#6b71ad",
                      c2: "#e295ff"
                    },
                    {
                      c1: "#e63839",
                      c2: "#ff7e7f"
                    },
                    {
                      c1: "rgba(146,46,246,0.71)",
                      c2: "rgba(237,79,245,0.71)"
                    },
                  ];
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                      offset: 0,
                      color: colorList[params.dataIndex].c1,
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].c2,
                    },
                  ]);
                  /*  return colorList[params.dataIndex]*/
                },
              
              },
            },
            data: [],
            emphasis: {
              itemStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.getDetail()
    this.getPie();
    this.getTableData();
    this.getDLJGXX();
  },
  methods: {
    getDetail(){
      fetchDljgDetail({id:this.id}).then((response)=>{
        if(response){
          this.dljg=response
        }
      })
    },
    getPie() {
      fetchDljgDlgbkje({ id: this.id }).then((response) => {
        response.forEach((obj) => {
          this.option.legend[0].data.push(obj.name);
        });
        this.option.series[0].data = response;
      });
    },
    getTableData() {
      this.tableData = [];
      fetchDljgSjyz({ id: this.id, year: this.year }).then((response) => {
        let size = 8;
        for (var i = 0; i < response.length; i = i + size) {
          this.tableData.push(response.slice(i, i + size));
        }
      });
    },
    getDLJGXX(){
      finddljgxx({id:this.id}).then((response)=>{
        if(response){
          this.dljgxx=response
        }
      })
    }

  },
  watch: {
    year: {
      handler: function (val, oldval) {
        this.getTableData();
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
  align-items: center;
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

</style>