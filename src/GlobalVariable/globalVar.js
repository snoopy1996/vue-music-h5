/**
 * @author : 忍把浮名换此生
 * @e-mail : 2295161275@qq.com
 * @create date : 2017-12-17 15:59
 * @description :
 */
const serverHost = 'http://www.supersy.xyz:4000';
const musicApi = {
  wangyiApi: 'https://api.imjad.cn/cloudmusic/',
  auth: {
    login: serverHost + '/login/cellphone',
    loginRefresh: serverHost + '/login/refresh'
  },
  user: {
    userDetail: serverHost + '/user/detail',
    subcount: serverHost + '/user/subcount',
    updateUser: serverHost + '/user/update',
    playlist: serverHost + '/user/playlist',
    playlistUp: serverHost + '/playlist/update',
    dj: serverHost + '/user/dj',
    follows: serverHost + '/user/follows',
    followeds: serverHost + '/user/followeds',
    event: serverHost + '/user/event',
    record: serverHost + '/user/record',
    sign: serverHost + '/daily_signin',
    firendEvent: serverHost + '/event',
    signin: serverHost + '/daily_signin'
  },
  singerAbout: {
    list: serverHost + '/artist/list',
    sub: serverHost + '/artist/sub',
    unsub: serverHost + '/artist/unsub',
    sublist: serverHost + '/artist/sublist'
  },
  playlist: {
    catlist: serverHost + '/playlist/catlist',
    hot: serverHost + '/playlist/hot',
    toplist: serverHost + '/top/playlist',
    highquality: serverHost + '/top/playlist/highquality',
    detail: serverHost + '/playlist/detail',
    created: serverHost + '/playlist/create',
    sub: serverHost + '/playlist/subscribe',
    tracks: serverHost + '/playlist/tracks',
    simi: serverHost + '/simi/playlist'
  },
  music: {
    url: serverHost + '/music/url',
    spareUrl(musicid) {
      return `http://music.163.com/song/media/outer/url?id=${musicid}.mp3`;
    },
    lyric: serverHost + '/lyric',
    detail: serverHost + '/song/detail',
    simi: serverHost + '/simi/song',
    simiUser: serverHost + '/simi/user',
    like: serverHost + '/like'
  },
  serarch: {
    serarch: serverHost + '/search',
    hot: serverHost + '/search/hot'
  },
  comment: {
    music: serverHost + '/comment/music',
    album: serverHost + '/comment/album',
    playlist: serverHost + '/comment/playlist',
    dj: serverHost + '/comment/dj',
    like: serverHost + 'comment/like'
  },
  resource: {
    banner: serverHost + '/banner',
    recommendList: serverHost + '/recommend/resource',
    recommendSong: serverHost + '/recommend/songs'
  },
  album: serverHost + '/album',
  singer: {
    artists: serverHost + '/artists',
    album: serverHost + '/artist/album',
    desc: serverHost + '/artist/desc',
    simi: serverHost + '/simi/artist'
  },
  top: {
    abbum: serverHost + '/top/album',
    artists: serverHost + '/top/artists',
    list: serverHost + '/top/list'
  },
  personalized: {
    personalized: serverHost + '/personalized',
    newsong: serverHost + '/personalized/newsong',
    recommend: serverHost + '/program/recommend',
    privatecontent: serverHost + '/personalized/privatecontent',
    djprogram: serverHost + '/personalized/djprogram'
  }
};

export default {
  musicApi
};
