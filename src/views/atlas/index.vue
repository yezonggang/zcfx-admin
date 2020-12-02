<template>
  <div class="kgWidget">
    <!-- 这里是搜索条件框 -->
    <div class="kgHead">
      <el-tabs type="border-card">
        <el-tab-pane label="路径查询">
          <el-form :model="query" :rules="rules" ref="ruleForm1">
          <el-form-item prop="node1">
            <el-autocomplete
              style="width:100%"
              v-model="query.node1"
              :fetch-suggestions="querySearchNode"
              placeholder="请输入节点1名称"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="node2">
            <el-autocomplete
              style="width:100%"
              v-model="query.node2"
              :fetch-suggestions="querySearchNode"
              placeholder="请输入节点2名称"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="preQuery(1)" >查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="resetForm('ruleForm1')">重置</el-button>
          </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="最短路径">
          <el-form :model="query" :rules="rules" ref="ruleForm2">
          <el-form-item prop="node1">
            <el-autocomplete
              style="width:100%"
              v-model="query.node1"
              :fetch-suggestions="querySearchNode"
              placeholder="请输入节点1名称"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="node2">
            <el-autocomplete
              style="width:100%"
              v-model="query.node2"
              :fetch-suggestions="querySearchNode"
              placeholder="请输入节点2名称"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="preQuery(2)">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="节点查询">
            <el-autocomplete
              style="width:100%"
              v-model="query.node"
              :fetch-suggestions="querySearchNode"
              placeholder="请输入节点名称"
              :trigger-on-focus="false"
              @select="preQuery(3)"
            ></el-autocomplete>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 这里是关系图展示区域 -->
    <Visualization @clickNode="handleClickNode" :records="records" :clearAll="clearAll"></Visualization>
  </div>
</template>
<script type="text/ecmascript-6">
  import "font-awesome/css/font-awesome.css"
  import { Visualization } from '@/components/D3Visualization'
  import { v1 as neo4j } from 'neo4j-driver/lib/browser/neo4j-web.min.js'
  import setting from '@/settings'
  

  export default {
    name: 'atlas',
    components: {
      Visualization
    },
    data() {
      return {
        defaultQuery: 'MATCH p=()-[r]->() RETURN p LIMIT 200',
        records: [],
        clearAll: false,
        query:{
          node1:'',
          node2:'',
          node:''
        },
        rules: {
          node1: [
            { required: true, message: '请输入节点名称', trigger: 'change' },
          ],
          node2: [
            { required: true, message: '请输入节点名称', trigger: 'change' },
          ],
        }
      }
    },
    mounted() {
      //初始化数据库连接
      this.driver = neo4j.driver(setting.neo4jUrl, neo4j.auth.basic(setting.neo4jUserName, setting.neo4jPassword));
      //执行默认查询方法
      this.executeQuery(this.defaultQuery);
    },
    methods: {
      //清空当前form框
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //名称补全查询
      querySearchNode(queryString, cb) {
        var session = this.driver.session();
        //模糊查询所有节点name属性包含输入字符串的
        let query = "match(n) where n.name=~'.*"+queryString+".*' return distinct n.name";
        if (query == '') {
          cb([])
        }else{
          session.run(query, {}).then(function (result) {
            //转换为提示框需要的数据格式
            let data = result.records.map((cur)=>{
              return {value:cur._fields[0]}
            })
            session.close();
            cb(data);
          }).catch(function (error) {
            console.log('查询语句不合法');
          });
        }
      },
      handleClickNode(item) {
      },
      //根据类型拼装不同的查询语句
      preQuery(type){
        let cql=null
        switch(type){
          case 1:
            this.$refs['ruleForm1'].validate((valid) => {
              if (valid)
                //查询节点n1->n2之间最多有五层关系
                cql='match p=(n1)-[*..5]-(n2) where n1.name="'+this.query.node1+'" and n2.name="'+this.query.node2+'" return p limit 25'
            });
            break;
          case 2:
            this.$refs['ruleForm2'].validate((valid) => {
              if(valid)
                //这里加上allshortestpaths作用是返回最短的路径
                cql='match p=allshortestpaths((n1)-[*..5]-(n2)) where n1.name="'+this.query.node1+'" and n2.name="'+this.query.node2+'" return p limit 25'
            });
            break;
          case 3:
            //只查询一个节点和与它相连的节点
            cql='match p=(n)-[r]-() where n.name="'+this.query.node+'" return p limit 25'
            break;
          default: 
            cql=this.defaultQuery
            break;
        }
        if(cql==null)return;
        this.executeQuery(cql);
      },
      //查询方法
      executeQuery(query) {
        //开启一个全屏的蒙版加载
        const loading = this.$loading({
          lock: true,
          text: '查询中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let me = this;
        me.records = [];
        me.clearAll = true;
        var session = this.driver.session();
        session.run(query, {}).then(function (result) {
          if(result.records.length>0){
            me.clearAll = false;
            me.records = result.records;
          }else{
            me.$message({
              message: '没有查到数据',
              type: 'warning'
            });
          }
          session.close();
        }).catch(function (error) {
          console.log('查询语句不合法');
        });
        //关闭蒙版
        loading.close()
      }
    },
    watch: {
      records: {
        handler: function(val, oldVal) {

        },
        deep: true
      }
    }
  }

</script>
<style scoped>
.kgHead{
  z-index: 999;
  position: absolute;
  left: 2px;
  top: 80px;
  width: 293px;
  height: 240px;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>
