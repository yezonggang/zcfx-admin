<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'
  import indexDashboard from './index/index.vue'

  export default {
    name: 'Dashboard',
    components: {adminDashboard, editorDashboard, indexDashboard},
    data() {
      return {
        currentRole: 'indexDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      // 目前这块所有登录用户当前角色都跳转至index.vue
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editorDashboard'
      // }
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'indexDashboard'
      // }
    }
  }
</script>
