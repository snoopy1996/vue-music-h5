<template>
  <div>
    <mu-drawer :open="open" :docked="docked" width="300" @close="drawerPageToggle()">
      <div v-if="getLoginStatus" class="user-info-box" :style="`background-image: url(${getBackUrl})`">
        <mu-avatar :size="size">
          <img :src="getUser.profile.avatarUrl">
        </mu-avatar>
        <div class="user-other">
          <div>
            {{getUser.profile.nickname}}
            <mu-chip class="chip-drawer">
              LV.{{getUser.level}}
            </mu-chip>
          </div>
          <mu-chip class="chip-drawer" @click="signin">
            {{signMsg}}
          </mu-chip>
        </div>
      </div>
      <div v-else class="unLogin">
        <div>登录网易云音乐</div>
        <div>320K高音质无线下载,手机电脑多端同步</div>
        <div @click="goLogin" class="login-btn">
          <mu-ripple class="login-btn" style="width: 100%;left: 0">

            立即登录

          </mu-ripple>
        </div>
      </div>
      <div v-for="list in menuList" :key="list.index">
        <mu-list>
          <!-- <mu-list-item v-for="item in list.data" :title="item.title" :key="item.title">
            <mu-icon slot="left" :value="item.icon" />
          </mu-list-item> -->
          <mu-list-item v-for="item in list.data" :key="item.title" button @click="goTo(item)">
            <mu-list-item-action>
              <mu-icon :value="item.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{item.title}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
        <!-- <i class="mdui-icon material-icons">add_shopping_cart</i> -->
      </div>
      <div class="outset-box" v-if="getLoginStatus">
        <mu-button flat color="gray" @click="openAlert = true">
          <i class="iconfont icon-tuichudenglu"></i>
          退出账号
        </mu-button>
        <mu-button flat color="gray">
          <i class="iconfont icon-shezhi"></i>
          设置
        </mu-button>
      </div>
    </mu-drawer>
    <mu-dialog title="确认退出账号" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      退出后，您将禁止访问某些页面功能，再次登录后可恢复使用？
      <mu-button slot="actions" flat color="gray" @click="openAlert = false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="logout">确认退出</mu-button>
    </mu-dialog>
    <mu-snackbar position="top" color="green" :open.sync="openSnackbar">
      {{message}}
      <mu-button flat slot="action" color="white" @click="openSnackbar = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>
<script>
import Bus from '@/eventBus/bus';

const listData = [
  {
    index: 1,
    data: [
      {
        title: '我的消息',
        icon: 'confirmation_number'
      },
      {
        title: '会员中心',
        icon: 'person',
        to: '/person'
      },
      {
        title: '商城',
        icon: 'shopping_cart'
      },
      {
        title: '在线听歌免流量',
        icon: 'wifi'
      }
    ]
  },
  {
    index: 2,
    data: [
      {
        title: '我的好友',
        icon: 'message'
      },
      {
        title: '附近的人',
        icon: 'room'
      }
    ]
  },
  {
    index: 3,
    data: [
      {
        title: '听歌识曲',
        icon: 'hearing'
      },
      {
        title: '扫一扫',
        icon: 'album'
      }
    ]
  }
];
export default {
  components: {},
  computed: {
    getUser() {
      return this.$store.state.userInfo;
    },
    getLoginStatus() {
      return this.$store.state.loginStatus;
    },
    getBackUrl() {
      if (this.$store.state.loginStatus) {
        return this.$store.state.userInfo.profile.backgroundUrl;
      } else {
        return 'https://ws1.sinaimg.cn/large/0064OUUqly1fs5u0gwwdrj30i20bbgm4.jpg';
      }
    }
  },
  data() {
    return {
      open: false,
      docked: false,
      pageTitle: '',
      menuList: listData,
      size: 64,
      openAlert: false,
      signMsg: '签到',
      message: '',
      openSnackbar: false
    };
  },
  created() {
    Bus.$on('drawerToggle', () => {
      this.open = !this.open;
    });
    console.log('this.uiser', this.getUser);
  },
  methods: {
    drawerPageToggle() {
      this.open = !this.open;
    },
    goTo(item) {
      if (item.to) {
        this.$router.push(item.to);
        this.drawerPageToggle();
      }
    },
    goLogin() {
      console.log('去登陆');
      this.$router.push('/login');
    },
    logout() {
      this.$store.commit('logout');
      this.openAlert = false;
      this.$router.push('/main');
      this.open = false;
    },
    async signin() {
      if (this.signMsg === '签到') {
        const res = await this.$http.get(this.globarVar_.musicApi.user.signin);
        if (res.data.code === 200) {
          this.signMsg = '已签到';
        } else if (res.data.code === -2) {
          this.openTip('您今日已签到过');
          this.signMsg = '已签到';
        }
      }
    },
    openTip(msg) {
      this.message = msg;
      this.openSnackbar = true;
      setTimeout(() => {
        this.openSnackbar = false;
      }, 1500);
    }
  }
};
</script>
<style scoped>
.mu-item.show-left {
  padding-left: 0;
}
.unLogin {
  width: 100%;
  height: 150px;
  padding: 16px 12px 0 12px;
  background-image: url(https://ws1.sinaimg.cn/large/0064OUUqly1fs5u0gwwdrj30i20bbgm4.jpg);
  background-size: 100%;
  text-align: center;
  position: relative;
}
.unLogin > div {
  color: aliceblue;
  text-align: center;
  margin-top: 8px;
}
.login-btn {
  position: absolute;
  width: 50%;
  height: 38px;
  left: 25%;
  border: solid 1px gray;
  border-radius: 19px;
  line-height: 38px;
  font-size: 14px;
}
.user-info-box {
  width: 100%;
  height: 150px;
  padding: 16px 12px 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background: url('https://ws1.sinaimg.cn/large/0064OUUqly1fs5u0gwwdrj30i20bbgm4.jpg')
    no-repeat center center;
  background-size: 100%;
}
.user-other {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: whitesmoke;
}
.info-content {
  background-color: rgba(1, 1, 1, 0.55);
}
.chip-drawer {
  height: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: rgba(1, 1, 1, 0.55);
  color: whitesmoke;
  border: solid 1px whitesmoke;
}
.outset-box {
  position: fixed;
  bottom: 16px;
  width: 100%;
  display: flex;
}
</style>
