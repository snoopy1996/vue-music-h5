<template>
  <div>
    <!-- {{currentSong.name ? currentSong.name : '未知'}} -->
    <mu-paper v-show="currentSong.name && currentSong.name.length > 0" class="bottom-music-box" @click.stop="openMusicPlayView" :z-depth="3">
      <div>
        <img :src="getImg" width="45px" height="45px" />
        <div class="song-info">
          <div class="song-name">{{getCurrentName}}</div>
          <div class="songer">{{currentSong.singer && currentSong.singer.name ? currentSong.singer.name : '未知'}}</div>
        </div>
      </div>
      <div>
        <mu-button icon @click.stop="playSong">
          <mu-icon :value="getPlayBtnIcon"></mu-icon>
        </mu-button>
        <mu-button icon @click.stop="openSongList">
          <mu-icon value="queue_music"></mu-icon>
        </mu-button>
        <!-- <mu-icon value="pause_circle_outline"></mu-icon> -->
      </div>
    </mu-paper>
    <current-list :openFullscreen="openMusicscreen" @closeMusicList="closeMusicList" />
    <music-play-view :openFullscreenProp="openFullscreenProp" @closeMusicPlayView="closeMusicPlayView" @openMusicPlayView="openMusicPlayView" @openMusicList="openSongList" />
  </div>
</template>
<script>
import MusicPlayView from '../musicPlay/musicPlay';
import currentList from './currentList.vue';
export default {
  name: 'botm-sheet',
  components: {
    MusicPlayView,
    currentList
  },
  data() {
    return {
      openFullscreenProp: false,
      openMusicscreen: false
    };
  },
  computed: {
    getPlayBtnIcon() {
      return this.$store.state.playing
        ? 'pause_circle_outline'
        : 'play_circle_outline';
    },
    currentSong() {
      return this.$store.state.currentSong;
    },
    getCurrentName() {
      const currentSong = this.$store.state.currentSong;
      if (currentSong.name) {
        if (currentSong.name.length > 10) {
          return `${currentSong.name.slice(0, 10)}...`;
        } else {
          return currentSong.name;
        }
      } else {
        return '未知';
      }
    },
    getImg() {
      let img = require('../../assets/icon/logo.png');
      if (
        this.$store.state.currentSong.img &&
        this.$store.state.currentSong.img.length > 0
      ) {
        img = this.$store.state.currentSong.img;
      }
      return img;
    }
  },
  methods: {
    openMusicPlayView() {
      this.openFullscreenProp = true;
    },
    closeMusicPlayView() {
      this.openFullscreenProp = false;
    },
    openSongList() {
      this.openMusicscreen = true;
      // 设置模态框展开后内部滚动条的位置
      setTimeout(() => {
        const currentListDiv = document.getElementById('currentList');
        currentListDiv.scrollTop = 40 * this.$store.state.currentIndex;
      }, 250);
    },
    closeMusicList() {
      this.openMusicscreen = false;
    },
    playSong() {
      const playing = this.$store.state.playing;
      if (playing) {
        this.$store.commit('pause');
      } else {
        this.$store.commit('play');
      }
    }
  }
};
</script>
<style scoped>
.bottom-music-box {
  position: fixed;
  width: 100vw;
  height: 56px;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.bottom-music-box > div {
  display: flex;
}
.song-info {
  margin-left: 8px;
  text-align: left;
}
.song-name {
  font-size: 16px;
}
.songer {
  font-size: 12px;
  color: gray;
}
</style>
