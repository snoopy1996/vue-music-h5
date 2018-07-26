<template>
  <div>
    <mu-appbar style="width: 100%;position: fixed;width: 100vw;top: 0;" color="primary">
      <mu-button icon slot="left" @click="back">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      榜单
      <mu-button icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-flex class="demo-linear-progress" v-if="showProcess">
      <mu-linear-progress></mu-linear-progress>
    </mu-flex>
    <div class="playlistInfo-box">
      <div class="bg-box" :style="`background-image: url(${currentPlayList.coverImgUrl})`"></div>
      <div class="info-box">
        <div class="img-info" :style="`background-image: url(${currentPlayList.coverImgUrl})`">
          <div class="listenCount">
            <i class="iconfont icon-shiliangzhinengduixiang1" style="font-size: 12px;margin-right:4px"></i>{{currentPlayList.playCount}}
          </div>
          <div class="infoIcon">
            <mu-icon size="18" value="info_outline" color="white"></mu-icon>
          </div>
        </div>
        <div class="name-info">
          <div class="playList-name">
            {{currentPlayList.name}}
          </div>
          <div class="creator-box">
            <mu-avatar :size="24" style="margin-right: 12px;">
              <img :src="currentPlayList.creator.avatarUrl">
            </mu-avatar>
            {{currentPlayList.creator.nickname}}
            <mu-icon size="18" value="chevron_right" color="white"></mu-icon>
          </div>
        </div>
      </div>
      <div class="action-box">
        <div @click="goComment">
          <div>
            <i class="iconfont icon-pinglun"></i>
          </div>
          {{currentPlayList.commentCount}}
        </div>
        <div>
          <div>
            <i class="iconfont icon-share"></i>
          </div>
          分享
        </div>
        <div>
          <div>
            <i class="iconfont icon-xiazai"></i>
          </div>
          下载
        </div>
        <div>
          <div>
            <i class="iconfont icon-duoxuan-copy-copy-copy-copy-copy-copy-copy-copy"></i>
          </div>
          多选
        </div>
      </div>

    </div>
    <div class="list-detail">
      <div class="detail-top-box">
        <div>
          <i class="iconfont icon-bofang"></i>
          播放全部
          <span style="color: gray">({{currentPlayList.trackCount}}首)</span>
        </div>
        <div>
          <i class="iconfont icon-shoucang"></i>{{currentPlayList.subscribedCount}}</div>
      </div>
      <div style="padding-bottom: 48px;">
        <song-list :currentPlayList="currentPlayList" />
      </div>
    </div>
  </div>
</template>

<script>
import songList from '../playList/songlist.vue';
export default {
  components: {
    songList
  },
  data() {
    return {
      title: 'title',
      currentPlayList: {
        creator: {},
        tracks: []
      },
      showProcess: false,
      idx: ''
    };
  },
  async created() {
    this.showProcess = true;
    const query = this.$route.query;
    this.idx = query.idx;
    try {
      this.currentPlayList = await this.getlistDetail(query.idx);
    } catch (err) {}
    this.showProcess = false;
  },
  async activated() {
    const query = this.$route.query;
    if (query.idx !== this.idx) {
      this.idx = query.idx;
      this.showProcess = true;
      try {
        this.currentPlayList = await this.getlistDetail(query.idx);
      } catch (err) {}
      this.showProcess = false;
    }
  },
  methods: {
    async getlistDetail(idx) {
      const res = await this.$http.get(this.globarVar_.musicApi.top.list, {
        params: { idx }
      });
      console.log('getlistDetail-res.data', res.data.playlist);
      return res.data.playlist;
    },
    back() {
      this.$router.back();
    },
    goComment() {
      this.$router.push({
        path: '/commentPage',
        query: {
          id: this.currentPlayList.id,
          type: 'playlist'
        }
      });
    }
  }
};
</script>

<style scoped>
.playlistInfo-box {
  position: relative;
  margin: 8px 8px;
  /* height: 38vh; */
  border-radius: 16px;
  margin-top: 64px;
  overflow: hidden;
}
.demo-linear-progress {
  margin: 56px 0 8px 0;
}
.bg-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: 70% 70%;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
  z-index: 0;
}
.info-box {
  margin-top: 32px;
  padding: 16px;
  position: relative;
  display: flex;
}
.img-info {
  position: relative;
  width: 30vw;
  height: 30vw;
  background-size: 100% auto;
}
.listenCount {
  position: absolute;
  right: 4px;
  color: white;
  font-size: 12px;
}
.infoIcon {
  position: absolute;
  right: 4px;
  bottom: 0;
  color: white;
}
.name-info {
  padding: 8px 16px;
}
.playList-name {
  font-size: 16px;
  font-weight: 600;
  font-family: '黑体';
  color: white;
}
.creator-box {
  margin-top: 24px;
  color: aliceblue;
  display: flex;
  align-items: center;
}
.action-box {
  position: relative;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  color: #cabcbc;
  z-index: 16;
  margin-bottom: 16px;
}
.action-box > div {
  color: #cabcbc;
  width: 25%;
  text-align: center;
}
.list-detail {
  padding: 8px;
}
.detail-top-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.song-box {
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.song-left {
  display: flex;
  align-items: center;
}
.index-box {
  width: 32px;
  text-align: center;
}
.song-otherinfo {
  font-size: 12px;
  color: gray;
}
</style>
