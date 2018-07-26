<template>
  <div>
    <div class="profile-box" :style="`background-image: url(${getUser.profile.backgroundUrl})`">
      <div class="profile-info-box">
        <div class="avator-box">
          <mu-avatar :size="72" @click="consoleUser">
            <img :src="getUser.profile.avatarUrl" />
          </mu-avatar>
          <mu-button color="gray" small @click="openFullscreen=true">
            <mu-icon left value="edit"></mu-icon>编辑
          </mu-button>
        </div>
        <div class="nickname">{{getUser.profile.nickname || '用户' + getUser.profile.userId}}</div>
        <div class="follows">
          关注 {{getUser.profile.follows}}
          <span style="margin: 0 6px;"> | </span>
          粉丝 {{getUser.profile.followeds}}
        </div>
        <div class="chip-box">
          <div class="profile-chip">Lv{{getUser.level}}</div>
          <div class="profile-chip">邯郸市</div>
        </div>
      </div>
    </div>
    <div class="container-box">
      <mu-tabs :value.sync="active" fullWidth inverse style="background-color: white">
        <mu-tab>音乐</mu-tab>
        <mu-tab>动态</mu-tab>
        <mu-tab>关于我</mu-tab>
      </mu-tabs>
      <mu-carousel :active.sync="active" hideIndicators hideControls :cycle="false" style="overflow-y: auto;height: calc(100vh - 180px)">
        <mu-carousel-item style="overflow-y: auto;">
          <person-music />
        </mu-carousel-item>
        <mu-carousel-item style="overflow-y: auto;">
          <person-dymaic />
        </mu-carousel-item>
        <mu-carousel-item style="overflow-y: auto;">
          <person-about />
        </mu-carousel-item>
      </mu-carousel>
    </div>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen" dialogClass="editProfileDialog">
      <mu-appbar color="primary" title="修改个人信息">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="submitUserInfo">
          提交
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;height:calc(80vh - 56px);overflow-y:auto">
        <mu-form :model="userEdit" class="mu-demo-form" :label-position="'top'" label-width="100" :color="'#E5463B'">
          <mu-form-item prop="input" label="昵称" :color="'#E5463B'">
            <mu-text-field v-model="userEdit.userName" :color="'#E5463B'"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="radio" label="性别">
            <mu-radio v-model="userEdit.gender" :value="0" label="保密" :color="'#E5463B'"></mu-radio>
            <mu-radio v-model="userEdit.gender" :value="1" label="男生" :color="'#E5463B'"></mu-radio>
            <mu-radio v-model="userEdit.gender" :value="2" label="男生" :color="'#E5463B'"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="date" label="出生日期">
            <mu-date-input v-model="userEdit.birthday" actions :color="'#E5463B'"></mu-date-input>
          </mu-form-item>
          <mu-form-item prop="input" label="个人介绍">
            <textarea v-model="userEdit.signature" class="signature-input" placeholder="签名：" maxlength="50"></textarea>
            <div class="signature-length-box">{{userEdit.signature.length}}/50</div>
          </mu-form-item>
          <!-- <mu-form-item prop="input" label="个人介绍">
            <textarea v-model="userEdit.description" class="signature-input" placeholder="写点内容向小伙伴们介绍一下自己" maxlength="140"></textarea>
            <div class="signature-length-box">{{userEdit.description.length}}/140</div>
          </mu-form-item> -->
        </mu-form>
      </div>
    </mu-dialog>
    <mu-snackbar position="top" color="green" :open.sync="openSnackbar">
      暂时不能更改个人信息，如有需要，请登录网易云音乐官网修改
      <mu-button flat slot="action" color="white" @click="openSnackbar = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
import personMusic from './personMusic.vue';
import personDymaic from './personDymaic.vue';
import personAbout from './personAbout.vue';
export default {
  components: {
    personMusic,
    personDymaic,
    personAbout
  },
  data() {
    return {
      active: 0,
      imgs: [
        'https://ws1.sinaimg.cn/large/0064OUUqly1fszw3yl8ndj30u01hcgz7.jpg',
        'https://ws1.sinaimg.cn/large/0064OUUqly1fszbf3vqbrj30zk0pfafo.jpg',
        'https://ws1.sinaimg.cn/large/0064OUUqly1fszaxbqs5ej30zk0nsn54.jpg'
      ],
      openFullscreen: false,
      userEdit: {},
      openSnackbar: false
    };
  },
  computed: {
    getUser() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    this.userEdit = {
      userName: this.getUser.profile.nickname,
      gender: this.getUser.profile.gender,
      birthday: new Date(this.getUser.profile.birthday),
      signature: this.getUser.profile.signature,
      description: this.getUser.profile.description
    };
    console.log('this.userEdit----', this.userEdit);
  },
  methods: {
    consoleUser() {
      console.log('user', this.getUser);
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    },
    async submitUserInfo() {
      console.log('this.userEdit', this.userEdit);
      const params = {
        gender: this.userEdit.gender,
        birthday: new Date(this.userEdit.birthday).getTime(),
        nickname: this.userEdit.userName,
        signature: this.userEdit.signature,
        description: this.userEdit.description
      };
      try {
        const res = await this.$http.get(
          this.globarVar_.musicApi.user.updateUser,
          {
            params
          }
        );
        if (res.data.code === 200) {
          setTimeout(async () => {
            const userInfo = await this.getUserInfo(
              this.getUser.profile.userId
            );
            this.$store.commit('setLogin', userInfo);
          }, 1000);
        }
      } catch (err) {
        console.log(err);
        this.showLoginTip();
      }
      this.closeFullscreenDialog();
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
    showLoginTip() {
      this.openSnackbar = true;
      setTimeout(() => {
        this.openSnackbar = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.profile-box {
  margin: 8px;
  height: 35vh;
  position: relative;
  padding: 16px;
  text-align: left;
  background-size: 100%;
  border-radius: 16px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.profile-info-box {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
.avator-box {
  width: 85vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nickname {
  font-size: 15px;
  font-weight: 600;
  color: aliceblue;
  margin-top: 14px;
}
.follows {
  font-size: 12px;
  color: #a8acb1;
  margin-top: 4px;
}
.chip-box {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
.profile-chip {
  background-color: gray;
  color: aliceblue;
  font-size: 10px;
  font-weight: 600;
  padding: 0 8px;
  border-radius: 8px;
  margin-right: 4px;
}
.container-box {
  /* margin-top: 16px; */
  margin: 16px 8px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.signature-input {
  width: 100%;
  height: 80px;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
}
.signature-input:focus {
  outline: none;
}
.signature-length-box {
  position: relative;
  top: -24px;
  left: calc(100% - 40px);
  font-size: 14px;
}
</style>
