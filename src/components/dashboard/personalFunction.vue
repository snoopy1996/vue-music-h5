<template>
  <div class="function-box">
    <div @click="showTip">
      <div class="icon-box">
        <i class="iconfont icon-fm"></i>
      </div>
      <div class="icon-name">私人FM</div>
    </div>
    <div @click="clickSongs">
      <div class="icon-box">
        <i class="iconfont icon-music"></i>
      </div>
      <div class="icon-name">歌曲</div>
    </div>
    <div @click="clickList">
      <div class="icon-box">
        <i class="iconfont icon-gedan"></i>
      </div>
      <div class="icon-name">歌单</div>
    </div>
    <div @click="phbClick">
      <div class="icon-box">
        <i class="iconfont icon-paihang"></i>
      </div>
      <div class="icon-name">排行榜</div>
    </div>
    <recommend-songs :openRSongsProp.sync="openRSongsProp" :recommendSongs="recommendSongs" @closeRSongDialog="openRSongsProp = false" />
    <recmomend-list :openRListProp.sync="openRListProp" :recommendList="recommendList" @closeRListDialog="openRListProp = false" />
    <mu-bottom-sheet :open.sync="openBDList">
      <mu-list>
        <mu-sub-header>官方榜</mu-sub-header>
        <mu-list-item button v-for="item in wBbdList" :key="item.key" @click="goToRL(item)">
          <mu-list-item-action>
            <img :src="item.img + '?param=50y50'" style="width: 36px;">
          </mu-list-item-action>
          <mu-list-item-title>{{item.title}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
    </mu-bottom-sheet>
    <mu-snackbar position="top" color="info" :open.sync="openSnackbar">
      功能暂不支持
      <mu-button flat slot="action" color="white" @click="openSnackbar = false">Close</mu-button>
    </mu-snackbar>
    <mu-dialog title="需要登录才能设置" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      您还没有登录，是否前去登录？
      <mu-button slot="actions" flat color="gray" @click="openAlert = false">不需要</mu-button>
      <mu-button slot="actions" flat color="primary" @click="goLigin">去登录</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import recommendSongs from './recommendSongs.vue';
import recmomendList from './recommendList.vue';
export default {
  components: {
    recommendSongs,
    recmomendList
  },
  data() {
    return {
      openRSongsProp: false,
      recommendSongs: [],
      openRListProp: false,
      recommendList: [],
      openBDList: false,
      openSnackbar: false,
      openAlert: false,
      redirect: '',
      wBbdList: [
        {
          key: 0,
          title: '云音乐新歌榜',
          img:
            'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg'
        },
        {
          key: 1,
          title: '云音乐热歌榜',
          img:
            'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg'
        },
        {
          key: 2,
          title: '网易原创歌曲榜',
          img:
            'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg'
        },
        {
          key: 3,
          title: '云音乐飙升榜',
          img:
            'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg'
        },
        {
          key: 4,
          title: '云音乐电音榜',
          img:
            'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg'
        },
        {
          key: 6,
          title: '美国Billboard周榜',
          img:
            'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg'
        },
        {
          key: 8,
          title: 'iTunes榜',
          img:
            'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg'
        },
        {
          key: 10,
          title: '日本Oricon周榜',
          img:
            'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg'
        },
        {
          key: 14,
          title: '中国TOP排行榜(港台榜)',
          img:
            'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg'
        },
        {
          key: 15,
          title: '中国TOP排行榜(内地榜)',
          img:
            'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg'
        },
        {
          key: 18,
          title: '中国嘻哈榜',
          img:
            'http://p1.music.126.net/_nwkQTFtOdAjFvOI8Wg7Tg==/18922595114302109.jpg'
        }
      ]
    };
  },
  methods: {
    async clickSongs() {
      if (this.$store.state.loginStatus) {
        this.$emit('showLoading');
        this.recommendSongs = await this.getRecommendSongs();
        this.openRSongsProp = true;
        this.$emit('hideloading');
      } else {
        this.openAlert = true;
      }
    },
    async getRecommendSongs() {
      const res = await this.$http.get(
        this.globarVar_.musicApi.resource.recommendSong
      );
      console.log('res', res.data);
      if (res.data.code === 200) {
        return res.data.recommend;
      }
    },
    async clickList() {
      if (this.$store.state.loginStatus) {
        this.$emit('showLoading');
        this.recommendList = await this.getRecommendList();
        this.openRListProp = true;
        this.$emit('hideloading');
      } else {
        this.openAlert = true;
      }
    },
    async getRecommendList() {
      const res = await this.$http.get(
        this.globarVar_.musicApi.resource.recommendList
      );
      console.log('res', res.data);
      if (res.data.code === 200) {
        return res.data.recommend;
      }
    },
    phbClick() {
      this.openBDList = true;
    },
    goToRL(item) {
      this.openBDList = false;
      this.$router.push({
        path: '/rankingList',
        query: { idx: item.key }
      });
    },
    showTip() {
      this.openSnackbar = true;
      setTimeout(() => {
        this.openSnackbar = false;
      }, 1500);
    },
    goLigin() {
      this.openAlert = false;
      this.$router.push({
        path: '/login',
        query: {
          redirect: 'main'
        }
      });
    }
  }
};
</script>

<style scoped>
.function-box {
  margin-top: 16px;
  padding: 8px;
  display: flex;
  align-items: center;
}
.function-box > div {
  text-align: center;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgb(229, 70, 59);
  color: white;
}
.icon-box > i {
  font-size: 24px;
  line-height: 48px;
}
.icon-name {
  margin-top: 4px;
  font-size: 12px;
}
</style>
