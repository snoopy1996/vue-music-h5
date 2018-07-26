export default {
  set_MusicDuration({ commit }, obj) {
    console.log('可以播放了，设置时长', obj);
    commit('setMusicDuration', obj);
  },
  set_CurrentTime({ commit }, obj) {
    commit('setCurrentTime', obj);
  },
  set_Play({ commit }) {
    commit('play');
  }
};
