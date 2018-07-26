/*
 * @Author: 忍把浮名换此生
 * @Date: 2018-06-17 20:35:53
 * @Last Modified by: 忍把浮名换此生
 * @Last Modified time: 2018-07-07 10:41:55
 * @desc: 全局状态对象属性定义
 */

export default {
  // audio元素
  audioelement: null,
  // 当前歌曲信息{id, 地址, 图片, 歌手, 歌曲名, 歌词}
  currentSong: {
    id: -1,
    src: '',
    img: '',
    singer: {},
    name: ''
  },
  // 当前歌词内容
  lyric: '',
  // 打开歌曲详情页
  showMusicDetail: false,
  // 弹出歌单
  showSongSheet: false,
  // 当前歌曲索引
  currentIndex: 0,
  // 当前歌词索引
  lyricIndex: -1,
  // 是否正在播放
  playing: false,
  // 播放类型   1是自动播放  2是循环播放  3是随机播放
  playType: 2,
  // 当前播放的时间
  currentTime: 0,
  // 音乐的播放时长
  musicDuration: 0,
  // 当前播放歌单
  musicList: [],
  musicListType: 0, // 当前歌单类型 0是单曲 1是正常歌单 2是最近播放
  loginStatus: false,
  userInfo: {},
  subCount: {},
  userPlayList: []
};
