<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import "echarts-wordcloud";
  import echarts from "echarts";
  import resize from "@/components/Charts/mixins/resize";

  const defaultOption = {
    series: [
      {
        type: "wordCloud",
        gridSize: 2,
        rotationRange: [-90, 90],
        shape: "diamond",
        textStyle: {
          normal: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255),
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
        data: [
          {
            name: "Sam S Club",
            value: 10000,
          },
          {
            name: "Macys",
            value: 6181,
          },
          {
            name: "Amy Schumer",
            value: 4386,
          },
          {
            name: "Jurassic World",
            value: 4055,
          },
          {
            name: "Charter Communications",
            value: 2467,
          },
          {
            name: "Chick Fil A",
            value: 2244,
          },
          {
            name: "Planet Fitness",
            value: 1898,
          },
          {
            name: "Pitch Perfect",
            value: 1484,
          },
          {
            name: "Express",
            value: 1112,
          },
          {
            name: "Home",
            value: 965,
          },
          {
            name: "Johnny Depp",
            value: 847,
          },
          {
            name: "Lena Dunham",
            value: 582,
          },
          {
            name: "Lewis Hamilton",
            value: 555,
          },
          {
            name: "KXAN",
            value: 550,
          },
          {
            name: "Mary Ellen Mark",
            value: 462,
          },
          {
            name: "Farrah Abraham",
            value: 366,
          },
          {
            name: "Rita Ora",
            value: 360,
          },
          {
            name: "Serena Williams",
            value: 282,
          },
          {
            name: "NCAA baseball tournament",
            value: 273,
          },
          {
            name: "Point",
            value: 273,
          },
          {
            name: "Point Break",
            value: 265,
          },
        ],
      },
    ],
  };

  export default {
    name: "Wordcloud",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: "wordCloud",
      },
      id: {
        type: String,
        default: "wordCloud",
      },
      width: {
        type: String,
        default: "200px",
      },
      height: {
        type: String,
        default: "200px",
      },
      option: {
        type: Object,
        default: () => defaultOption,
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    watch: {
      option: {
        handler: function (val, oldval) {
          this.initChart();
        },
        deep: true,
      },
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));
        this.chart.setOption(this.option);
      },
      resizeChart(){
        this.chart.resize()
      }
    },
  };
</script>
