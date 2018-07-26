/*
 * @Author: 忍把浮名换此生
 * @Date: 2018-06-17 20:41:50
 * @Last Modified by: 忍把浮名换此生
 * @Last Modified time: 2018-07-10 10:53:28
 * @desc: 全局状态的mutations
 */

export default {
  setUserPlayList(state, userPlayList) {
    state.userPlayList = userPlayList;
  },
  setLogin(state, userInfo) {
    state.loginStatus = true;
    state.userInfo = userInfo;
  },
  logout(state) {
    state.loginStatus = false;
    state.userInfo = {};
  },
  setSubCount(state, subCount) {
    state.subCount = subCount;
  },
  play(state) {
    state.playing = true;
    state.audioelement.play();
  },
  pause(state) {
    state.playing = false;
    state.audioelement.pause();
  },
  setAudioElement(state, ele) {
    console.log('挂载播放器');
    state.audioelement = ele;
  },
  setSong(state, musicObj) {
    state.currentSong = musicObj;
    console.log('state.currentSong', musicObj, state.currentSong.img);
  },
  setLyric(state, lyric) {
    state.lyric = lyric;
  },
  setMusicDetail(state, isShow) {
    state.showMusicDetail = isShow;
  },
  setShowSongSheet(state, isShow) {
    state.showSongSheet = isShow;
  },
  setPlayType(state) {
    if (state.playType === 3) {
      state.playType = 1;
    } else {
      state.playType++;
    }
  },
  // 播放下一曲
  playNext(state) {
    state.currentIndex++;
    const length = state.musicList.length;
    if (state.currentIndex >= length) {
      state.currentIndex = 0;
    }
    state.audioelement.setAttribute(
      'src',
      state.musicList[state.currentIndex].url
    );
    state.currentSong = state.musicList[state.currentIndex];
    state.playing = true;
    state.audioelement.load();
    state.audioelement.play();
  },
  // 播放上一曲
  playPrev(state) {
    state.currentIndex--;
    const length = state.musicList.length;
    if (state.currentIndex < 0) {
      state.currentIndex = length - 1;
    }
    state.audioelement.setAttribute(
      'src',
      state.musicList[state.currentIndex].url
    );
    state.currentSong = state.musicList[state.currentIndex];
    state.playing = true;
    state.audioelement.load();
    state.audioelement.play();
  },
  // 设置播放特定某一首歌曲
  playIndex(state, index) {
    state.currentIndex = index;
    const length = state.musicList.length;
    if (index < length) {
      state.audioelement.setAttribute(
        'src',
        state.musicList[state.currentIndex].url
      );
      state.currentSong = state.musicList[state.currentIndex];
      state.playing = true;
      state.audioelement.load();
      state.audioelement.play();
    }
  },
  // 设置播放歌单（默认从第0首开始播放）
  setMusicList(state, Obj) {
    console.log('设置播放列表', Obj);
    state.musicList = Obj.musicList;
    state.currentIndex = Obj.index ? parseInt(Obj.index) : 0;
    console.log('state.currentIndex', state.currentIndex);
    state.audioelement.setAttribute(
      'src',
      state.musicList[state.currentIndex].url
    );
    state.playing = true;
    state.audioelement.load();
    state.audioelement.play();
  },
  clearMusicList(state) {
    state.musicList = [];
  },
  setImg(state, Obj) {
    state.musicList[Obj.index].img = Obj.img;
  },
  setCurrentImg(state, Obj) {
    state.currentSong = { ...state.currentSong, img: Obj.img };
    state.musicList.splice(Obj.index, 1, state.currentSong);
    // state.musicList[Obj.index].img = Obj.img;
  },
  // 设置歌曲播放测试
  setPlaySongTest(state, src) {
    console.log('歌曲播放设置src');
    state.audioelement.setAttribute('src', src);
    state.playing = true;
  },
  setMusicListType(state, type) {
    state.musicListType = type;
  },
  setPushSong(state, song) {
    const lisType = state.musicListType;
    if (lisType !== 1) {
      state.musicList.push(song);
      state.currentIndex++;
    } else {
      state.musicList = [song];
      state.currentIndex = 0;
    }
  },
  // 设置音乐结束自动播放播放类型的歌曲
  playEnded(state) {
    let type = state.playType;
    // 顺序
    if (type === 1) {
      state.currentIndex++;
      const length = state.musicList.length;
      if (state.currentIndex >= length) {
        state.currentIndex = 0;
      }
      state.audioelement.setAttribute(
        'src',
        state.musicList[state.currentIndex].url
      );
      state.currentSong = state.musicList[state.currentIndex];
      state.playing = true;
      state.audioelement.load();
      state.audioelement.play();
    }
    // 单曲循环
    if (type === 2) {
      state.audioelement.currentTime = 0;
      state.playing = true;
      state.audioelement.play();
    }
    // 乱序
    if (type === 3) {
      const length = state.musicList.length;
      state.currentIndex = Math.floor(Math.random() * length);
      state.audioelement.setAttribute(
        'src',
        state.musicList[state.currentIndex].url
      );
      state.playing = true;
      state.audioelement.load();
      state.audioelement.play();
    }
    if (type === 4) {
      state.audioelement.currentTime = 0;
      state.playing = false;
      state.audioelement.pause();
    }
  },
  setCurrentTime(state, obj) {
    state.currentTime = obj.time;
    state.audioelement.currentTime = obj.time;
  },
  setMusicDuration(state, obj) {
    state.musicDuration = obj.duration;
  },
  setVolume(state, vomule) {
    state.audioelement.volume = vomule;
  }
};
