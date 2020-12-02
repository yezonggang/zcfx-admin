<template>
  <div class="app-container">
    <iframe src="http://sjfxpt.zybtp.com/analystrunner/project" width="1920px" height="1080px"
            frameborder="0"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'projectScreen',
  }
</script>
<style lang="css" scoped>
  .app-container {
    position: relative;
    height: 960px;
  }

  iframe {
    position: absolute;
    left: -110px;
    top: -60px;
    transform: scale(0.86);
  }
</style>
