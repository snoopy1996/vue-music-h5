/*
 * @Author: 忍把浮名换此生
 * @Date: 2018-06-17 20:57:13
 * @Last Modified by: 忍把浮名换此生
 * @Last Modified time: 2018-06-26 17:29:57
 */
export default {
  getSongSrc: state => state.currentSong.src,
  getSinger: state => state.currentSong.singer,
  getImg: state => state.currentSong.img,
  getName: state => state.currentSong.name,
  getLyric: state => state.currentSong.lyric,
  getAudioElement: state => state.audioelement,
  getCurrentTime: state => state.audioelement.currentTime
};
