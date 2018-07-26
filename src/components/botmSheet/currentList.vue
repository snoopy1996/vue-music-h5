<template>
  <mu-dialog width="360" transition="slide-bottom" fullscreen :open="getOpenFullscreen" dialogClass="musicList-class" @close="close">
    <div class="list-top">
      <div>
        <mu-icon value="low_priority" color="gray" style="margin-right: 4px;"></mu-icon>
        当前歌单({{getMusicList.length}}首)
      </div>
      <div>
        <mu-icon value="create_new_folder" color="gray" style="margin-right: 4px;"></mu-icon>
        正在播放
      </div>
    </div>
    <mu-divider style="background-color: rgba(0, 0, 0, 0.2);"></mu-divider>
    <div style="padding: 0 8px;height: calc(60vh - 40px);overflow-y: auto;" id="currentList">
      <!-- {{getCurrentIndex}} -->
      <div v-for="(item, index) in getMusicList" :key="item.id" @click="clickSong(item, index)">
        <div v-if="index == getCurrentIndex" class="currentsong-box song-box">{{item.name}}
          <span>-{{item.singer.name}}</span>
        </div>
        <div v-else class="song-box">{{item.name}}
          <span style="color: gray">-{{item.singer.name}}</span>
        </div>
        <mu-divider style="background-color: rgba(0, 0, 0, 0.1);"></mu-divider>
      </div>
    </div>
  </mu-dialog>
</template>

<script>
export default {
  props: {
    openFullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getOpenFullscreen() {
      return this.openFullscreen;
    },
    getMusicList() {
      return this.$store.state.musicList;
    },
    getCurrentIndex() {
      console.log('index-change', this.$store.state.currentIndex);
      return this.$store.state.currentIndex;
    }
  },
  methods: {
    close() {
      this.$emit('closeMusicList');
    },
    async clickSong(item, index) {
      console.log('item', item);
      if (!item.img || item.img.length === 0) {
        const img = await this.getSongImg(item.album.id);
        this.$store.commit('setImg', { index, img });
      }
      this.$store.commit('playIndex', index);
      this.getLyric(item.id);
    },
    async getSongImg(alid) {
      const res = await this.$http.get(this.globarVar_.musicApi.album, {
        params: { id: alid }
      });
      if (res.data.code === 200) {
        return res.data.album.picUrl;
      }
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
.list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 8px; */
  padding: 8px;
}
.list-top > div {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.song-box {
  padding: 8px 0;
  color: black;
}
.currentsong-box {
  color: rgb(220, 70, 59);
}
</style>
