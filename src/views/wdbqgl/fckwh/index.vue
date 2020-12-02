<template>
  <div class="main">
    <el-card>
      <div class="title">废词库列表</div>
      <div class="search">
        <el-input v-model="inputValue" @input="remoteMethod" placeholder="请输入搜索内容"></el-input>
      </div>
      <div class="main">
        <el-tag
          size="medium"
          :key="tag"
          v-for="tag in list"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>

        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="formParams.stopWord"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="$event.target.blur"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+新增废词</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
// 请求数据
import { fckfindAll, fckAdd, fckDelete } from "@/api/wdbqgl";
import res from '@/store/modules/res';

export default {
  name: 'fckwh',
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      formParams: {
      stopWord: null,
      },
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [],
    };
  },
  created() {
    this.fckfindAll();
  },
  mounted() {
      
    },
  // computed: {
  //   listSet() {
  //     return this.states.map((item) => {
  //       return { value: `value:${item}`, label: `${item}` };
  //     });
  //   },
  // },

  methods: {
    remoteMethod() {
      let input = this.inputValue
      if (input != "") {
        var results = this.dynamicTags.filter((state) => {
            return (state.toLowerCase().indexOf(input.toLowerCase()) === 0);
          });
        this.list = results
      }else{
        this.list = this.dynamicTags
      }
    },

    //页面初始化查询
    fckfindAll() {
      this.listLoading = true;
      fckfindAll().then((response) => {
        if (response) {
          this.dynamicTags = response;
          this.list = this.dynamicTags
        }
        this.listLoading = false;
      });
    },
    //删除
    handleClose(tag) {
      this.formParams.stopWord = tag;
      fckDelete({ stopWord: this.formParams.stopWord }).then((response) => {
        if (response) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        }
        this.fckfindAll();
      });
    },
    //button切换input，同时获取焦点
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //新增
    handleInputConfirm() {
      fckAdd({ stopWord: this.formParams.stopWord }).then((response) => {
        if (response) {
          this.dynamicTags.push(stopWord);
        }
        this.fckfindAll();
      });
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>
<style  type="text/css" scoped>
.main {
  padding: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag--medium {
  margin-bottom: 10px;
}
.search{
  margin-top: 20px;
  margin-left: 30px;
  width: 13%;
}
</style>