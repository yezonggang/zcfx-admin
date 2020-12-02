<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'

  const defaultOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: '5',
      data: ['100万', '500万', '1000万'],
    },
    series: [
      {
        name: '金额分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          {value: 335, name: '100万'},
          {value: 310, name: '500万'},
          {value: 369, name: '1000万'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  export default {
    name: 'Pie',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'pie',
      },
      id: {
        type: String,
        default: 'pie',
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
        deep: true
      },
    },
    mounted() {
      //console.log('饼图初始化,注意此mounted处执行的初始化只是用来演示组件')
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
