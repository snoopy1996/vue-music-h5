<template>
  <div class="new-music-box">
    <div class="music-box-title">
      推荐新歌
      <mu-icon size="24" value="chevron_right" color="black"></mu-icon>
    </div>
    <mu-row gutter>
      <mu-col span="4" v-for="item in getList" :key="item.id" class="onemusic-box" @click="clickMusic(item)">
        <img :src="item.song.album.picUrl" width="100%" />
        <div class="music-name">{{item.name}}</div>
        <div class="singer-name">{{item.song.artists[0].name}}</div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicList: []
    };
  },
  computed: {
    getList() {
      const listArray = this.musicList;
      if (listArray.length > 6) {
        return listArray.slice(0, 6);
      } else {
        return listArray;
      }
    }
  },
  async created() {
    this.musicList = await this.getPersonalized();
  },
  methods: {
    async getPersonalized() {
      const res = await this.$http.get(
        this.globarVar_.musicApi.personalized.newsong
      );
      if (res.data.code === 200) {
        return res.data.result;
      }
    },
    async clickMusic(song) {
      console.log('设置歌曲', song);
      const img = song.song.album.picUrl;
      let songDetail = {
        name: song.name,
        singer: song.song.artists[0],
        img: img,
        id: song.id,
        url: this.globarVar_.musicApi.music.spareUrl(song.id)
      };
      // 如果不是第一种列表类型，则清空列表
      if (this.$store.state.musicListType !== 0) {
        this.$store.commit('clearMusicList');
      }
      this.$store.commit('setSong', songDetail);
      this.$store.commit('setMusicListType', 0);
      const musicList = this.$store.state.musicList;
      for (let index in musicList) {
        if (songDetail.id === musicList[index].id) {
          this.$store.commit('playIndex', index);
          this.getLyric(song.id);
          return;
        }
      }
      this.$store.commit('setPushSong', songDetail);
      this.$store.commit('playIndex', this.$store.state.musicList.length - 1);
      this.getLyric(song.id);
    },
    async getLyric(id) {
      const res = await this.$http.get(this.globarVar_.musicApi.music.lyric, {
        params: { id, timestamp: new Date().getTime() }
      });
      if (res.data.code === 200) {
        console.log('res.data', res.data);
        this.$store.commit('setLyric', res.data.lrc ? res.data.lrc.lyric : '');
      }
    }
  }
};
</script>

<style scoped>
.new-music-box {
  margin-top: 16px;
  padding: 8px;
}
.music-box-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.music-name {
  font-size: 12px;
}
.onemusic-box {
  padding-left: 3px;
  padding-right: 3px;
  margin-top: 8px;
}
.onemusic-box > img {
  border-radius: 4px;
}
.singer-name {
  font-size: 10px;
  color: gray;
}
</style>
