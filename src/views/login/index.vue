<template>
  <div class="login-container">
    <video-bg :sources="['/static/bg.mp4']" img="/static/bg.png">
      <div class="logo-complete">
        <img src="@/assets/logo-complete.png" alt="中原招采网" />
      </div>
      <div class="login-main">
        <div class="login-img"></div>
        <div class="login-form">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            autocomplete="on"
            label-position="left"
            label-width="60px"
          >
            <div class="title-container">
              <h3 class="title">
                {{ $t("login.title") }}
              </h3>
              <!--        <lang-select class="set-language"/>-->
            </div>

            <el-form-item prop="username" label="账号:">
              <el-input
                ref="username"
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              >
                <svg-icon slot="prefix" icon-class="user" />
              </el-input>
            </el-form-item>

            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password" label="密码:">
                <el-input
                  :key="passwordType"
                  ref="password"
                  show-password
                  v-model="loginForm.password"
                  :type="passwordType"
                  :placeholder="$t('login.password')"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                >
                  <svg-icon slot="prefix" icon-class="password" />
                </el-input>
              </el-form-item>
            </el-tooltip>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                @click.native.prevent="handleLogin"
                style="width: 100%"
              >
                {{ $t("login.logIn") }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <div>
          版权所有：©2010-2020 &nbsp; 河南兴豫电子商务有限公司 &nbsp;
          地址：河南省郑州市农业路东段29号海特大厦5、6、7层 &nbsp; 邮编：450008
        </div>
        <div>
          <img alt="安全等保三级" title="安全等保三级" width="20" height="20" src="/static/img/djcp.png">
          安全等保三级&nbsp;
          <a href="http://cx.cnca.cn" alt="电子招标投标系统交易平台认证证书" title="电子招标投标系统交易平台认证证书">
            <img alt="电子招标投标系统交易平台认证证书" title="电子招标投标系统交易平台认证证书" width="20" height="20" src="/static/img/ebs.png">
            CEPREI-EBS17-0004R0号 
          </a>&nbsp;
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010502003437">
            <img alt="" width="20" height="20" src="/static/img/wjlogo.png">
            豫公网安备 41010502003437号 
          </a>&nbsp;
          增值电信业务经营许可证：豫B2-20160109
        </div>
      </div>
      <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
        {{ $t("login.thirdpartyTips") }}
        <br />
        <br />
        <br />
        <social-sign />
      </el-dialog>
    </video-bg>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./components/SocialSignin";
import VideoBg from "vue-videobg";

export default {
  name: "Login",
  components: { LangSelect, SocialSign, VideoBg },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6为数字"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      isShow: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    /* setTimeout(() => {
      document.getElementById("mask").classList.add("fadein");
      document.getElementsByTagName('video')[0].pause();
    }, 1500); */
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // get cache list
              this.$store.dispatch("cache/getCacheList").catch(() => {
                // console.log('获取缓存列表出错！')
              });
            })
            .then(() => {
              // get cache tree
              this.$store.dispatch("cache/getCacheTree").catch(() => {
                // console.log('获取缓存树出错！')
              });
            })
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              // console.log('error submit!!')
              this.loading = false;
            });
        } else {
          // console.log('valid failed!!')
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .VideoBg {
    min-width: 1200px;
    min-height: 600px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
  }

  .logo-complete {
    position: absolute;
    left: 20px;
    top: 20px;
    // width: 553px;
    // height: 62px;

    // img {
    //   width: 553px;
    //   height: 62px;
    // }
  }
  .login-main {
    position: relative;
    display: flex;
    margin: 10vw auto 0;
    border: #fff 4px solid;
    border-radius: 30px;
    background-color: transparent;
    width: 1180px;
    overflow: hidden;

    .login-img {
      position: relative;
      width: 725px;
      height: 573px;
    }
    // .login-img::before {
    //   content: "";
    //   z-index: 0;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   border-radius: 20px 0 0 20px;
    //   background: url(/static/login.png) 0 / cover fixed;
    // }

    .login-form {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 60px;
      background: #fff;
      width: 520px;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .el-form-item {
        margin-bottom: 22px;
      }
      .el-button--medium {
        height: 40px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 10px;
    width: 100vw;
    color: #ccc;
    text-align: center;
    line-height: 20px;

    div {
      padding-top: 4px;
      img {
        vertical-align: middle;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .fadein {
    -webkit-transition: all 1.5s;
    -moz-transition: all 1.5s;
    -ms-transition: all 1.5s;
    -o-transition: all 1.5s;
    transition: all 1.5s;
    opacity: 1;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333;

.login-container {
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
