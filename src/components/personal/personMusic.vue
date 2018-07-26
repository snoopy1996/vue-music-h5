<template>
  <div class="music-list-box">
    <mu-paper :zDepth="2">
      <div class="list-box">歌单</div>
      <mu-list textline="two-line">
        <mu-list-item avatar button>
          <mu-list-item-action>
            <div class="list-item-left">
              <img src="../../assets/icon/paihang.png" width="100%" />
            </div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>我的听歌排行</mu-list-item-title>
            <mu-list-item-sub-title>累计听歌{{getUser.listenSongs}}首</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="info" color="green"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar button>
          <mu-list-item-action>
            <div class="list-item-left">
              <img :src="getPlayList.likeList.coverImgUrl" width="100%" />
            </div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>我喜欢的音乐</mu-list-item-title>
            <mu-list-item-sub-title>{{getPlayList.likeList.trackCount}}首, 播放{{getPlayList.likeList.playCount}}次</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-paper>
    <mu-paper :zDepth="2">
      <div class="list-box">收藏歌单</div>
      <mu-list textline="two-line">
        <div v-for="item in getPlayList.playList" :key="item.id">
          <mu-list-item avatar button @click="clickPlayList(item)">
            <mu-list-item-action>
              <div class="list-item-left">
                <img :src="item.coverImgUrl" width="100%" />
              </div>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-sub-title>{{item.trackCount}}首, by {{item.creator.nickname}}, 播放{{item.playCount}}次</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.state.userInfo;
    },
    getSubCount() {
      return this.$store.state.subCount;
    },
    getPlayList() {
      const playlist = this.$store.state.userPlayList;
      const userId = this.$store.state.userInfo.profile.userId;
      let likeList = {};
      let playList = [];
      playlist.map(v => {
        if (userId !== v.userId) {
          playList.push(v);
        } else {
          likeList = v;
        }
        return v;
      });
      return {
        likeList,
        playList
      };
    }
  },
  created() {
    this.getUserPlayList(this.getUser.profile.userId);
  },
  methods: {
    async getUserPlayList(uid) {
      const res = await this.$http.get(this.globarVar_.musicApi.user.playlist, {
        params: { uid }
      });
      if (res.data.code === 200) {
        console.log('getUserPlayList----res.data', res.data);
        this.$store.commit('setUserPlayList', res.data.playlist);
      }
    },
    async clickPlayList(item) {
      console.log('item', item);
      this.$router.push({
        path: '/playListDetail',
        query: { id: item.id }
      });
    }
  }
};
</script>

<style scoped>
.music-list-box {
  background-color: white;
}
.list-box {
  padding: 4px 16px;
  background-color: rgb(239, 240, 241);
}
.list-item-left {
  background-color: rgb(103, 103, 103);
  /* padding: 8px; */
  width: 46px;
  height: 46px;
  border-radius: 10px;
}
.list-item-left > img {
  border-radius: 10px;
}
</style>
