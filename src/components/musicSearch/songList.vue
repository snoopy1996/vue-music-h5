<template>
  <div class="song-list">
    <mu-list textline="two-line">
      <div v-for="(song, index) in songs" :key="song.id">
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
    songs: {
      type: Array
    }
  },
  methods: {
    clickSong: async function(song) {
      console.log('设置歌曲', song);
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
