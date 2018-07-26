<template>
  <audio ref="audio" id="app-audio" autoplay @canplay="musicCanPlay" @ended="playEnded"></audio>
</template>
<script>
export default {
  name: 'audio-ctr',
  data() {
    return {};
  },
  mounted() {
    console.log('挂载播放器----audioCtr');
    const appAudio = document.getElementById('app-audio');
    this.$store.commit('setAudioElement', appAudio);
  },
  computed: {
    getCurrentSrc() {
      // return this.$store.state
    }
  },
  methods: {
    musicCanPlay() {
      this.$store.dispatch({
        type: 'set_MusicDuration',
        duration: Math.floor(this.$refs.audio.duration)
      });
      this.$store.dispatch({
        type: 'set_Play'
      });
    },
    playEnded() {
      console.log('歌曲播放结束了');
      this.$store.commit('playEnded');
    }
  }
};
</script>
<style scoped>
</style>
