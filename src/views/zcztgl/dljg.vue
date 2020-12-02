<template>
  <select-layout slot :rightShow="true" :leftStyle="leftStyle">
    <span slot="title">代理机构主体刻画</span>
    <span slot="describe">查看代理机构信息</span>
    <span slot="listTitle">
      <svg-icon icon-class="liebiao" />&nbsp;&nbsp;代理机构列表</span
    >
    <span slot="chart1-title"
      ><svg-icon icon-class="yun" />&nbsp;&nbsp;代理机构词云统计(金额排序)</span
    >
    <span slot="chart2-title"
      ><svg-icon icon-class="gengduo" />&nbsp;&nbsp;代理机构代理版块统计</span
    >
    <Wordcloud
      slot="chart1"
      id="wordcloud"
      :option="wordcloud"
      height="100%"
      width="100%"
    />
    <Pie slot="chart2" id="pie" :option="pie" height="100%" width="100%" />
    <div slot="conditional" class="zc-conditional">
      <el-form :model="listQuery" ref="listQuery" :inline="true">
        <el-form-item label="代理机构名称:" prop="dljgmc" style="margin-bottom: 0;">
          <el-input
            class="zc-wth-200 zc-mb-10"
            size="medium"
            type="text"
            placeholder=""
            v-model="listQuery.dljgmc"
            @keyup.enter.native="getList()"
          ></el-input>
        </el-form-item>
        <el-form-item label="代理金额(万元):" prop="num">
          <el-col :span="11">
            <el-form-item prop="num1">
            <el-input
              type="text"
              placeholder=""
              v-model="listQuery.num1"
              @change="checkInput1"
              @keyup.enter.native="getList()"
            ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">一</el-col>
          <el-col :span="11">
            <el-form-item prop="num2">
            <el-input
              type="text"
              placeholder=""
              v-model="listQuery.num2"
              @change="checkInput2"
              @keyup.enter.native="getList()"
            ></el-input>
            </el-form-item>
          </el-col>
            
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="zc-mb-10"
            icon="el-icon-search"
            @click="getList()"
            >查询</el-button
          >
          <el-button
            class="zc-mb-10"
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
      :header-cell-style="{ color: '#333', fontWeight: 600, border: 'none' }"
      :cell-style="{ border: 'none' }"
      fit
      :stripe="true"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="left" min-width="160" label="代理机构名称">
        <template slot-scope="scope">
          <span>{{ scope.row.dljgmc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="60" label="代理项目数量">
        <template slot-scope="scope">
          <span>{{ scope.row.num + "个" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" min-width="60" label="代理项目金额">
        <template slot-scope="scope">
          <span>{{ scope.row.dlje + "万元" }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60" align="left" label="添加日期">
        <template slot-scope>
          <span>暂无数据</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="120">
        <template slot-scope="scope">
          <router-link
            :to="'/zcztgl/dljg-detail/' + scope.row.dljgbh"
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
// api数据
import {
  fetchDljgList,
  fetchDljgGdljgcy,
  fetchDljgGdljgdlbk,
} from "@/api/zcztgl";
// 分页插件
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
// echarts 支持
import Wordcloud from "./components/Wordcloud";
import Pie from "./components/Pie";
import { Random } from "mockjs";
import { isNotEmpty } from "@/utils/index";
export default {
  name: "dljg",
  components: {
    Pagination,
    Wordcloud,
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
  },
  data() {
    var magiskImage = new Image();
    magiskImage.src =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjAyNzI3MzkxNTA3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDE0NjggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjg2LjcxODc1IiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTIxMi41MTc2ODQgNDQxLjM5Nzc1M1Y0MzguODM3ODY1QTQzOC44Mzc4NjUgNDM4LjgzNzg2NSAwIDAgMCAzNjAuMDc1MTMxIDI5Mi41NTg1NzcgMzY1LjY5ODIyMSAzNjUuNjk4MjIxIDAgMCAwIDM3MS40MTE3NzUgMTAyMy45NTUwMTloODA0LjUzNjA4N2EyOTIuNTU4NTc3IDI5Mi41NTg1NzcgMCAwIDAgMzYuNTY5ODIyLTU4Mi41NTcyNjZ6IiBwLWlkPSIyNTMxIj48L3BhdGg+PC9zdmc+";
    return {
      screenWidth: document.body.clientWidth<1400?600:645,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        dljgmc: "",
        num1: "",
        num2: "",
        page: 1,
        limit: 14,
      },
      wordcloud: {
        tooltip: {
          show: true,
          formatter: null,
        },
        series: [
          {
            type: "wordCloud",
            left: "center",
            top: "center",
            width: "90%",
            height: "90%",
            gridSize: 2,
            sizeRange: [8, 36],
            rotationRange: [-45, 90],
            shape: "pentagon",
            // maskImage: magiskImage,
            drawOutOfBound: true,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: [],
          },
        ],
      },
      pie: {
        color: [
          "#649af7",
          "#68d9ad",
          "#657897",
          "#f5bd36",
          "#e76a5c",
          "#A9D0CF",
          "#3B943C",
          "#7A46A9",
          "#BCC23C",
          "#FC2F71",
        ],
        tooltip: {
          trigger: "item",
          formatter: null,
        },
        legend: {
          orient: "horizontal",
          bottom: "5",
          data: [],
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "40%"],
            radius: '60%',
            roseType: "area",
            label: {
              show: true,
              formatter: "{c}家",
            },
            labelLine: {
              show: true,
              length: 4,
              length2: 0,
              smooth: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
      leftStyle: 18,
    };
  },
  created() {
    this.getList();
    this.getWordcloud();
    this.getPie();
  },
  methods: {
    validateListQuery() {
      this.$refs["listQuery"].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["listQuery"].resetFields();
    },
    getList(status) {
      if (status === undefined) {
        this.listQuery.page = 1;
      } else {
        this.listQuery.dljgmc = "";
        this.listQuery.num1 = "";
        this.listQuery.num2 = "";
      }
      this.listLoading = true;
      fetchDljgList(this.listQuery).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.list = response.data;
          this.total = response.pageInfo.totalCount;
          this.listQuery.limit = response.pageInfo.pageSize;
        } else {
          this.$message.error("没有查询到结果");
        }
        this.listLoading = false;
      });
    },
    getWordcloud() {
      fetchDljgGdljgcy().then((response) => {
        if (response) {
          if (!Array.isArray(response)) response = [response];
          const maxNumber = response[0].value;
          const max = Math.round(response[0].value * 0.5); //获取最大值,计算放大数
          for (let i = 1; i < response.length; i++) {
            const obj = response[i];
            obj.value += max; //所有数据放大
            this.wordcloud.series[0].data.push(obj);
          }
          this.wordcloud.series[0].data.push(response[0]);
          this.wordcloud.tooltip.formatter = function (params) {
            if (params.data.value == maxNumber) {
              return (
                params.data.name +
                "</br>" +
                params.marker +
                "代理金额: " +
                params.data.value +
                "万元"
              );
            } else {
              return (
                params.data.name +
                "</br>" +
                params.marker +
                "代理金额: " +
                (params.data.value - max).toFixed(2) +
                "万元"
              );
            }
          };
        } else {
          this.$message({
            message: "各代理机构代理词云相关数据获取为空,饼图不发生改变",
            type: "warning",
          });
        }
      });
    },
    getPie() {
      fetchDljgGdljgdlbk().then((response) => {
        if (response) {
          if (!Array.isArray(response)) response = [response];
          const number = Math.round(response[0].value * 0.5); //获取最大值,计算放大数
          for (const key in response) {
            this.pie.legend.data.push(response[key].name);
            var obj = response[key];
            obj.value += number; //所有数据放大
            this.pie.series[0].data.push(obj);
          }
          //设置图例展示时还原数值
          this.pie.tooltip.formatter = function (param) {
            return param.marker + param.name + ": " + (param.value - number);
          };
          //设置lable还原数值
          this.pie.series[0].label.formatter = function (param) {
            return param.value - number + "家";
          };
        } else {
          this.$message({
            message: "各代理机构代理版块相关数据获取为空,饼图不发生改变",
            type: "warning",
          });
        }
      });
    },
    isNotEmpty(v) {
      return isNotEmpty(v);
    },
    checkInput1(value) {
      let reg = /^[0-9]+(.[0-9]*)?$/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.listQuery.num1 = null;
          this.$message({
            message: "代理金额只能是正数",
            type: "warning",
          });
        } else {
          if (this.isNotEmpty(this.listQuery.num2)) {
            this.listQuery.num1 = Number(this.listQuery.num1);
            this.listQuery.num2 = Number(this.listQuery.num2);
            if (this.listQuery.num1 > this.listQuery.num2) {
              this.listQuery.num1 = null;
              this.$message({
                message: "起始金额大于终止金额",
                type: "warning",
              });
            }
          }
        }
      }
    },
    checkInput2(value) {
      // console.log(value);
      let reg = /^[0-9]+(.[0-9]*)?$/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.listQuery.num2 = null;
          this.$message({
            message: "代理金额只能是正数",
            type: "warning",
          });
        } else {
          this.listQuery.num1 = Number(this.listQuery.num1);
          this.listQuery.num2 = Number(this.listQuery.num2);

          if (this.isNotEmpty(this.listQuery.num1)) {
            if (this.listQuery.num1 > this.listQuery.num2) {
              this.listQuery.num2 = null;
              this.$message({
                message: "起始金额大于终止金额",
                type: "warning",
              });
            }
          }
        }
      }
    },
  },
};
</script>

<style  type="text/css" scoped>
.pagination-container {
    margin-top: 5px;
}
</style>
