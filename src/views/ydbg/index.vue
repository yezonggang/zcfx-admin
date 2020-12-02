<template>
    <div id='write' class='is-node'>

        <div style="display: flex;justify-content: flex-end;">
            <!--  <button style="height: 30px;margin-right: 10px;" onclick="downloadPDF()">生成pdf</button>-->
            <button style="height: 30px;margin-right: 10px;" @click="download2">下载word</button>
            <button style="height: 30px;margin-right: 10px;" @click="regenerate2">重新生成</button>
        </div>

        <h1><a name="中原招采平台企业月度汇报" class="md-header-anchor"></a><span>中原招采平台企业月度汇报</span></h1>

        <p><span>平台内部和企划部版本</span></p>
        <h2><a name="项目交易情况" class="md-header-anchor"></a><span>项目交易情况</span></h2>
        <p>
            <span>{{ xmjyqk.nf }}</span>年<span>{{ xmjyqk.yf }}</span><span>月内，中原招标采购平台共计完成招标项目数</span><u><span
                >{{ xmjyqk.xmsl }}</span></u><span>个，包含</span><u><span
                >{{ xmjyqk.fbsl }}</span></u><span>个分包标段，流标数量</span><u><span>{{ xmjyqk.fbs }}</span></u><span>个，其中询比采购</span><u><span
                >{{ xmjyqk.xbcg }}</span></u><span>个，竞争性谈判采购</span><u><span>{{ xmjyqk.jjcg }}</span></u><span>个，谈判采购</span><u><span
                >{{ xmjyqk.tpcg }}</span></u><span>个，公开招标</span><u><span>{{ xmjyqk.gkzb }}</span></u><span>个，单一来源采购</span><u><span
                >{{ xmjyqk.zjcg }}</span></u><span>个，邀请招标个数</span><u><span >{{ xmjyqk.yqzb }}</span></u><span>个，涉及的定标总金额</span><u><span
               >{{ xmjyzje }}</span>万</u><span>元。</span>
        </p>
        
        <div id="echarts1" style="width:600px;height:400px;margin:10px auto 10px;padding: 5px">
            <Pie
            ref="chart1"
			:id="pie"
			:option="option"
			:height="chartWidth"
			width="100%"
		    />
        </div>
        <h2><a name="各板块统计情况" class="md-header-anchor"></a><span>各板块统计情况</span></h2>
        <p>
            <u><span>{{ gbktjqk.nf }}</span></u><span>年</span><u><span
                >{{ gbktjqk.yf }}</span></u><span>月内，包含郑煤在内，投资集团下属</span><u><span>{{ gbktjqk.bkmcsl }}</span></u><span>个版块参与招标，包括：<span
                >{{ gbktjqk.bkmc }}</span>，共</span><u><span>{{ gbktjqk.xmsl }}</span></u><span>个项目，包含</span><u><span
                >{{ gbktjqk.fbsl }}</span></u><span>个分包，其中项目占比分布如下：</span>
        </p>
        
        <div id="echarts2" style="width:600px;height:400px;margin:10px auto 10px;padding: 5px">
            <Pie
            ref="chart2"
			:id="pie2"
			:option="option2"
			:height="chartWidth"
			width="100%"
		    />
        </div>
        <h2><a name="主体分析" class="md-header-anchor"></a><span>主体分析</span></h2>
        <p>
            <span>本月新增(单月审核通过)的供应商</span><u><span>{{ sygyssl.sl }}</span></u><span>家，平台上总注册专家个数为</span><u><span
                >{{ zjsl }}</span></u><span>个，总注册招标方个数为</span><u><span
                >{{ zbfsl }}</span></u><span>个，总注册供应商个数为</span><u><span>{{ gyssl }}</span></u><span>个，截止</span><u><span
                >{{ sygyssl.nf }}</span></u><span>年</span><u><span
                >{{ sygyssl.yf }}</span></u><span>月，优质供应商排名（供应商参与项目的中标金额TOP10），包括：</span>
        </p>
        <el-table

			:data="list"
            border
			:stripe="true"
			style="width: 100%"
        >
            <el-table-column
				min-width="60px"
				align="left"
				label="序号"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.rank">{{ scope.row.rank }}</span>
				</template>
			</el-table-column>
            <el-table-column
				min-width="160px"
				align="left"
				label="公司名称"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.ztmc">{{ scope.row.gysmc}}</span>
				</template>
			</el-table-column>
            <el-table-column
				min-width="100px"
				align="left"
				label="交易总金额"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.ztmc">{{ scope.row.zje}} 万元</span>
				</template>
			</el-table-column>
        </el-table>
        <h2><a name="异常情况" class="md-header-anchor"></a><span>异常情况</span></h2>
        <p>
            <u><span>{{ ycqk.nf }}</span></u><span>年</span><u><span>{{ ycqk.yf }}</span></u><span>月内，中原招采平台共出现</span><u><span
                >{{ ycqk.zs }}</span></u><span>个潜在风险，包括：新增</span><u><span
                >{{ hmd }}</span></u><span>个黑名单供应商，供应商上传投标文件的IP一致</span><u><span>{{ ycqk.scwjipyz }}</span></u><span>组，供应商报名的IP一致</span><u><span
                >{{ ycqk.bmipyz }}</span></u><span>组，供应商机器码一致</span><span
                >{{ ycqk.jqmyz }}</span><span>组，供应商上传投标文件相似度过高</span><u><span
                >{{ wjxsj }}</span></u><span>个，招标方未按时发布评审公示</span><u><span>{{ ycqk.psgs }}</span></u><span>个，未定式签订合同</span><u><span
                >{{ ycqk.qdht }}</span></u><span>个；</span>
        </p>
        
        <div id="echarts3" style="width:600px;height:400px;margin:10px auto 10px;padding: 5px">
            <Pie
            ref="chart3"
			:id="pie3"
			:option="option3"
			:height="chartWidth"
			width="100%"
		    />
        </div>
    </div>
</template>
<script>

import { xmjyqkJSON,findBKtj,findGyssl,findZjzsl,findCgrzsl,findGyszsl,regenerate2,
findYcqk,findHmd,findWjxsd,findZbxmfb,findGyscjje,findZbzje,download,realyDown } from '@/api/ydhb'

import echarts from 'echarts';
import Pie from '@/views/zcztgl/components/Pie'

export default {
    name: "ydbg",
    components:{
        Pie
    },
    data(){
        return{
            list: null,
            sygyssl:{},
            zjsl:null,
            zbfsl:null,
            gyssl:null,
            hmd:null,
            wjxsj:null,
            xmjyzje:null,
            // data:null,
            chartImage1Src:null,
            chartImage2Src:null,
            chartImage3Src:null,
            formObj : {},
            xmjyqk:{},
            gbktjqk:{},
            ztfxqk:{},
            ycqkqk:{},
            ycqk:{},
            pie: 'pie',
            pie2:'pie2',
            pie3:'pie3',
            ycqkPic:[],
            GysCjje:[],
            option:{
                title: {
                    text: '项目交易情况统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['公开招标', '邀请招标', '谈判采购', '询比采购', '直接采购', '竞价采购']
                },
                series: [
                    {
                        name: '采购方式',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option2:{
                title: {
                    text: '各板块招标项目分布',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['郑煤集团', '基础设施产业', '科技投资', '豫能控股', '信息产业', '同力水泥', '大河纸业', '产业管理', '颐城控股']
                },
                series: [
                    {
                        name: '板块',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option3:{
                title: {
                    text: '异常情况统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['未按时定标数', '未按时发布评审公示数', '未按时签订合同数', '文件相似度高组数', '机器码相同组数', '报名IP地址一致组数', '上传投标文件IP地址一致组数', '新增黑名单数']
                },
                series: [
                    {
                        name: '异常原因',
                        type: 'pie',
                        radius: '55%',
                        center: ['60%', '60%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            chartWidth: '100%'
        }
    },
    created(){
        this.getXmjyqk();
        this.getGbktjqk();
        this.getZtfxSygyssl();
        this.getZtfxZjsl();
        this.getZtfxCgrzsl();
        this.getZtfxGyszsl();
        this.getYcqk();
        this.getHmd();
        this.getWjxsd();
        this.getZtfxGysCjje();
        this.getXmjyZje();
        this.findZbxmfb();
    },
    methods:{
        getXmjyqk(){
            xmjyqkJSON().then((response) => {
                this.xmjyqk = response;
                let arr = [];
                arr.push({value: response.gkzb, name: '公开招标'})
                arr.push({value: response.yqzb, name: '邀请招标'})
                arr.push({value: response.tpcg, name: '谈判采购'})
                arr.push({value: response.xbcg, name: '询比采购'})
                arr.push({value: response.zjcg, name: '直接采购'})
                arr.push({value: response.jjcg, name: '竞价采购'})
                this.formObj["nf"] = response.nf
                this.formObj["yf"] = response.yf
                this.formObj["xmsl"] = response.xmsl
                this.formObj["fbsl"] = response.fbsl
                this.formObj["fbs"] = response.fbs
                this.formObj["gkzb"] = response.gkzb
                this.formObj["yqzb"] = response.yqzb
                this.formObj["tpcg"] = response.tpcg
                this.formObj["xbcg"] = response.xbcg
                this.formObj["zjcg"] = response.zjcg
                this.formObj["jjcg"] = response.jjcg
                this.option.series[0].data = arr;
            });
            
        },
        getGbktjqk(){
            findBKtj().then((response) => {
                this.formObj["fbsl2"] = response.fbsl
                this.formObj["xmsl2"] = response.xmsl
                this.formObj["bkmc"] = response.bkmc
                this.formObj["bkmcsl"] = response.bkmcsl
                
                this.gbktjqk = response;
            });
        },
        getZtfxSygyssl(){
            findGyssl().then((response) => {
                this.formObj["sygyssl"] = response.sl
                
                this.sygyssl = response;
                
            });
        },
        getZtfxZjsl(){
            findZjzsl().then((response) => {
                this.formObj["zjsl"] = response
                this.zjsl = response;
            });
        },
        getZtfxCgrzsl(){
            findCgrzsl().then((response) => {
                this.formObj["zbfsl"] = response
                this.zbfsl = response;
            });
        },
        getZtfxGyszsl(){
            findGyszsl().then((response) => {
                this.formObj["gyssl"] = response
                this.gyssl = response;
            });
        },
        getYcqk(){
            findYcqk().then((response) => {
                this.ycqk = response;
                this.ycqkPic.push({value: response.db, name: '未按时定标数'})
                this.ycqkPic.push({value: response.psgs, name: '未按时发布评审公示数'})
                this.ycqkPic.push({value: response.qdht, name: '未按时签订合同数'})
                this.ycqkPic.push({value: response.jqmyz, name: '机器码相同组数'})
                this.ycqkPic.push({value: response.bmipyz, name: '报名IP地址一致组数'})
                this.ycqkPic.push({value: response.scwjipyz, name: '上传投标文件IP地址一致组数'})
                this.formObj["zs"] = response.zs
                this.formObj["db"] = response.db
                this.formObj["psgs"] = response.psgs
                this.formObj["qdht"] = response.qdht
                this.formObj["jqmyz"] = response.jqmyz
                this.formObj["bmipyz"] = response.bmipyz
                this.formObj["scwjipyz"] = response.scwjipyz
            });
        },
        getHmd(){
            findHmd().then((response) => {
                this.hmd = response;
                this.ycqkPic.push({value: response, name: '新增黑名单数'})
                this.formObj["xzxmd"] = response
            });
        },
        getWjxsd(){
            findWjxsd().then((response) => {
                this.wjxsj = response;
                this.ycqkPic.push({value: response, name: '文件相似度高组数'})
                this.formObj["wjxsd"] = response
            });
            this.option3.series[0].data = this.ycqkPic;
        },
        findZbxmfb(){
            findZbxmfb().then((response) => {
                if (response) {
                    let arr = []
                    let legend = []
                    let value = response
                    for (let i in value) {
                        arr.push({value: value[i].xmsl, name: value[i].bkmc})
                        legend.push(value[i].bkmc)
                    } 
                    this.option2.series[0].data = arr;
                }
            });
        },
        getZtfxGysCjje(){
            findGyscjje().then((response) => {
                if (response) {
                    if (!Array.isArray(response))
                        response = [response]
                        this.list = response
                        for (let i in response) {
                            this.formObj["gysmc" + i] = response[i].gysmc
                            this.formObj["zbl" + i] = response[i].zje+"万元"
                        }
                } else {
                    this.$message.error('没有查询到结果')
                }
                this.listLoading = false
            });
        },
        getXmjyZje(){
            findZbzje().then((response) => {
                this.xmjyzje = response;
                this.formObj["zje"] = response;
            });
        },
        getChartImageSrc(echartIns) {
            let src = echartIns.getDataURL({
                // 导出的格式，可选 png, jpeg
                type: 'png',
                // 导出的图片分辨率比例，默认为 1。
                pixelRatio: 1,
                // 导出的图片背景色，默认使用 option 里的 backgroundColor
                backgroundColor: '#fff',
                // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
                excludeComponents: ['toolbox']
            });
            return src
        },
        dataURLtoFile(dataurl, filename) {
            let arr = dataurl.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            //转换成file对象
            return new File([u8arr], filename, {type: mime});
            //转换成成blob对象
            //return new Blob([u8arr],{type:mime});
        },
        download2() {
            let formdata = new FormData()
            this.chartImage1Src = this.getChartImageSrc(this.$refs.chart1.chart)
            this.chartImage2Src = this.getChartImageSrc(this.$refs.chart2.chart)
            this.chartImage3Src = this.getChartImageSrc(this.$refs.chart3.chart)
            formdata.append("images",new Blob([this.dataURLtoFile(this.chartImage1Src, "图片1")]) ); //加入文件对象
            formdata.append("images", new Blob([this.dataURLtoFile(this.chartImage2Src, "图片2")]) ); //加入文件对象
            formdata.append("images", new Blob([this.dataURLtoFile(this.chartImage3Src, "图片3")]) ); //加入文件对象
            formdata.append("map", JSON.stringify(this.formObj)); //加入表单对象 
            
            download(formdata).then((response) => {
				 realyDown(response)
			})
        },
        regenerate2() {
            let formdata = new FormData()
            this.chartImage1Src = this.getChartImageSrc(this.$refs.chart1.chart)
            this.chartImage2Src = this.getChartImageSrc(this.$refs.chart2.chart)
            this.chartImage3Src = this.getChartImageSrc(this.$refs.chart3.chart)
            formdata.append("images",new Blob([this.dataURLtoFile(this.chartImage1Src, "图片1")]) ); //加入文件对象
            formdata.append("images", new Blob([this.dataURLtoFile(this.chartImage2Src, "图片2")]) ); //加入文件对象
            formdata.append("images", new Blob([this.dataURLtoFile(this.chartImage3Src, "图片3")]) ); //加入文件对象
            formdata.append("map", JSON.stringify(this.formObj)); //加入表单对象 
            
            regenerate2(formdata).then((response) => {
				 realyDown(response)
			})
        }
    },

    
}
</script>

<style  type="text/css" scoped>
    html {
        overflow-x: initial !important;
    }

    :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --select-text-bg-color: #B5D6FC;
        --select-text-font-color: auto;
        --monospace: "Lucida Console", Consolas, "Courier", monospace;
    }

    html {
        font-size: 14px;
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    body {
        margin: 0px;
        padding: 0px;
        height: auto;
        bottom: 0px;
        top: 0px;
        left: 0px;
        right: 0px;
        font-size: 1rem;
        line-height: 1.42857;
        overflow-x: hidden;
        background: inherit;
        tab-size: 4;
    }

    iframe {
        margin: auto;
    }

    a.url {
        word-break: break-all;
    }

    a:active,
    a:hover {
        outline: 0px;
    }

    .in-text-selection,
    ::selection {
        text-shadow: none;
        background: var(--select-text-bg-color);
        color: var(--select-text-font-color);
    }

    #write {
        margin: 0px auto;
        height: auto;
        width: inherit;
        word-break: normal;
        overflow-wrap: break-word;
        position: relative;
        white-space: normal;
        overflow-x: visible;
        padding-top: 20px;
    }

    #write.first-line-indent p {
        text-indent: 2em;
    }

    #write.first-line-indent li p,
    #write.first-line-indent p * {
        text-indent: 0px;
    }

    #write.first-line-indent li {
        margin-left: 2em;
    }

    .for-image #write {
        padding-left: 8px;
        padding-right: 8px;
    }

    body.typora-export {
        padding-left: 30px;
        padding-right: 30px;
    }

    .typora-export .footnote-line,
    .typora-export li,
    .typora-export p {
        white-space: pre-wrap;
    }

    @media screen and (max-width: 500px) {
        body.typora-export {
            padding-left: 0px;
            padding-right: 0px;
        }

        #write {
            padding-left: 20px;
            padding-right: 20px;
        }

        .CodeMirror-sizer {
            margin-left: 0px !important;
        }

        .CodeMirror-gutters {
            display: none !important;
        }
    }

    #write li > figure:last-child {
        margin-bottom: 0.5rem;
    }

    #write ol,
    #write ul {
        position: relative;
    }

    img {
        max-width: 100%;
        vertical-align: middle;
    }

    button,
    input,
    select,
    textarea {
        color: inherit;
        font: inherit;
    }

    input[type="checkbox"],
    input[type="radio"] {
        line-height: normal;
        padding: 0px;
    }

    *,
    ::after,
    ::before {
        box-sizing: border-box;
    }

    #write h1,
    #write h2,
    #write h3,
    #write h4,
    #write h5,
    #write h6,
    #write p,
    #write pre {
        width: inherit;
    }

    #write h1,
    #write h2,
    #write h3,
    #write h4,
    #write h5,
    #write h6,
    #write p {
        position: relative;
    }

    p {
        line-height: inherit;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        break-after: avoid-page;
        break-inside: avoid;
        orphans: 2;
    }

    p {
        orphans: 4;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    h3 {
        font-size: 1.6rem;
    }

    h4 {
        font-size: 1.4rem;
    }

    h5 {
        font-size: 1.2rem;
    }

    h6 {
        font-size: 1rem;
    }

    .md-math-block,
    .md-rawblock,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .hidden {
        display: none;
    }

    .md-blockmeta {
        color: rgb(204, 204, 204);
        font-weight: 700;
        font-style: italic;
    }

    a {
        cursor: pointer;
    }

    sup.md-footnote {
        padding: 2px 4px;
        background-color: rgba(238, 238, 238, 0.7);
        color: rgb(85, 85, 85);
        border-radius: 4px;
        cursor: pointer;
    }

    sup.md-footnote a,
    sup.md-footnote a:hover {
        color: inherit;
        text-transform: inherit;
        text-decoration: inherit;
    }

    #write input[type="checkbox"] {
        cursor: pointer;
        width: inherit;
        height: inherit;
    }

    figure {
        overflow-x: auto;
        margin: 1.2em 0px;
        max-width: calc(100% + 16px);
        padding: 0px;
    }

    figure > table {
        margin: 0px !important;
    }

    tr {
        break-inside: avoid;
        break-after: auto;
    }

    thead {
        display: table-header-group;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0px;
        width: 100%;
        overflow: auto;
        break-inside: auto;
        text-align: left;
    }

    table.md-table td {
        min-width: 32px;
    }

    .CodeMirror-gutters {
        border-right: 0px;
        background-color: inherit;
    }

    .CodeMirror-linenumber {
        user-select: none;
    }

    .CodeMirror {
        text-align: left;
    }

    .CodeMirror-placeholder {
        opacity: 0.3;
    }

    .CodeMirror pre {
        padding: 0px 4px;
    }

    .CodeMirror-lines {
        padding: 0px;
    }

    div.hr:focus {
        cursor: none;
    }

    #write pre {
        white-space: pre-wrap;
    }

    #write.fences-no-line-wrapping pre {
        white-space: pre;
    }

    #write pre.ty-contain-cm {
        white-space: normal;
    }

    .CodeMirror-gutters {
        margin-right: 4px;
    }

    .md-fences {
        font-size: 0.9rem;
        display: block;
        break-inside: avoid;
        text-align: left;
        overflow: visible;
        white-space: pre;
        background: inherit;
        position: relative !important;
    }

    .md-diagram-panel {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        padding-top: 0px;
        padding-bottom: 8px;
        overflow-x: auto;
    }

    #write .md-fences.mock-cm {
        white-space: pre-wrap;
    }

    .md-fences.md-fences-with-lineno {
        padding-left: 0px;
    }

    #write.fences-no-line-wrapping .md-fences.mock-cm {
        white-space: pre;
        overflow-x: auto;
    }

    .md-fences.mock-cm.md-fences-with-lineno {
        padding-left: 8px;
    }

    .CodeMirror-line,
    twitterwidget {
        break-inside: avoid;
    }

    .footnotes {
        opacity: 0.8;
        font-size: 0.9rem;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .footnotes + .footnotes {
        margin-top: 0px;
    }

    .md-reset {
        margin: 0px;
        padding: 0px;
        border: 0px;
        outline: 0px;
        vertical-align: top;
        background: 0px 0px;
        text-decoration: none;
        text-shadow: none;
        float: none;
        position: static;
        width: auto;
        height: auto;
        white-space: nowrap;
        cursor: inherit;
        -webkit-tap-highlight-color: transparent;
        line-height: normal;
        font-weight: 400;
        text-align: left;
        box-sizing: content-box;
        direction: ltr;
    }

    li div {
        padding-top: 0px;
    }

    blockquote {
        margin: 1rem 0px;
    }

    li .mathjax-block,
    li p {
        margin: 0.5rem 0px;
    }

    li {
        margin: 0px;
        position: relative;
    }

    blockquote > :last-child {
        margin-bottom: 0px;
    }

    blockquote > :first-child,
    li > :first-child {
        margin-top: 0px;
    }

    .footnotes-area {
        color: rgb(136, 136, 136);
        margin-top: 0.714rem;
        padding-bottom: 0.143rem;
        white-space: normal;
    }

    #write .footnote-line {
        white-space: pre-wrap;
    }

    @media print {

        body,
        html {
            border: 1px solid transparent;
            height: 99%;
            break-after: avoid;
            break-before: avoid;
        }

        #write {
            margin-top: 0px;
            padding-top: 0px;
            border-color: transparent !important;
        }

        .typora-export * {
            -webkit-print-color-adjust: exact;
        }

        html.blink-to-pdf {
            font-size: 13px;
        }

        .typora-export #write {
            padding-left: 32px;
            padding-right: 32px;
            padding-bottom: 0px;
            break-after: avoid;
        }

        .typora-export #write::after {
            height: 0px;
        }
    }

    .footnote-line {
        margin-top: 0.714em;
        font-size: 0.7em;
    }

    a img,
    img a {
        cursor: pointer;
    }

    pre.md-meta-block {
        font-size: 0.8rem;
        min-height: 0.8rem;
        white-space: pre-wrap;
        background: rgb(204, 204, 204);
        display: block;
        overflow-x: hidden;
    }

    p > .md-image:only-child:not(.md-img-error) img,
    p > img:only-child {
        display: block;
        margin: auto;
    }

    p > .md-image:only-child {
        display: inline-block;
        width: 100%;
    }

    #write .MathJax_Display {
        margin: 0.8em 0px 0px;
    }

    .md-math-block {
        width: 100%;
    }

    .md-math-block:not(:empty)::after {
        display: none;
    }

    [contenteditable="true"]:active,
    [contenteditable="true"]:focus {
        outline: 0px;
        box-shadow: none;
    }

    .md-task-list-item {
        position: relative;
        list-style-type: none;
    }

    .task-list-item.md-task-list-item {
        padding-left: 0px;
    }

    .md-task-list-item > input {
        position: absolute;
        top: 0px;
        left: 0px;
        margin-left: -1.2em;
        margin-top: calc(1em - 10px);
        border: none;
    }

    .math {
        font-size: 1rem;
    }

    .md-toc {
        min-height: 3.58rem;
        position: relative;
        font-size: 0.9rem;
        border-radius: 10px;
    }

    .md-toc-content {
        position: relative;
        margin-left: 0px;
    }

    .md-toc-content::after,
    .md-toc::after {
        display: none;
    }

    .md-toc-item {
        display: block;
        color: rgb(65, 131, 196);
    }

    .md-toc-item a {
        text-decoration: none;
    }

    .md-toc-inner:hover {
        text-decoration: underline;
    }

    .md-toc-inner {
        display: inline-block;
        cursor: pointer;
    }

    .md-toc-h1 .md-toc-inner {
        margin-left: 0px;
        font-weight: 700;
    }

    .md-toc-h2 .md-toc-inner {
        margin-left: 2em;
    }

    .md-toc-h3 .md-toc-inner {
        margin-left: 4em;
    }

    .md-toc-h4 .md-toc-inner {
        margin-left: 6em;
    }

    .md-toc-h5 .md-toc-inner {
        margin-left: 8em;
    }

    .md-toc-h6 .md-toc-inner {
        margin-left: 10em;
    }

    @media screen and (max-width: 48em) {
        .md-toc-h3 .md-toc-inner {
            margin-left: 3.5em;
        }

        .md-toc-h4 .md-toc-inner {
            margin-left: 5em;
        }

        .md-toc-h5 .md-toc-inner {
            margin-left: 6.5em;
        }

        .md-toc-h6 .md-toc-inner {
            margin-left: 8em;
        }
    }

    a.md-toc-inner {
        font-size: inherit;
        font-style: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    .footnote-line a:not(.reversefootnote) {
        color: inherit;
    }

    .md-attr {
        display: none;
    }

    .md-fn-count::after {
        content: ".";
    }

    code,
    pre,
    samp,
    tt {
        font-family: var(--monospace);
    }

    kbd {
        margin: 0px 0.1em;
        padding: 0.1em 0.6em;
        font-size: 0.8em;
        color: rgb(36, 39, 41);
        background: rgb(255, 255, 255);
        border: 1px solid rgb(173, 179, 185);
        border-radius: 3px;
        box-shadow: rgba(12, 13, 14, 0.2) 0px 1px 0px, rgb(255, 255, 255) 0px 0px 0px 2px inset;
        white-space: nowrap;
        vertical-align: middle;
    }

    .md-comment {
        color: rgb(162, 127, 3);
        opacity: 0.8;
        font-family: var(--monospace);
    }

    code {
        text-align: left;
        vertical-align: initial;
    }

    a.md-print-anchor {
        white-space: pre !important;
        border-width: initial !important;
        border-style: none !important;
        border-color: initial !important;
        display: inline-block !important;
        position: absolute !important;
        width: 1px !important;
        right: 0px !important;
        outline: 0px !important;
        background: 0px 0px !important;
        text-decoration: initial !important;
        text-shadow: initial !important;
    }

    .md-inline-math .MathJax_SVG .noError {
        display: none !important;
    }

    .html-for-mac .inline-math-svg .MathJax_SVG {
        vertical-align: 0.2px;
    }

    .md-math-block .MathJax_SVG_Display {
        text-align: center;
        margin: 0px;
        position: relative;
        text-indent: 0px;
        max-width: none;
        max-height: none;
        min-height: 0px;
        min-width: 100%;
        width: auto;
        overflow-y: hidden;
        display: block !important;
    }

    .MathJax_SVG_Display,
    .md-inline-math .MathJax_SVG_Display {
        width: auto;
        margin: inherit;
        display: inline-block !important;
    }

    .MathJax_SVG .MJX-monospace {
        font-family: var(--monospace);
    }

    .MathJax_SVG .MJX-sans-serif {
        font-family: sans-serif;
    }

    .MathJax_SVG {
        display: inline;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        zoom: 90%;
        text-indent: 0px;
        text-align: left;
        text-transform: none;
        letter-spacing: normal;
        word-spacing: normal;
        overflow-wrap: normal;
        white-space: nowrap;
        float: none;
        direction: ltr;
        max-width: none;
        max-height: none;
        min-width: 0px;
        min-height: 0px;
        border: 0px;
        padding: 0px;
        margin: 0px;
    }

    .MathJax_SVG * {
        transition: none 0s ease 0s;
    }

    .MathJax_SVG_Display svg {
        vertical-align: middle !important;
        margin-bottom: 0px !important;
        margin-top: 0px !important;
    }

    .os-windows.monocolor-emoji .md-emoji {
        font-family: "Segoe UI Symbol", sans-serif;
    }

    .md-diagram-panel > svg {
        max-width: 100%;
    }

    [lang="mermaid"] svg,
    [lang="flow"] svg {
        max-width: 100%;
        height: auto;
    }

    [lang="mermaid"] .node text {
        font-size: 1rem;
    }

    table tr th {
        border-bottom: 0px;
    }

    video {
        max-width: 100%;
        display: block;
        margin: 0px auto;
    }

    iframe {
        max-width: 100%;
        width: 100%;
        border: none;
    }

    .highlight td,
    .highlight tr {
        border: 0px;
    }

    svg[id^="mermaidChart"] {
        line-height: 1em;
    }


    :root {
        --side-bar-bg-color: #fafafa;
        --control-text-color: #777;
    }

    html {
        font-size: 16px;
    }

    body {
        font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: rgb(51, 51, 51);
        line-height: 1.6;
    }

    #write {
        max-width: 860px;
        margin: 0px auto;
        padding: 30px 30px 100px;
    }

    #write > ul:first-child,
    #write > ol:first-child {
        margin-top: 30px;
    }

    a {
        color: rgb(65, 131, 196);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
        line-height: 1.4;
        cursor: text;
    }

    h1:hover a.anchor,
    h2:hover a.anchor,
    h3:hover a.anchor,
    h4:hover a.anchor,
    h5:hover a.anchor,
    h6:hover a.anchor {
        text-decoration: none;
    }

    h1 tt,
    h1 code {
        font-size: inherit;
    }

    h2 tt,
    h2 code {
        font-size: inherit;
    }

    h3 tt,
    h3 code {
        font-size: inherit;
    }

    h4 tt,
    h4 code {
        font-size: inherit;
    }

    h5 tt,
    h5 code {
        font-size: inherit;
    }

    h6 tt,
    h6 code {
        font-size: inherit;
    }

    h1 {
        padding-bottom: 0.3em;
        font-size: 2.25em;
        line-height: 1.2;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    h2 {
        padding-bottom: 0.3em;
        font-size: 1.75em;
        line-height: 1.225;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    h3 {
        font-size: 1.5em;
        line-height: 1.43;
    }

    h4 {
        font-size: 1.25em;
    }

    h5 {
        font-size: 1em;
    }

    h6 {
        font-size: 1em;
        color: rgb(119, 119, 119);
    }

    p,
    blockquote,
    ul,
    ol,
    dl,
    table {
        margin: 0.8em 0px;
    }

    li > ol,
    li > ul {
        margin: 0px;
    }

    hr {
        height: 2px;
        padding: 0px;
        margin: 16px 0px;
        background-color: rgb(231, 231, 231);
        border: 0px none;
        overflow: hidden;
        box-sizing: content-box;
    }

    li p.first {
        display: inline-block;
    }

    ul,
    ol {
        padding-left: 30px;
    }

    ul:first-child,
    ol:first-child {
        margin-top: 0px;
    }

    ul:last-child,
    ol:last-child {
        margin-bottom: 0px;
    }

    blockquote {
        border-left: 4px solid rgb(223, 226, 229);
        padding: 0px 15px;
        color: rgb(119, 119, 119);
    }

    blockquote blockquote {
        padding-right: 0px;
    }

    table {
        padding: 0px;
        word-break: initial;
    }

    table tr {
        border-top: 1px solid rgb(223, 226, 229);
        margin: 0px;
        padding: 0px;
    }

    table tr:nth-child(2n),
    thead {
        background-color: rgb(248, 248, 248);
    }

    table tr th {
        font-weight: bold;
        border-width: 1px 1px 0px;
        border-top-style: solid;
        border-right-style: solid;
        border-left-style: solid;
        border-top-color: rgb(223, 226, 229);
        border-right-color: rgb(223, 226, 229);
        border-left-color: rgb(223, 226, 229);
        border-image: initial;
        border-bottom-style: initial;
        border-bottom-color: initial;
        margin: 0px;
        padding: 6px 13px;
    }

    table tr td {
        border: 1px solid rgb(223, 226, 229);
        margin: 0px;
        padding: 6px 13px;
    }

    table tr th:first-child,
    table tr td:first-child {
        margin-top: 0px;
    }

    table tr th:last-child,
    table tr td:last-child {
        margin-bottom: 0px;
    }

    .CodeMirror-lines {
        padding-left: 4px;
    }

    .code-tooltip {
        box-shadow: rgba(0, 28, 36, 0.3) 0px 1px 1px 0px;
        border-top: 1px solid rgb(238, 242, 242);
    }

    .md-fences,
    code,
    tt {
        border: 1px solid rgb(231, 234, 237);
        background-color: rgb(248, 248, 248);
        border-radius: 3px;
        padding: 2px 4px 0px;
        font-size: 0.9em;
    }

    code {
        background-color: rgb(243, 244, 244);
        padding: 0px 2px;
    }

    .md-fences {
        margin-bottom: 15px;
        margin-top: 15px;
        padding-top: 8px;
        padding-bottom: 6px;
    }

    .md-task-list-item > input {
        margin-left: -1.3em;
    }

    @media print {
        html {
            font-size: 13px;
        }

        table,
        pre {
            break-inside: avoid;
        }

        pre {
            overflow-wrap: break-word;
        }
    }

    .md-fences {
        background-color: rgb(248, 248, 248);
    }

    #write pre.md-meta-block {
        padding: 1rem;
        font-size: 85%;
        line-height: 1.45;
        background-color: rgb(247, 247, 247);
        border: 0px;
        border-radius: 3px;
        color: rgb(119, 119, 119);
        margin-top: 0px !important;
    }

    .mathjax-block > .code-tooltip {
        bottom: 0.375rem;
    }

    .md-mathjax-midline {
        background: rgb(250, 250, 250);
    }

    #write > h3.md-focus::before {
        left: -1.5625rem;
        top: 0.375rem;
    }

    #write > h4.md-focus::before {
        left: -1.5625rem;
        top: 0.285714rem;
    }

    #write > h5.md-focus::before {
        left: -1.5625rem;
        top: 0.285714rem;
    }

    #write > h6.md-focus::before {
        left: -1.5625rem;
        top: 0.285714rem;
    }

    .md-image > .md-meta {
        border-radius: 3px;
        padding: 2px 0px 0px 4px;
        font-size: 0.9em;
        color: inherit;
    }

    .md-tag {
        color: rgb(167, 167, 167);
        opacity: 1;
    }

    .md-toc {
        margin-top: 20px;
        padding-bottom: 20px;
    }

    .sidebar-tabs {
        border-bottom: none;
    }

    #typora-quick-open {
        border: 1px solid rgb(221, 221, 221);
        background-color: rgb(248, 248, 248);
    }

    #typora-quick-open-item {
        background-color: rgb(250, 250, 250);
        border-color: rgb(254, 254, 254) rgb(229, 229, 229) rgb(229, 229, 229) rgb(238, 238, 238);
        border-style: solid;
        border-width: 1px;
    }

    .on-focus-mode blockquote {
        border-left-color: rgba(85, 85, 85, 0.12);
    }

    header,
    .context-menu,
    .megamenu-content,
    footer {
        font-family: "Segoe UI", Arial, sans-serif;
    }

    .file-node-content:hover .file-node-icon,
    .file-node-content:hover .file-node-open-state {
        visibility: visible;
    }

    .mac-seamless-mode #typora-sidebar {
        background-color: var(--side-bar-bg-color);
    }

    .md-lang {
        color: rgb(180, 101, 77);
    }

    .html-for-mac .context-menu {
        --item-hover-bg-color: #E6F0FE;
    }

    #md-notification .btn {
        border: 0px;
    }

    .dropdown-menu .divider {
        border-color: rgb(229, 229, 229);
    }

    .ty-preferences .window-content {
        background-color: rgb(250, 250, 250);
    }

    .ty-preferences .nav-group-item.active {
        color: white;
        background: rgb(153, 153, 153);
    }

    .typora-export li,
    .typora-export p,
    .typora-export,
    .footnote-line {
        white-space: normal;
    }
</style>