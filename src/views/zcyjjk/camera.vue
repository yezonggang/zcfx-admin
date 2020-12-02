<template>
  <div>
    <section class="content">
      <Screen></Screen>
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.js"
import "admin-lte/dist/js/adminlte.js"

import Screen from './components/Screen';

import { mapState, mapActions } from "vuex"
import Vue from 'vue'

import ElementUI from "element-ui"
Vue.use(ElementUI);import VCharts from 'v-charts'
Vue.use(VCharts);

import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen);

import BackToTop from 'vue-backtotop'
Vue.use(BackToTop);

import VueResize from 'vue-resize'
Vue.use(VueResize);

Vue.prototype.$updateQueryString = (uri, key, value) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}
Vue.prototype.$iframe = (link, w, h) => {
    var _link = Vue.prototype.$updateQueryString(link, "aspect", `${w}x${h}`)
    return `<iframe src="${_link}" width="${w}" height="${h}" allowfullscreen allow="autoplay; fullscreen"></iframe>`
}
Vue.prototype.isMobile = () => {
  return videojs.browser.IS_IOS || videojs.browser.IS_ANDROID;
}
Vue.prototype.isIE = () => {
  return !!videojs.browser.IE_VERSION;
}
Vue.prototype.flvSupported = () => {
  return videojs.browser.IE_VERSION || (flvjs.getFeatureList() && flvjs.getFeatureList().mseLiveFlvPlayback);
}
Vue.prototype.canTalk = () => {
  return location.protocol.indexOf("https") == 0 || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}
Vue.prototype.hasAnyRole = (serverInfo, userInfo, ...roles) => {
    return true;
}


import $ from "jquery"
import "@penggy/jquery.nicescroll"
$.ajaxSetup({ cache: false });
export default {
  name: 'pbsjk',
  data() {
    return {
      nice: null,
    }
  },
  components: {
    Screen
  },
  methods: {
    ...mapActions(["getServerInfo", "getUserInfo"]),
  },
  async mounted() {
    await this.getServerInfo()
    await this.getUserInfo()
  },
}
</script>

<style scoped src="../../../node_modules/font-awesome/css/font-awesome.css"></style>
<style scoped src="../../../node_modules/bootstrap/dist/css/bootstrap.css"></style>
<style scoped src="../../../node_modules/admin-lte/dist/css/AdminLTE.css"></style>
<style scoped src="../../../node_modules/admin-lte/dist/css/skins/_all-skins.css"></style>
<style scoped src="../../../node_modules/vue-resize/dist/vue-resize.css"></style>

<style lang="less" scoped>
.content-wrapper, .right-side, .main-footer {
  transition: none;
}
</style>

<style lang="less" scoped>
.vue-back-to-top {
  background-color: transparent;
  left: 30px;
  bottom: 10px;
}
.sidebar-collapse .vue-back-to-top {
  display: none;
}
</style>


