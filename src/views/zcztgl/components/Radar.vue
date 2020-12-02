<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'

  const defaultOption = {
    title: {},
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
    },
    radar: {
      shape: 'circle',
      name: {
        textStyle: {
          color: '#333',
          //,
          // backgroundColor: '#999',
          // borderRadius: 3,
          // padding: [3, 5],
        },
      },
      splitArea: {
        areaStyle: {
          color: 'rgba(253, 253, 253, 253)',
          // shadowColor: 'rgba(0, 0, 0, 0.3)',
          // shadowBlur: 10,
        },
      },
      // 坐标轴线(中心向外的延展线)颜色
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
      // 同心圆线颜色
      splitLine: {
        lineStyle: {
          color: 'rgba(233, 233, 233)',
        },
      },
      axisLabel: {
        show: true,
        textStyle: {fontSize: 10, color: '#333'},
        // formatter: function (value, index) {
        //     this.axisLabelCount++
        //     if(axisLabelCount>25) return value

        // }
      },
      indicator: [
        {name: '不良投标行为', max: 100},
        {name: '信用风险', max: 100},
        {name: '能力风险', max: 100},
        {name: '经营风险', max: 100},
        {name: '投标成功率', max: 100},
        {name: '投标活跃指数', max: 100},
      ],
    },
    series: [
      {
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [43, 10, 28, 35, 50, 19],
            name: '供应商雷达图',
            areaStyle: {
              color: 'rgb(173, 199, 252)',
            },
          },
        ],
      },
    ],
  }
  export default {
    name: 'Radar',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'radar',
      },
      id: {
        type: String,
        default: 'radar',
      },
      width: {
        type: String,
        default: '200px',
      },
      height: {
        type: String,
        default: '200px',
      },
      option: {
        type: Object,
        default: () => defaultOption,
      },
    },
    data() {
      return {
        chart: null,
        axisLabelCount: 0,
      }
    },
    watch: {
      option: {
        handler: function (val, oldval) {
          //console.log('监听到数据变化，饼图初始化....')
          this.initChart()
        },
        // 声明后立刻执行,echarts演示需要dom初始化完成，此处不要打开
        //immediate: true,
        deep: true,
      },
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption(this.option)
      },
      resizeChart(){
        this.chart.resize()
      }
    },
  }
</script>
