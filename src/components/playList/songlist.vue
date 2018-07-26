<template>
  <div class="song-list">
    <mu-list textline="two-line">
      <div v-for="(song, index) in currentPlayList.tracks" :key="song.id">
        <mu-list-item avatar button @click="clickSong(song)" style="height: auto;">
          <mu-list-item-action style="min-width: 24px;">
            {{index +1}}
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{getSongName(song)}}</mu-list-item-title>
            <mu-list-item-sub-title>{{getSongOtherInfo(song)}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon size="18" value="more_vert" color="gray"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    <botm-sheet />
  </div>
</template>

<script>
import botmSheet from '../botmSheet/botmSheet';
export default {
  components: {
    botmSheet
  },
  props: {
    currentPlayList: {
      type: Object
    }
  },
  methods: {
    clickSong: async function(song) {
      // console.log('this.currentPlayList.tracks', this.currentPlayList.tracks);
      this.$store.commit('setMusicListType', 1);
      // 检查当前歌单是否含有选中歌曲
      const musicListhas = this.$store.state.musicList;
      for (let index in musicList) {
        if (song.id === musicListhas[index].id) {
          this.$store.commit('setSong', musicListhas[index]);
          this.$store.commit('playIndex', index);
          this.getLyric(song.id);
          return;
        }
      }
      // 没有选中歌曲
      // 获取要播放的歌曲详情
      let img = '';
      if (song.album.picUrl && song.album.picUrl.length > 0) {
        img = song.album.picUrl;
      } else {
        img = await this.getSongImg(song.album.id);
      }
      let songDetail = {
        name: song.name,
        singer: song.artists[0],
        id: song.id,
        img: img,
        url: this.globarVar_.musicApi.music.spareUrl(song.id),
        album: song.album
      };
      let musicList = this.getTracks();
      const getIndex = this.getIndex(musicList, song.id);
      console.log('getIndex', getIndex);
      musicList[getIndex] = songDetail;
      this.$store.commit('setSong', songDetail);
      this.$store.commit('setMusicList', { musicList, index: getIndex });
      this.getLyric(song.id);
    },
    getTracks() {
      return this.currentPlayList.tracks.map(song => {
        return {
          name: song.name,
          singer: song.artists[0],
          id: song.id,
          url: this.globarVar_.musicApi.music.spareUrl(song.id),
          album: song.album
        };
      });
    },
    getIndex(musicList, id) {
      for (let index in musicList) {
        if (musicList[index].id === id) {
          return index;
        }
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
    },
    async getSongImg(alid) {
      const res = await this.$http.get(this.globarVar_.musicApi.album, {
        params: { id: alid }
      });
      if (res.data.code === 200) {
        return res.data.album.picUrl;
      }
    },
    getSongName(song) {
      if (song.name.length > 38) {
        return `${song.name.slice(0, 38)}...`;
      } else {
        return song.name;
      }
    },
    getSongOtherInfo(song) {
      let author = '未知歌手';
      let album = '未知专辑';
      song.artists = song.artists ? song.artists : song.ar;
      song.album = song.album ? song.album : song.al;
      if (song.artists[0] && song.artists[0].name) {
        author = song.artists[0].name;
      }
      if (song.album && song.album.name) {
        album = song.album.name;
      }
      const returnStr = `${author}-${album}`;
      if (returnStr.length > 45) {
        return `${returnStr.slice(0, 45)}...`;
      } else {
        return returnStr;
      }
    }
  }
};
</script>

<style scoped>
</style>
