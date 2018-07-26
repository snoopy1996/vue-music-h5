<template>
  <div class="login-box">
    <div class="input-box">
      <mu-text-field label-float fullWidth label="手机号" v-model="phoneNumber" type="number" help-text="大陆手机号，且已注册网易云音乐"></mu-text-field><br/>
      <mu-text-field label-float fullWidth label="密码" v-model="password" type="password"></mu-text-field><br/>
      <div style="text-align: center">
        <mu-button flat color="gray" @click="gusterTry">游客试用</mu-button>
        <mu-button flat color="blue" @click="login">登录</mu-button>
      </div>
    </div>
    <div class="other-login-box">
      <div class="other-login-title">
        <div style="width: 100%;color: gray;font-size: 12px;text-align: center">其他登录方式</div>
      </div>
      <div class="loginway-box">
        <div @click="showLoginTip('功能暂未开放')">
          <div class="icon-box">
            <i class="iconfont icon-qq qq-color"></i>
          </div>
          QQ
        </div>
        <div @click="showLoginTip('功能暂未开放')">
          <div class="icon-box">
            <i class="iconfont icon-weixin weixin-color"></i>
          </div>
          微信
        </div>
        <div @click="showLoginTip('功能暂未开放')">
          <div class="icon-box">
            <i class="iconfont icon-weibo weibo-color"></i>
          </div>
          微博
        </div>
        <div @click="showLoginTip('功能暂未开放')">
          <div class="icon-box">
            <i class="iconfont icon-wangyi wangyi-color"></i>
          </div>
          网易邮箱
        </div>
      </div>
    </div>
    <mu-snackbar position="top" color="green" :open.sync="openSnackbar">
      {{message}}
      <mu-button flat slot="action" color="white" @click="openSnackbar = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      password: '',
      openSnackbar: false,
      message: ''
    };
  },
  methods: {
    gusterTry() {
      this.$router.push('main');
    },
    async login() {
      const params = {
        phone: this.phoneNumber,
        password: this.password
      };
      const res = await this.$http.get(this.globarVar_.musicApi.auth.login, {
        params
      });
      console.log('res', res.data);
      if (res.data.code === 200) {
        const userId = res.data.profile.userId;
        const userInfo = await this.getUserInfo(userId);
        this.getSubcount();
        this.getUserPlayList(userId);
        this.$store.commit('setLogin', userInfo);
        if (!this.$route.query.redirect) {
          this.$router.push('person');
        } else {
          this.$router.push(this.$route.query.redirect);
        }
      } else {
        // this.message = res.data.msg;
        this.showLoginTip(res.data.msg);
      }
    },
    async getUserInfo(uid) {
      const res = await this.$http.get(
        this.globarVar_.musicApi.user.userDetail,
        {
          params: { uid }
        }
      );
      return res.data;
    },
    showLoginTip(msg) {
      this.message = msg;
      this.openSnackbar = true;
      setTimeout(() => {
        this.openSnackbar = false;
      }, 1500);
    },
    async getSubcount() {
      const res = await this.$http.get(this.globarVar_.musicApi.user.subcount);
      console.log('getSubcount--------res', res);
      this.$store.commit('setSubCount', res.data);
    },
    async getUserPlayList(uid) {
      const res = await this.$http.get(this.globarVar_.musicApi.user.playlist, {
        params: { uid }
      });
      if (res.data.code === 200) {
        console.log('getUserPlayList----res.data', res.data);
        this.$store.commit('setUserPlayList', res.data.playlist);
      }
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url('https://ws1.sinaimg.cn/large/0064OUUqly1ft3v6ygl97j30u01hcdmg.jpg')
    center center;
  background-size: 100% 100%;
}
.input-box {
  padding: 35vh 12vw 0 12vw;
}
.other-login-box {
  /* position: absolute; */
  margin-top: 84px;
  width: 100vw;
  box-sizing: border-box;
  padding: 8px 48px;
  bottom: 3.5vh;
}
.other-login-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.line {
  width: 35%;
  color: rgba(0, 0, 0, 0.2);
  /* border-top: 1px solid gray; */
}
.loginway-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.loginway-box > div {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 8px;
  color: gray;
}
.icon-box {
  border: 1px solid gray;
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 32px;
  margin-top: 4px;
  margin-bottom: 4px;
}
.icon-box > .iconfont {
  font-size: 24px;
  line-height: 30px;
}
.qq-color {
  color: rgb(52, 160, 223);
}
.weixin-color {
  color: rgb(103, 182, 51);
}
.weibo-color {
  color: rgb(234, 72, 72);
}
.wangyi-color {
  color: rgb(212, 58, 49);
}
</style>
