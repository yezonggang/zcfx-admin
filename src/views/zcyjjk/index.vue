<template>
  <select-layout slot :rightShow="true" :rightStyle="9">
    <span slot="title" class="zc-title">预警监控</span>
    <span slot="describe">各类预警信息综合展示</span>

    <el-col slot="left" :span="16">
      <el-card style="min-height: calc(100vh - 130px);">
      <el-tabs>
        <el-tab-pane>
          <span slot="label">黑名单预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form :model="hmdyj.query" ref="hmdyjQuery" :inline="true">
                <el-form-item label="预警主体:" prop="name">
                  <el-input
                    size="medium"
                    type="text"
                    placeholder=""
                    v-model="hmdyj.query.name"
                    @keyup.enter.native="getList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="年份:" prop="year">
                  <el-date-picker
                    v-model="hmdyj.query.year"
                    value-format="yyyy"
                    @change="getHmdyjList()"
                    type="year"
                    style="width:140px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getHmdyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('hmdyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="hmdyj.listLoading"
              :data="hmdyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="100" label="主体代码">
                <template slot-scope="scope">
                  <span>{{ scope.row.ztdm }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="140" label="主体名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.ztmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="40" label="年份">
                <template slot-scope="scope">
                  <span>{{ scope.row.nf }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="60" label="起始时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.qssj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="60" label="截止时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.jzsj | dateFormat }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="hmdyj.total > 0"
              :total="hmdyj.total"
              :page.sync="hmdyj.query.page"
              :limit.sync="hmdyj.query.limit"
              @pagination="getHmdyjList(false)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" >报名预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form
                :model="bmyj.query"
                ref="bmyjQuery"
                :inline="true"
                size="medium"
              >
                <el-form-item label="项目名称:" prop="xmmc">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="bmyj.query.xmmc"
                    style="width:120px"
                    @keyup.enter.native="getBmyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="异常主体:" prop="yczt">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="bmyj.query.yczt"
                    style="width:120px"
                    @keyup.enter.native="getBmyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开标时间:" prop="kbsj">
                  <el-date-picker
                    style="width: 140px"
                    v-model="bmyj.query.kbsj"
                    value-format="yyyyMMdd"
                    @change="getBmyjList()"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="异常类型:" prop="px">
                  <el-select v-model="bmyj.query.px" style="width: 120px">
                    <el-option
                      label="缴费人一致"
                      value="缴费人一致"
                    ></el-option>
                    <el-option
                      label="联系电话一致"
                      value="联系电话一致"
                    ></el-option>
                    <el-option
                      label="IP地址一致"
                      value="IP地址一致"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getBmyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('bmyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="bmyj.listLoading"
              :data="bmyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="180" label="项目名称">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="开标时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" label="异常主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yczt">{{ scope.row.yczt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" label="冲突主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.ctzt">{{ scope.row.ctzt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="100" label="异常类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.px }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="100" label="异常内容">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yc">{{ scope.row.yc }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="bmyj.total > 0"
              :total="bmyj.total"
              :page.sync="bmyj.query.page"
              :limit.sync="bmyj.query.limit"
              @pagination="getBmyjList(false)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" >投标预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form
                :model="tbyj.query"
                ref="tbyjQuery"
                :inline="true"
                size="medium"
              >
                <el-form-item label="项目名称:" prop="xmmc">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="tbyj.query.xmmc"
                    style="width:120px"
                    @keyup.enter.native="getTbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="异常主体:" prop="yczt">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="tbyj.query.yczt"
                    style="width:120px"
                    @keyup.enter.native="getTbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开标时间:" prop="kbsj">
                  <el-date-picker
                    style="width: 140px"
                    v-model="tbyj.query.kbsj"
                    value-format="yyyyMMdd"
                    @change="getTbyjList()"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="异常类型:" prop="px">
                  <el-select v-model="tbyj.query.px" style="width: 120px">
                    <el-option
                      label="机器码一致"
                      value="机器码一致"
                    ></el-option>
                    <el-option
                      label="IP地址一致"
                      value="IP地址一致"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getTbyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('tbyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="tbyj.listLoading"
              :data="tbyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="180" label="项目名称">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="开标时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="130" label="异常主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yczt">{{ scope.row.yczt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="130" label="冲突主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.ctzt">{{ scope.row.ctzt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="异常类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.px }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="110" label="异常内容">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yc">{{ scope.row.yc }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="tbyj.total > 0"
              :total="tbyj.total"
              :page.sync="tbyj.query.page"
              :limit.sync="tbyj.query.limit"
              @pagination="getTbyjList(false)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" >评标预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form
                :model="pbyj.query"
                ref="pbyjQuery"
                :inline="true"
                size="medium"
              >
                <el-form-item label="项目名称:" prop="xmmc">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="pbyj.query.xmmc"
                    @keyup.enter.native="getPbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="异常主体:" prop="yczt">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="pbyj.query.yczt"
                    @keyup.enter.native="getPbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开标时间:" prop="kbsj">
                  <el-date-picker
                    style="width: 140px"
                    v-model="pbyj.query.kbsj"
                    value-format="yyyyMMdd"
                    @change="getPbyjList()"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getPbyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('pbyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="pbyj.listLoading"
              :data="pbyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="280" label="项目名称">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="开标时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="60" label="异常主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yczt">{{ scope.row.yczt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" label="异常类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.px }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="100" label="异常内容">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yc">{{ scope.row.yc }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="pbyj.total > 0"
              :total="pbyj.total"
              :page.sync="pbyj.query.page"
              :limit.sync="pbyj.query.limit"
              @pagination="getPbyjList(false)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" >定标预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form
                :model="dbyj.query"
                ref="dbyjQuery"
                :inline="true"
                size="medium"
              >
                <el-form-item label="项目名称:" prop="xmmc">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="dbyj.query.xmmc"
                    @keyup.enter.native="getDbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="异常主体:" prop="yczt">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="dbyj.query.yczt"
                    @keyup.enter.native="getDbyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开标时间:" prop="kbsj">
                  <el-date-picker
                    style="width: 140px"
                    v-model="dbyj.query.kbsj"
                    value-format="yyyyMMdd"
                    @change="getDbyjList()"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getDbyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('dbyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="dbyj.listLoading"
              :data="dbyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="280" label="项目名称">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="开标时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="异常主体">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yczt">{{ scope.row.yczt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" label="异常类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.px }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="100" label="异常内容">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yc">{{ scope.row.yc }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="dbyj.total > 0"
              :total="dbyj.total"
              :page.sync="dbyj.query.page"
              :limit.sync="dbyj.query.limit"
              @pagination="getDbyjList(false)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" >合同预警</span>
          <div class="grid-content ">
            <div>
              <span></span>
            </div>
            <div>
              <el-form
                :model="htyj.query"
                :inline="true"
                ref="htyjQuery"
                size="medium"
              >
                <el-form-item label="项目名称:" prop="xmmc">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="htyj.query.xmmc"
                    @keyup.enter.native="getHtyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="异常主体:" prop="yczt">
                  <el-input
                    type="text"
                    placeholder=""
                    v-model="htyj.query.yczt"
                    @keyup.enter.native="getHtyjList()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开标时间:" prop="kbsj">
                  <el-date-picker
                    style="width: 140px"
                    v-model="htyj.query.kbsj"
                    value-format="yyyyMMdd"
                    @change="getHtyjList()"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="zc-mb-10"
                    icon="el-icon-search"
                    @click="getHtyjList()"
                    >查询</el-button
                  >
                  <el-button class="zc-mb-10" icon="el-icon-refresh-right" @click="resetForm('htyjQuery')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <el-table
              slot="resultList"
              v-loading="htyj.listLoading"
              :data="htyj.list"
              :header-cell-style="{
                color: '#808080',
                fontWeight: 'normal',
              }"
              border
              fit
              :stripe="true"
              highlight-current-row
            >
              <el-table-column align="left" min-width="180" label="项目名称">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="60" label="开标时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.kbsj | dateFormat }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="180" label="异常主体">
                <template slot-scope="scope">
                  <span>{{ scope.row.yczt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="异常类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.px }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="80" label="异常内容">
                <template slot-scope="scope">
                  <span class="zc-table-span" :title="scope.row.yc">{{ scope.row.yc }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="htyj.total > 0"
              :total="htyj.total"
              :page.sync="htyj.query.page"
              :limit.sync="htyj.query.limit"
              @pagination="getHtyjList(false)"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
          </el-card>

    </el-col>
    <el-col slot="right" :span="8">
      <el-card style="height: 100%">
        <div class="grid-content ">
          <div>
            <span><svg-icon icon-class="yun" />&nbsp;&nbsp;预警状况概览</span>
            <el-divider></el-divider>
          </div>
          <div class="zc-chart-container">
            <Pie
              slot="chart1"
              id="pie"
              :option="pie"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </el-card>
    </el-col>
  </select-layout>
</template>
<script>
// 查询列表页layout
import SelectLayout from "../zcztgl/components/SelectLayout";
// api数据
import { fetchHmdyjList, fetchBmyjList, fetchTbyjList, fetchPbyjList, fetchDbyjList, fetchHtyjList, fetchYjzkgl } from "@/api/zcztgl";
// 分页插件
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
// echarts 支持
import Wordcloud from "../zcztgl/components/Wordcloud";
import Pie from "../zcztgl/components/Pie";
import { Random } from "mockjs";
import { isNotEmpty } from "@/utils/index";
export default {
  name: "zclcyj",
  components: {
    Pagination,
    Wordcloud,
    Pie,
    SelectLayout,
  },
  filters: {
    dateFormat(date) {
      if(date==null){
        return "暂无数据";
      }
      date = date + "";
      return (
        date.substring(0, 4) +
        "-" +
        date.substring(4, 6) +
        "-" +
        date.substring(6, 8)
      );
    },
  },
  data() {
    return {
      hmdyj: {
        listLoading: true,
        query: {
          name: "",
          year: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      bmyj: {
        listLoading: true,
        query: {
          xmmc: "",
          yczt: "",
          kbsj: "",
          px: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      tbyj: {
        listLoading: true,
        query: {
          xmmc: "",
          yczt: "",
          kbsj: "",
          px: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      pbyj: {
        listLoading: true,
        query: {
          xmmc: "",
          yczt: "",
          kbsj: "",
          px: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      dbyj: {
        listLoading: true,
        query: {
          xmmc: "",
          yczt: "",
          kbsj: "",
          px: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      htyj: {
        listLoading: true,
        query: {
          xmmc: "",
          yczt: "",
          kbsj: "",
          px: "",
          page: 1,
          limit: 10,
        },
        list: null,
        total: 0,
      },
      pie: {
        color: [
          "#705fe2",
          "#dfaaee",
          "#f65880",
          "#fc8b6c",
          "#fdd44f",
          "#2f90cf",
        ],
        tooltip: {
          // show:false,
          trigger: "item",
        },
        legend: [
          {
            orient: "vertical",
            bottom: 0,
            left: "16%",
            data: [],
          },
          {
            orient: "vertical",
            bottom: "0",
            left: "50%",
            data: [],
          },
        ],
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            roseType: "area",
            radius: ["25%", "90%"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
              length: 0,
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
      leftStyle: 15,
    };
  },
  created() {
    this.getHmdyjList();
    this.getBmyjList()
    this.getTbyjList()
    this.getPbyjList()
    this.getDbyjList()
    this.getHtyjList()
    this.getPie();
  },
  methods: {
    resetForm(refName) {
      this.$refs[refName].resetFields();
    },
    getHmdyjList(status) {
      if(status===undefined){
				this.hmdyj.query.page=1
			}
      this.hmdyj.listLoading = true;
      fetchHmdyjList(this.hmdyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.hmdyj.list = response.data;
          this.hmdyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.hmdyj.listLoading = false;
      });
    },
    getBmyjList(status) {
      if(status===undefined){
				this.bmyj.query.page=1
			}
      this.bmyj.listLoading = true;
      fetchBmyjList(this.bmyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.bmyj.list = response.data;
          this.bmyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.bmyj.listLoading = false;
      });
    },
    getTbyjList(status) {
      if(status===undefined){
				this.tbyj.query.page=1
			}
      this.tbyj.listLoading = true;
      fetchTbyjList(this.tbyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.tbyj.list = response.data;
          this.tbyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.tbyj.listLoading = false;
      });
    },
    getPbyjList(status) {
      if(status===undefined){
				this.pbyj.query.page=1
			}
      this.pbyj.listLoading = true;
      fetchPbyjList(this.pbyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.pbyj.list = response.data;
          this.pbyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.pbyj.listLoading = false;
      });
    },
    getDbyjList(status) {
      if(status===undefined){
				this.dbyj.query.page=1
			}
      this.dbyj.listLoading = true;
      fetchDbyjList(this.dbyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.dbyj.list = response.data;
          this.dbyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.dbyj.listLoading = false;
      });
    },
    getHtyjList(status) {
      if(status===undefined){
				this.htyj.query.page=1
			}
      this.htyj.listLoading = true;
      fetchHtyjList(this.htyj.query).then((response) => {
        if (response.data) {
          if (!Array.isArray(response.data)) response.data = [response.data];
          this.htyj.list = response.data;
          this.htyj.total = response.pageInfo.totalCount;
        }else{
          this.$message.error('没有查询到结果')
        }
        this.htyj.listLoading = false;
      });
    },
    getPie() {
      fetchYjzkgl().then((response) => {
        if (response) {
          const number = Math.round(response[0].value * 0.5); //获取最大值,计算放大数
          let legendData = [];
          for (const key in response) {
            legendData.push(response[key].name);
            var obj = response[key];
            obj.value += number; //所有数据放大
            this.pie.series[0].data.push(obj);
          }

          this.pie.legend[0].data = legendData.slice(3, legendData.length);
          this.pie.legend[1].data = legendData.slice(0, 3);
          //设置图例展示时还原数值
          this.pie.tooltip.formatter = function (param) {
            return param.marker + param.name;
          };
          //设置lable还原数值
          this.pie.series[0].label.formatter = function (param) {
            // return param.value - number + "个";
            return param.name;
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

  },
};
</script>

<style  type="text/css" scoped>
.zc-chart-container {
  position: relative;
  width: 100%;
  height: 600px;
  padding-top: 60px;
}

.el-form{
  padding: 0 10px;
}


.el-tabs >>> div.el-tabs__content {
  padding: 0;
}
.el-tabs >>> .el-tabs__nav-wrap::after{
  content:none
}
.el-tabs >>> .el-tabs__active-bar{
  display: none;
}
.el-tabs >>> .el-tabs__nav-scroll {
  padding: 12px 20px;
}
.el-tabs >>> .el-tabs__item{
  font-size: 18px;
}
.el-tabs >>> .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}
.el-tabs >>> .el-tabs__item.is-top:last-child {
  padding-right: 20px;
}
.el-tabs >>> .el-tabs__item.is-active {
  color: #fff;
  background-color: #34a6e8;
  border-radius: 20px;
}
.el-tabs >>> .el-tabs__item.is-active::after {
  content:"";
  position:absolute;
  z-index:-1;
  bottom: 2px;
  left: 16%;
  width: 66%;
  height: 20%;
  box-shadow: 0 5px 10px #34a6e8;

}
</style>
