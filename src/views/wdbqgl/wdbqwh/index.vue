<template>
    <div>
        <select-layout slot :rightShow="false" :leftStyle="leftStyle">
            <span slot="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;文档标签维护</span>
            <div slot="conditional" class="zc-conditional">
                <el-form :model="listQuery"  ref="listQuery" :inline="true">
                    <el-form-item label="文档名称:" prop="wdmc">
                        <el-input
                            class="zc-wth-200 zc-mb-10"
                            size="medium"
                            type="text"
                            v-model="listQuery.wdmc"
                            placeholder=""
                            @keyup.enter.native="getList()"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="文档类别:" prop="wdlb">
                        <el-select v-model="listQuery.wdlb" style="max-width:190px">
                            <el-option
                                v-for="item in sel"
                                :key="item.type"
                                :label="item.text"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称:" prop="xmmc">
                        <el-input
                            class="zc-wth-200 zc-mb-10"
                            size="medium"
                            type="text"
                            v-model="listQuery.xmmc"
                            placeholder=""
                            @keyup.enter.native="getList()"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="开始日期:" prop="starttime">
                        <el-date-picker
                            style="width:200px"
                            v-model="listQuery.starttime"
                            type="date"
                            value-format="yyyyMMdd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期:" prop="endtime">
                        <el-date-picker
                            style="width:200px"
                            v-model="listQuery.endtime"
                            type="date"
                            value-format="yyyyMMdd"
                        ></el-date-picker>
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
                        @click="resetForm('listQuery')"
                        >重置</el-button
                    >
                    </el-form-item>
                </el-form>
            </div>
                <el-table
                    slot="resultList"
                    :data="list"
                    v-loading="listLoading"
                    border
                    fit
                    :stripe="true"
                    highlight-current-row
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <!-- <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column> -->
                    <el-table-column align="left" min-width="160" label="文档编号">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.wdid" >{{ scope.row.wdid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="160" label="文档名称">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.wdmc">{{ scope.row.wdmc }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="110" label="文档类别">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.wdlb | conventDmmc(dmmcList)  ">{{ scope.row.wdlb | conventDmmc(dmmcList)  }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="160" label="项目名称">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.xmmc" >{{ scope.row.xmmc }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="80" label="制作人">
                        <template slot-scope="scope">
                            <span>{{ scope.row.zzr }}</span>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column align="left" min-width="160" label="路径">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.path">{{ scope.row.path }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="160" label="文件名称">
                        <template slot-scope="scope">
                            <span class="zc-table-span" :title="scope.row.fjghwdid">{{ scope.row.fjghwdid }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column align="left" min-width="300" label="标签">
                        <template  slot-scope="scope"  v-if="(scope.row.bqc == null ||scope.row.bqc == ''?' ':scope.row.bqc).split(',') != ' '">
                            <el-tag
                                v-for="tag in Array.from(new Set((scope.row.bqc == ''?' ':scope.row.bqc).split(',')))"
                                :key="tag"
                                closable
                                :type="tag"
                                @close="handleClose(scope.row,tag)">
                                {{tag}}
                            </el-tag>
                            <el-button style="height: 27px;line-height: 25px;padding-top: 0;padding-bottom: 0;" 
                                size="small"
                                title="新增标签"
                                @click="showDialog(scope.row)">+</el-button>
                        </template>
                        
                    </el-table-column>
                    
                </el-table>
                <pagination
                    slot="resultList"
                    v-show="total > 0"
                    :total="total"
                    :page-sizes="[12, 20, 30, 40]"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="getList(false)"
                />
        </select-layout>
            <!-- 弹窗 -->
            <el-dialog title="新增标签" :visible.sync="dialogVisible" width="30%" >
                <!-- 级联组件 -->
                <el-cascader v-model="addBq" :show-all-levels="false" :props="props" clearable ></el-cascader>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="closeDialog(addBq)">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { isNull } from '@/utils/zcfx-filters'
// 查询列表页layout
import SelectLayout from "@/views/zcztgl/components/SelectLayout";
// 分页插件
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

import { queryAll,updateBq,queryWdbq,wdbqSelect,getdmmc } from "@/api/wdbqgl";
let id = 0;
export default {
    name: "wdbqwh",
    components:{
        SelectLayout,
        Pagination
    },
	filters: {
		statusFilter(status) {
			const statusMap = {
				published: 'success',
				draft: 'info',
				deleted: 'danger',
			}
			return statusMap[status]
		},
		e: isNull,
		conventDmmc(value, list) {
			return list.get(value+'')
		},
	},
    data(){
        return{
            multipleSelection:[],
            sel:{},
            dmmcList: new Map(),
            addBq:"",
            text:"",
            dialogVisible: false,
            total: 0,
            listLoading: true,
            bqcArray:[],
            listQuery: {
                wdmc: "",
                wdlb: "",
                xmmc: "",
                starttime:"",
                endtime:"",
                page: 1,
                limit: 12,
            },
            list:null,
            leftStyle: 24,
            listUPdate:{
                bqc:"",
                wdid:"",
            },
            props:{
                checkStrictly: true,
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level,value,isLeaf } = node;
                    if(isLeaf){
                        resolve([])
                        return;
                    }
                    if(level==0){
                        queryWdbq().then((response) => {
                            const nodes = response
                                .map(item => ({
                                    value: item.bqdm,
                                    label: item.bqmc,
                                    leaf: item.yzbz == 1
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        });
                    }else if(level>0){
                        queryWdbq({"sjbqdm":value}).then((response) => {
                            if(response){
                                const nodes = response
                                .map(item => ({
                                    value: item.bqdm,
                                    label: item.bqmc,
                                    leaf: item.yzbz == 1
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                            }
                        });
                    }
                }
            },
        }
    },
    created() {
        this.getList()
        this.getdmmcList()
	},
    methods:{
        closeDialog(addBq){
            wdbqSelect({"bqdm":addBq[addBq.length - 1]}).then((response) => {
                if(response){
                    let arr = []
                    let oldarr = []
                    let newarr = response.bqmc.split(',')
                    if(this.text.bqc != "" && this.text.bqc != null){
                        oldarr = this.text.bqc.split(',')
                    }
                    arr.push(newarr)
                    arr.push(oldarr)
                    // 合并标签
                    newarr = newarr.concat(oldarr)
                    // 标签去重
                    newarr = Array.from(new Set(newarr))
                    this.listUPdate.bqc = newarr.join(',')
                    this.listUPdate.wdid = this.text.wdid
                    updateBq(this.listUPdate).then((response) => {
                        if (response) {
                            this.$message.success('新增成功！')
                            this.addBq = ''
                            this.getList(this.listQuery.page);
                        } else {
                            this.$message.error('修改失败！！')
                        }
                    })
                }
            })
            this.dialogVisible = false
        },
        showDialog(rowdata){
            this.dialogVisible = true
            this.text = rowdata
            // console.log(this.multipleSelection)
        },
        handleSelectionChange(val) {
            this.multipleSelection=val;
            // console.log(val)
        },
        handleClose(rowdata,tag) {
          
            let arr = rowdata.bqc.split(',')
            for(let i = 0; i < arr.length;i++){
                if(arr[i]==tag){
                    arr.splice(i,1)
                }
            }
            this.listUPdate.bqc = arr.join(',')
            this.listUPdate.wdid = rowdata.wdid
            updateBq(this.listUPdate).then((response) => {
				if (response) {
                    this.$message.success('修改成功！')
                    this.addBq = ''
                    this.getList(this.listQuery.page);
				} else {
					this.$message.error('修改失败！！')
				}
			})

        },
        getList(status) {
            if(status===undefined){
				this.listQuery.page=1
			}
            if(this.listQuery.starttime <= this.listQuery.endtime
                ||this.listQuery.starttime == null || this.listQuery.endtime == null
                ||this.listQuery.starttime == ""|| this.listQuery.endtime == ""){
                this.listLoading = true
                this.listQuery.starttime = this.listQuery.starttime==null?"":this.listQuery.starttime
                this.listQuery.endtime = this.listQuery.endtime==null?"":this.listQuery.endtime
                // console.log(this.listQuery.starttime)
                // console.log(this.listQuery.endtime)
                
                queryAll(this.listQuery).then((response) => {
                    if (response.data) {
                        if (!Array.isArray(response.data))
                            response.data = [response.data]
                        this.list = response.data
                        // this.bqcArray = response.data.bqc.split(',')
                        this.total = response.pageInfo.totalCount
                        this.listQuery.limit = response.pageInfo.pageSize
                    } else {
                        this.$message.error('没有查询到结果')
                    }

                    this.listLoading = false
                })
                
            }else{

                this.$message.error('结束日期不能大于开始日期！')
            }
            
        },
        resetForm() {
            this.$refs["listQuery"].resetFields();
        },
        getdmmcList() {
			getdmmc({ table_name: 'tb_ads_bq_wdqd_day' }).then(
				(response) => {
					if (response) {
                        this.sel = response
						let map = new Map()
						for (const dm of response) {
                            map.set(dm.type, dm.text)
                          
						}
                        this.dmmcList = map
                        
					}
				}
			)
        },
        
    },

    
}
</script>
<style type="text/css" scoped>
.cell .el-tag {
    margin-right: 10px;
}
</style>