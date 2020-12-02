<template>
  <div id="app">
    <iframe style="display:none" title="autoLogin" :src="src" ></iframe>
    <el-scrollbar id="scrollbar" style="height: 100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      src: 'http://sjfxpt.zybtp.com/cas/autologin?username=admin2020&prd=977aa7b28c42d9aeed65f638e2a40e02&credentials=1594368613286&token=1598974113621'
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });

    setInterval(()=>{
        this.src='http://sjfxpt.zybtp.com/cas/autologin?username=admin2020&prd=977aa7b28c42d9aeed65f638e2a40e02&credentials=1594368613286&token=1598974113621&'+Math.random()
      }, 1000*60*30);
  },
};
</script>

<style lang="css" >
#scrollbar > .el-scrollbar__wrap {
  overflow-x: hidden;
}
img {
  vertical-align: baseline;
}
</style>
