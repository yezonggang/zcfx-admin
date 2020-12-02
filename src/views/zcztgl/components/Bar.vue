<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'

  const defaultOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['供应商数量'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: [
        '省外',
        '开封市',
        '洛阳市',
        '信阳市',
        '南阳市',
        '濮阳市',
        '郑州市',
      ],
    },
    series: [
      {
        name: '高风险',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight',
        },
      },
      {
        name: '',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight',
        },
        data: [],
      },
      {
        name: '',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight',
        },
        data: [],
      },
      {
        name: '低风险',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight',
        },
      },
      {
        name: '供应商数量',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight',
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
      },
    ],
  }

  export default {
    name: 'Bar',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'bar',
      },
      id: {
        type: String,
        default: 'bar',
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
