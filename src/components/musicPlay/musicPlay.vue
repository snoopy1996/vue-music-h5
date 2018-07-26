<template>
  <mu-dialog class="music-view-box" width="360" transition="slide-right" fullscreen :open.sync="getOpenFullscreenProp">
    <mu-appbar :title="currentSong.name" color="rgba(229,70,59,0)" style="position: fixed;width: 100vw;">
      <mu-button slot="left" icon @click="closeFullscreenDialog">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <mu-button slot="right" icon @click="shareSong">
        <mu-icon value="share"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="player-main" @click="showWords = !showWords">
      <div id="bgImg" :style="`background-image: url(${getImg})`"></div>
      <div v-show="!showWords">
        <div id="indicator" :style="indicatorAnimation"><img src="../../assets/img/indicator.png" /></div>
        <div id="cd-box" :style="`background-image: url(${getImg});animation-play-state: ${animationPlayState};`">
          <img src="../../assets/img/cd-mine.png" width="100%" height="100%;" />
        </div>
        <div class="img-song-words-box">
          {{getOneRic && getOneRic.ric ? getOneRic.ric : currentSong.name}}
        </div>
      </div>
      <div v-show="showWords" class="song-words-box">
        <div class="volume-box">
          <mu-icon value="volume_down" color="white" left></mu-icon>
          <mu-slider :display-value="false" v-model="volume" :max="1" :step="0.01" color="parmiry" @change="setVolume" />
        </div>
        <div v-for="(item,index) in getLyricShow" :key="index" :id="index">
          {{item && item.ric ? item.ric : '&nbsp;'}}
        </div>
      </div>
    </div>
    <div class="play-bottom-options">
      <div class="likeAndComment">
        <mu-button @click="changeLike" icon color="rgba(255, 255, 255, 0.8)" large>
          <mu-icon v-if="!isLike" value="favorite_border" :size="24" />
          <mu-icon v-else value="favorite" color="red" :size="24" />
        </mu-button>
        <mu-button @click="openComment" icon color="rgba(255, 255, 255, 0.8)" large>
          <i class="iconfont icon-pinglun" style="font-size: 18px;"></i>
        </mu-button>
      </div>
      <div class="slider-box">
        <div class="current-time">{{sliderValue * 1000 | formatDate('mm:ss')}}</div>
        <mu-slider class="time-slider" :display-value="false" v-model="sliderValue" :max="getAllLength / 1000" :step="1" color="parmiry" @change="changeValue"></mu-slider>
        <div class="all-time">{{getAllLength | formatDate('mm:ss')}}</div>
      </div>
      <div class="option-box">
        <div>
          <mu-button @click="changePlayType" icon color="rgba(255, 255, 255, 0.8)" large>
            <i v-if="getPlayType == 1" class="iconfont icon-xunhuan1 playicon"></i>
            <i v-if="getPlayType == 2" class="iconfont icon-danquxunhuan1 playicon"></i>
            <i v-if="getPlayType == 3" class="iconfont icon-suijibofang1 playicon"></i>
          </mu-button>
        </div>
        <div>
          <mu-button @click="playLast" icon color="rgba(255, 255, 255, 0.8)" large>
            <mu-icon value="skip_previous" :size="32" />
          </mu-button>
        </div>
        <div>
          <mu-button icon color="rgba(255, 255, 255, 0.8)" large @click="playPauseSong">
            <mu-icon :value="centerIcon" :size="42" />
          </mu-button>
        </div>
        <div>
          <mu-button @click="playNext" icon color="rgba(255, 255, 255, 0.8)" large>
            <mu-icon value="skip_next" :size="32" />
          </mu-button>
        </div>
        <div>
          <mu-button @click="openMusicList" icon color="rgba(255, 255, 255, 0.8)" large>
            <mu-icon value="queue_music" :size="32" />
          </mu-button>
        </div>
      </div>
    </div>
    <div style="opacity: 0">{{setSongPlaying}}</div>
    <!-- 登录提示对话框 -->
    <mu-dialog title="需要登录才能设置" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      您还没有登录，是否前去登录？
      <mu-button slot="actions" flat color="gray" @click="openAlert = false">不需要</mu-button>
      <mu-button slot="actions" flat color="primary" @click="goLigin">去登录</mu-button>
    </mu-dialog>
  </mu-dialog>
</template>
<script>
let musicPlayImg = require('../../assets/icon/logo.png');
export default {
  name: 'music-play',
  props: {
    openFullscreenProp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      songName: 'JUST LIKE THIS',
      musicImg:
        'http://p1.music.126.net/ZDUo6vF_5ykD6E_08HE1kw==/3385396303317256.jpg',
      showWords: false,
      sliderValue: 0,
      // maxTime: 4.59,
      centerIcon: 'play_circle_outline',
      isPlaying: false,
      animationPlayState: 'paused',
      timer: null,
      indicatorAnimation: {
        animationDirection: 'normal',
        animationPlayState: 'paused',
        animationName: 'reverseIndicator'
      },
      allLength: 0,
      volume: 0,
      openCommentDialog: false,
      isLike: false,
      openAlert: false
    };
  },
  computed: {
    getOpenFullscreenProp() {
      return this.openFullscreenProp;
    },
    setSongPlaying() {
      this.isPlaying = this.$store.state.playing;
      this.changeAnimation();
      return this.$store.state.playing;
    },
    getAllLength() {
      return this.$store.state.musicDuration * 1000;
    },
    currentSong() {
      const currentSong = this.$store.state.currentSong;
      if (!currentSong.img || currentSong.img.length === 0) {
        if (currentSong.album) {
          this.getSongImg(currentSong.album.id, this.$store.state.currentIndex);
          this.getLyricServer(currentSong.id);
          this.getIsLike(currentSong.id);
        }
      }
      return this.$store.state.currentSong;
    },
    getImg() {
      let img = musicPlayImg;
      if (
        this.$store.state.currentSong.img &&
        this.$store.state.currentSong.img.length > 0
      ) {
        img = this.$store.state.currentSong.img;
        musicPlayImg = img;
      }
      return img;
    },
    getLyric() {
      const lyric = this.$store.state.lyric.split('\n');
      const lyricMap = lyric.map(v => {
        // eslint-disable-next-line
        const timeStr = v.substring(0, 11).replace(/[\[\]]/gi, '');
        const timeList = timeStr.split(':');
        let minAndS = Math.floor(parseFloat(timeList[1]) * 1000);
        const timeLength = parseInt(timeList[0]) * 60 * 1000 + minAndS;
        return {
          time: timeLength,
          ric: v.split(']')[1]
        };
      });
      console.log('lyricMap-->', lyricMap);
      return lyricMap;
    },
    getLyricShow() {
      let lyricMap = this.getLyric;
      const getOneRic = this.getOneRic;
      const index = lyricMap.indexOf(getOneRic);
      let showLyric = [];
      for (let i = index - 5; i < index + 6; i++) {
        if (i === -1) {
          showLyric.push({ ric: this.currentSong.name });
        } else {
          showLyric.push(lyricMap[i]);
        }
      }
      return showLyric;
    },
    getOneRic() {
      const sliderValue = this.sliderValue * 1000;
      for (let index in this.getLyric) {
        if (index === this.getLyric.length - 1) {
          return this.getLyric[index];
        }
        if (sliderValue <= this.getLyric[index].time) {
          return index < 2 ? this.getLyric[index] : this.getLyric[index - 1];
        }
      }
    },
    getPlayType() {
      return this.$store.state.playType;
    }
  },
  watch: {
    isPlaying(newVal) {
      console.log(newVal);
      if (newVal === true) {
        this.getSliderValue();
      } else {
        window.clearTimeout();
      }
    }
  },
  mounted() {
    console.log(this.getCurrentTime);
    this.volume = this.$store.state.audioelement
      ? this.$store.state.audioelement.volume
      : 0;
    console.log('this.volume', this.volume);
  },
  methods: {
    shareSong() {
      // document.getElementById('app-audio').play();
    },
    setVolume(value) {
      // console.log('value', value);
      this.$store.commit('setVolume', value);
    },
    changeValue(value) {
      this.sliderValue = value;
      this.$store.dispatch({
        type: 'set_CurrentTime',
        time: value
      });
    },
    getSliderValue() {
      const getAudioElement = this.$store.state.audioelement;
      // console.log('获取播放时间', getAudioElement.currentTime, this.isPlaying);
      this.sliderValue = getAudioElement.currentTime
        ? getAudioElement.currentTime
        : 0;
      setTimeout(() => {
        this.getSliderValue();
      }, 500);
    },
    changeAnimation() {
      this.centerIcon = this.$store.state.playing
        ? 'pause_circle_outline'
        : 'play_circle_outline';
      this.indicatorAnimation.animationPlayState = 'running';
      if (this.$store.state.playing) {
        this.animationPlayState = 'running';
        this.indicatorAnimation.animationName = 'reverseIndicator';
      } else {
        this.animationPlayState = 'paused';
        this.indicatorAnimation.animationName = 'goIndicator';
      }
    },
    playPauseSong() {
      if (this.$store.state.playing) {
        this.$store.commit('pause');
      } else {
        this.$store.commit('play');
      }
    },
    closeFullscreenDialog() {
      this.$emit('closeMusicPlayView', 'closeMusicPlayView');
    },
    async playLast() {
      const currentIndex = this.$store.state.currentIndex;
      let lastIndex = currentIndex - 1;
      // 当前是第一首
      if (currentIndex === 0) {
        lastIndex = this.$store.state.musicList.length - 1;
      }
      const lastSong = this.$store.state.musicList[lastIndex];
      console.log('lastSong', lastSong);
      if (!lastSong.img || lastSong.img.length === 0) {
        const img = await this.getSongImg(lastSong.album.id);
        this.$store.commit('setImg', { index: lastIndex, img });
        console.log(this.$store.state.musicList[lastIndex]);
      }
      this.getLyricServer(lastSong.id);
      this.$store.commit('playPrev');
    },
    async playNext() {
      const currentIndex = this.$store.state.currentIndex;
      let nextIndex = currentIndex + 1;
      const allLength = this.$store.state.musicList.length;
      // 当前是最后一首
      if (nextIndex === allLength) {
        nextIndex = 0;
      }
      const nextSong = this.$store.state.musicList[nextIndex];
      console.log('nextIndex', nextIndex, currentIndex);
      console.log('nextSong', nextSong);
      if (!nextSong.img || nextSong.img.length === 0) {
        const img = await this.getSongImg(nextSong.album.id);
        this.$store.commit('setImg', { index: nextIndex, img });
        console.log(this.$store.state.musicList[nextIndex]);
      }
      this.getLyricServer(nextSong.id);
      this.$store.commit('playNext');
    },
    async getLyricServer(id) {
      const res = await this.$http.get(this.globarVar_.musicApi.music.lyric, {
        params: { id, timestamp: new Date().getTime() }
      });
      if (res.data.code === 200) {
        console.log('res.data', res.data);
        this.$store.commit('setLyric', res.data.lrc ? res.data.lrc.lyric : '');
      }
    },
    async getSongImg(alid, setCurrent) {
      const res = await this.$http.get(this.globarVar_.musicApi.album, {
        params: { id: alid }
      });
      if (res.data.code === 200) {
        // 改变当前歌曲的img
        if (setCurrent) {
          const index = this.$store.state.currentIndex;
          this.$store.commit('setCurrentImg', {
            index,
            img: res.data.album.picUrl
          });
        }
        return res.data.album.picUrl;
      }
    },
    openMusicList() {
      this.$emit('openMusicList');
    },
    changePlayType() {
      this.$store.commit('setPlayType');
    },
    getIsLike(songid) {
      if (this.$store.state.loginStatus) {
        const playlist = this.$store.state.userPlayList;
        const userId = this.$store.state.userInfo.profile.userId;
        let likeList = {};
        playlist.map(v => {
          if (userId === v.userId) {
            likeList = v;
          }
          return v;
        });
        let songExist = false;
        for (let song of likeList.tracks) {
          if (song.id === songid) {
            songExist = true;
            break;
          }
        }
        this.isLike = songExist;
      }
    },
    async changeLike() {
      if (this.$store.state.loginStatus) {
        if (!this.isLike) {
          this.$http.get(this.globarVar_.musicApi.music.like, {
            params: {
              id: this.currentSong.id
            }
          });
          this.isLike = true;
        }
      } else {
        // 未登录
        this.openAlert = true;
      }
    },
    goLigin() {
      this.openAlert = false;
      this.closeFullscreenDialog();
      this.$router.push('/login');
    },
    async openComment() {
      this.closeFullscreenDialog();
      const currentSong = this.$store.state.currentSong;
      this.$router.push({
        path: '/commentPage',
        query: {
          id: currentSong.id,
          type: 'song'
        }
      });
      // this.openCommentDialog = true;
    }
  }
};
</script>
<style>
.player-main {
  height: 100vh;
  position: relative;
  z-index: 1;
  background: rgba(1, 1, 1, 1);
  /* padding-top: 56px; */
}
#bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  content: '';
  /* background-color: yellow; */
  color: red;
  font-weight: bold;
  /* background-image: url('https://ws1.sinaimg.cn/large/0064OUUqly1fs5vwzlqadj3050050dfq.jpg'); */
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(30px);
  -moz-filter: blur(30px);
  -ms-filter: blur(30px);
  -o-filter: blur(30px);
  filter: blur(30px);
  z-index: -1;
}
[id='5'] {
  color: aqua;
  font-size: 20px;
}
.img-song-words-box {
  text-align: center;
  padding-top: calc(25vh + 80vw);
  color: aqua;
}
.player-main::before {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  background-color: rgba(1, 1, 1, 0.2);
  z-index: 0;
}
.song-words-box {
  color: beige;
  text-align: center;
  padding-top: 200px;
  height: calc(100vh - 200px);
  overflow: hidden;
}
@keyframes goRotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes goIndicator {
  0% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(-20deg);
  }

  100% {
    transform: rotate(-30deg);
  }
}
@keyframes reverseIndicator {
  0% {
    transform: rotate(-30deg);
  }

  50% {
    transform: rotate(-20deg);
  }

  100% {
    transform: rotate(-10deg);
  }
}
#indicator {
  position: absolute;
  width: 24vw;
  left: 38vw;
  top: 58px;
  z-index: 10;
  transform-origin: 10% 0;
  transform: rotate(-10deg);
  animation: goIndicator 1s linear 0.1s;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  /* animation-iteration-count: 1; */
}
#indicator > img {
  width: 100%;
}
#cd-box {
  position: absolute;
  width: 70vw;
  height: 70vw;
  left: 15vw;
  top: 20vh;
  /* transform: translate3d(-50%, 0, 0); */
  animation: goRotate 16s linear infinite 0.1s;
  background: url('../../assets/img/cd-mine.png');
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 35vw;
  /* border: solid 2px red; */
  text-align: center;
}
#cd-box > img {
  z-index: -1;
}
.play-bottom-options {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 16px;
  z-index: 5;
  color: rgba(255, 255, 255, 0.8);
}
.slider-box {
  display: flex;
}
.time-slider {
  margin-bottom: 8px;
}
.current-time {
  width: 15vw;
  padding-right: 12px;
  text-align: center;
  font-size: 12px;
}
.all-time {
  width: 10vw;
  padding-left: 12px;
  text-align: center;
  font-size: 12px;
}
.option-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.playicon {
  font-size: 26px;
  line-height: 56px;
}
.volume-box {
  position: absolute;
  width: 100vw;
  padding: 8px 16px 8px 16px;
  top: 80px;
  display: flex;
}
.likeAndComment {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.back-fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
}
.comment-box {
  margin: 8px 0;
}
.commenter-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commenter-info {
  display: flex;
  align-items: center;
}
.comment-content-box {
  padding-left: 48px;
  font-size: 12px;
}
</style>
