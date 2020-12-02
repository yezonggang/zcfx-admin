<template>
  <div>
    <el-dialog
      title="请选择"
      :visible.sync="dialog.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <span>
        <!-- 树  -->
        <el-tree :data="organTree" :props="defaultProps" @node-click="handleNodeClick"/>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>

  export default {
    name: 'Dialog',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      dialog: Object
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      organTree() {
        return this.$store.getters.cacheTree('LT_SYS_ORGAN')
      }
    },
    mounted() {
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      handleNodeClick(node) {
        // 设置当前选中的节点
        this.$emit('selected', node)
        this.dialog.visible = false
      }
    }
  }
</script>

<style></style>
