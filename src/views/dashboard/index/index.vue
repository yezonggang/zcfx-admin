<template>
  <select-layout slot :rightShow="true" :leftStyle="16" :rightStyle="8">
    <span slot="title" class="zc-title">供应商主体刻画</span>
    <span slot="describe">查询供应商查询画像</span>
    <el-col slot="left" :span="16">
      <el-card class="kjrk">
        <div class="main-top">
          <div class="tianqi">
            <svg-icon
              :icon-class="iconClass"
              style="font-size: 100px; margin-top: 1%; margin-left: 2%;"
            />
            <span class="s1">{{ tem1 }}℃~{{ tem2 }}℃</span>
            <span class="s2">今日天气：{{ wea }} ，风级：{{ winSpeed }}</span>
            <!-- <span class="s3">出门记得带伞哦</span> -->
          </div>
          <div class="miaoshu">
            <!-- <div class="miaoshu-above">
                <span class="rq">{{ nowDate }}</span> 
            </div>-->
            <div>
              <!-- <span class="ts">{{ name }}，开始你的一天工作吧！</span> -->
              <div class="logo-complete" style="display: flex;align-items: center">
                <div style="width:70%;min-width:300px">
                  <img
                    src="@/assets/logo-complete.png"
                    alt="中原招采网"
                    style="width: 90%; float: left;padding-left:10px"
                  />
                </div>
                <span class="ts" style="font-size: 20px;margin-left:auto;border-bottom: 2px solid black;margin-right:10px">
                  {{ name }}，您好！
                </span>
              </div>
            </div>
            <div class="miaoshu-below">
              <div class="gl">
                <router-link :to="'/zcztgl/gys/'" style="color: #333333">
                  <div class="gl-icon1">
                    <i class="el-icon-edit"></i>
                  </div>
                  <div class="gl-text1">供应商画像</div>
                </router-link>
              </div>
              <div class="gl">
                <router-link :to="'/zcztgl/cgr/'" style="color: #333333">
                  <div class="gl-icon2">
                    <i class="el-icon-data-analysis"></i>
                  </div>
                  <div class="gl-text1">招标方画像</div>
                </router-link>
              </div>
              <div class="gl">
                <router-link :to="'/zcztgl/dljg/'" style="color: #333333">
                  <div class="gl-icon6">
                    <i class="el-icon-postcard"></i>
                  </div>
                  <div class="gl-text1">代理机构画像</div>
                </router-link>
              </div>
              <div class="gl">
                <router-link :to="'/yjjk/index'" style="color: #333333">
                  <div class="gl-icon4">
                    <i class="el-icon-suitcase-1"></i>
                  </div>
                  <div class="gl-text1">监管预警</div>
                </router-link>
              </div>
              <!-- <div class="gl">
                <router-link :to="'/zbss/index'" style="color: #333333">
                  <div class="gl-icon7">
                    <i class="el-icon-wallet"></i>
                  </div>
                  <div class="gl-text1">招标搜索</div>
                </router-link>
              </div> -->
              <div class="gl">
                <router-link :to="'/iframe/ureport/index'" style="color: #333333">
                  <div class="gl-icon5">
                    <i class="el-icon-wallet"></i>
                  </div>
                  <div class="gl-text1">自助报表</div>
                </router-link>
              </div>
              <div class="gl">
                <router-link :to="'/iframe/atlas/atlas'" style="color: #333333">
                  <div class="gl-icon3">
                    <i class="el-icon-search"></i>
                  </div>
                  <div class="gl-text1">图谱查询</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="main-bolow">
          <div class="title">
            <svg-icon icon-class="ditu" />&nbsp;&nbsp;平台供应商地域分布
          </div>
          <Map id="myMap" :option="chartOption" class="echarts-map" height="100%" width="100%"></Map>
        </div>
      </el-card>
    </el-col>
    <span slot="chart1-title" class="zc-title">
      <svg-icon icon-class="leida" />&nbsp;&nbsp;平台历年成交金额统计（单位：亿元）
    </span>
    <span slot="chart2-title" class="zc-title">
      <svg-icon icon-class="yingbi" />&nbsp;&nbsp;平台供应商成交金额 TOP6
    </span>
    <Cur :option="lntjfb" slot="chart1" id="cur" height="100%" width="100%" />
    <Bar :option="cjjefb" slot="chart2" id="bar" height="100%" width="100%" />
  </select-layout>
</template>
<script>
import { isNull } from "@/utils/zcfx-filters";

// 查询列表页layout
import SelectLayout from "@/views/zcztgl/components/SelectLayout";
// 请求数据
import { gyscjje, lncjtj, gysqgdyfb, weather } from "@/api/zcztgl";

// echarts 支持
import Bar from "@/views/zcztgl/components/Bar";
import Cur from "@/views/zcztgl/components/Cur";
import Map from "@/views/zcztgl/components/Map";
import echarts from "echarts";
import china from "@/assets/js/china";
import { array } from "jszip/lib/support";
import { mapGetters } from "vuex";
export default {
  name: "index",
  components: {
    Bar,
    Cur,
    Map,
    SelectLayout
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    e: isNull,
    conventDmmc(value, list) {
      return list.get(value);
    }
  },
  data() {
    return {
      chartOption: {
        backgroundColor: "#FFFFFF",
        title: {
          text: "全国活动供应商数量分布图",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item"
        },
        //左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 500, end: 10000 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 }
          ],
          color: [
            "#5475f5",
            "#9feaa5",
            "#85daef",
            "#74e2ca",
            "#e6ac53",
            "#9fb5ea"
          ]
        },
        //配置属性
        series: [
          {
            name: "供应商数量",
            type: "map",
            mapType: "china",
            roam: true,
            label: {
              normal: {
                show: true //省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: [] //数据
          }
        ]
      },
      nowDate: "", // 当前日期
      tem1: "",
      tem2: "",
      wea: "",
      winSpeed: "",
      iconClass: "",
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        ztmc: "",
        frmc: "",
        lxr: "",
        lxrdh: "",
        page: 1,
        limit: 10
      },
      // 历年成交统计
      lntjfb: {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        name: "lntjfb",
        // 设置折线
        symbolSize: 5,
        lineStyle: {
          normal: {
            label: {
              show: true
            },
            width: 5,
            color: "#fe4857"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        series: [
          {
            name: "成交金额",
            itemStyle: { normal: { label: { show: true } } },
            data: [],
            type: "line",
            // showAllSymbol: true,
            // symbol: 'emptyCircle',
            // symbolSize: 6,
            smooth: true,
            areaStyle: {
              normal: {
                //右，下，左，上
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#fe4857"
                    },
                    {
                      offset: 1,
                      color: "#FFFFFF"
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      },

      // 供应商成交金额分布
      cjjefb: {
        grid: [
          {
            //左侧的柱状图grid
            width: "100%",
            left: "3%",
            top: "10%",
            right: "0",
            bottom: "0"
          }
        ],
        xAxis: [
          {
            //左侧柱状图的X轴
            gridIndex: 0, //x 轴所在的 grid 的索引
            show: false
          }
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
              padding: [0, 0, 10, 15],
              textStyle: {
                color: "#333333",
                fontSize: "14"
              }
            },
            data: [],
            inverse: true
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
              padding: [0, 60, 10, 0],
              textStyle: {
                color: "#333",
                fontSize: "16"
              },
              formatter: function(value) {
                return value + "万元";
              },
              rich: {
                y: {
                  color: "#befbff",
                  fontSize: 14
                },
                x: {
                  color: "#f6cf42",
                  fontSize: 14
                }
              }
            }
          },
          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: []
          }
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
                    "rgba(255, 159, 152, 1)"
                  ].map((color, offset) => ({
                    color,
                    offset
                  }))
                ),
                barBorderRadius: 6
              }
            },
            z: 2
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            barGap: "-100%",
            data: [1, 2, 3, 4, 5, 6],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: "#f2f2f2",
                barBorderRadius: 6
              }
            },
            z: 0
          }
        ]
      },
      leftStyle: 18,
      rules: {
        lxrdh: [
          {
            pattern: /^1[3456789]\d{9}$/,
            required: false,
            message: "请输入正确的手机号码"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {
    this.lncjtj();
    this.gyscjje();
    this.gysqgdyfb();
    this.weather();
  },
  methods: {
    validateListQuery() {
      this.$refs["listQuery"].validate(valid => {
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
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      this.hour = `${hour}:${minute}:${second}`;
      // this.nowDate1 = `${hour}:${minute}:${second}`;
    },

    //获取当天天气情况
    weather() {
      weather().then(response => {
        this.tem1 = response.tem1;
        this.tem2 = response.tem2;
        this.wea = response.wea;
        this.winSpeed = response.winSpeed;
        if (response.wea == "薄雾") {
          this.iconClass = "weather-wu";
        } else if (
          response.wea == "多云" ||
          response.wea == "晴，少云" ||
          response.wea == "晴，多云"
        ) {
          this.iconClass = "weather-duoyun";
        } else if (response.wea == "晴") {
          this.iconClass = "weather-qing";
        } else if (
          response.wea == "小雪" ||
          response.wea == "中雪" ||
          response.wea == "雪"
        ) {
          this.iconClass = "weather-xue";
        } else if (response.wea == "雨夹雪") {
          this.iconClass = "weather-yujiaxue";
        } else if (response.wea == "大雪" || response.wea == "暴雪") {
          this.iconClass = "weather-baoxue";
        } else if (response.wea == "阴" || response.wea == "阴，多云") {
          this.iconClass = "weather-yin";
        } else if (
          response.wea == "小雨" ||
          response.wea == "中雨" ||
          response.wea == "阵雨" ||
          response.wea == "大雨" ||
          response.wea == "雷雨"
        ) {
          this.iconClass = "weather-yu";
        } else if (response.wea == "大雾") {
          this.iconClass = "weather-dawu";
        }
      });
    },
    //全国供应商地域分布
    gysqgdyfb() {
      gysqgdyfb().then(response => {
        if (response) {
          for (let i = 0; i < response.length; i++) {
            let name = response[i].name.substring(
              0,
              response[i].name.length - 1
            );
            this.chartOption.series[0].data.push({
              name: name,
              value: response[i].sl
            });
          }
        }
        this.listLoading = false;
      });
    },
    //历年成交统计
    lncjtj() {
      this.listLoading = true;
      // console.log("this.lntjfb", this.lntjfb);
      lncjtj().then(response => {
        if (response) {
          response.forEach(element => {
            this.lntjfb.xAxis.data.push(element.nf);
            this.lntjfb.series[0].data.push({
              id: element.nf,
              value: element.je
            });
          });
          // for(let i=0;i<response.length;i++){
          //   this.lntjfb.xAxis.data.push(response[i].nf)
          //   this.lntjfb.series[0].data.push({id:response[i].nf,value:response[i].je})
          // }
        }
        this.listLoading = false;
      });
    },
    //供应商成交金额排名
    gyscjje() {
      this.listLoading = true;
      gyscjje().then(response => {
        if (response) {
          let j = 0;
          let count = 0;
          for (let i = response.length - 1; i >= 0; i--) {
            count = count + response[i].zje;
          }
          for (let i = 0; i < response.length; i++) {
            // 名称
            this.cjjefb.yAxis[0].data.push(
              "NO." + ++j + "    " + response[i].gysmc
            );

            // 个数
            this.cjjefb.yAxis[1].data.push(response[i].zje);

            // 柱状图长度
            this.cjjefb.series[0].data.push(response[i].zje);
            // 柱状图外框
            this.cjjefb.series[1].data.push(count);
          }
        }
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.currentTime();
  }
};
</script>
<style  type="text/css" scoped>
.main-top {
  width: 100%;
  height: 260px;
}

.kjrk {
  margin-bottom: 10px;
}

.kjrk >>> .el-card__body {
  padding: 0px;
}
.tianqi {
  display: inline-block;
  width: 260px;
  height: 100%;
  background-image: linear-gradient(-58deg, #3ad57f 0%, #76a3ff 100%),
    linear-gradient(#fca830, #fca830);
  position: relative;
}
.tianqi span {
  display: block;
}
.tianqi .s1 {
  position: absolute;
  left: 6%;
  top: 60%;
  color: #ffffff;
  font-size: 26px;
}
.tianqi .s2 {
  position: absolute;
  left: 6%;
  top: 77%;
  color: #ffffff;
  font-size: 16px;
}
.tianqi .s3 {
  position: absolute;
  left: 3%;
  top: 85%;
  color: #ffffff;
  font-size: 16px;
}
.miaoshu {
  width: calc(100% - 260px);
  height: 100%;
  background-color: #ffffff;
  float: right;
  display: flex;
  flex-direction: column;
}
.miaoshu .miaoshu-above {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.miaoshu .miaoshu-above .data {
  display: inline-block;
}
.miaoshu .miaoshu-below {
  flex: 1;
  display: flex;
}
.miaoshu .miaoshu-below .gl {
  flex: 1;
}

.miaoshu-above .rq {
  /* padding-top: 4%; */
  padding-left: 3%;
  font-size: 25px;
  color: #808080;
}
.miaoshu-above .ts {
  /* padding-top: 2%; */
  padding-left: 3%;
  font-size: 30px;
  color: #333333;
}
.miaoshu-below .gl {
  position: relative;
}
.miaoshu-below .gl > a {
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}
.miaoshu-below .gl .gl-icon1 {
  background-color: #fe4857;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.el-icon-edit:before {
  font-size: 20px;
  color: #ffffff;
}
.el-icon-data-analysis {
  font-size: 20px;
  color: #ffffff;
}
.el-icon-search {
  font-size: 20px;
  color: #ffffff;
}
.el-icon-suitcase-1 {
  font-size: 20px;
  color: #ffffff;
}
.el-icon-wallet {
  font-size: 20px;
  color: #ffffff;
}
.el-icon-postcard {
  font-size: 20px;
  color: #ffffff;
}
.miaoshu-below .gl .gl-icon2 {
  background-color: #2e9ef2;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.miaoshu-below .gl .gl-icon3 {
  background-color: #fec516;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.miaoshu-below .gl .gl-icon4 {
  background-color: #9066fd;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.miaoshu-below .gl .gl-icon5 {
  background-color: #95cdf8;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.miaoshu-below .gl .gl-icon6 {
  background-color: #58c77f;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}
.miaoshu-below .gl .gl-icon7 {
  background-color: #a3409e;
  border-radius: 20px;
  padding: 18%;
  cursor: pointer;
}


.miaoshu-below .gl .gl-text1 {
  font-size: 16px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main-bolow {
  height: 527px;
}
.main-bolow .title {
  font-size: 22px;
  padding: 10px;
  color: #333333;
}
.main-bolow .echarts-map {
  height: 88%;
}
.active {
  color: #000;
}
</style>
