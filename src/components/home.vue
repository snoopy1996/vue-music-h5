<template>
  <div>
    <header-m></header-m>
    <drawer></drawer>
    <div style="padding: 56px 0 32px;">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <botm-sheet />
  </div>
</template>
<script>
import headerM from './header/header';
import drawer from './drawer/drawer';
import botmSheet from './botmSheet/botmSheet';
export default {
  components: {
    headerM,
    drawer,
    botmSheet
  },
  created() {},
  mounted() {
    // const src =
    //   'http://m10.music.126.net/20180625135321/24fbfd267fa46f747a8d24faa4da5d0f/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3';
    // this.$store.commit('setPlaySongTest', src);
  }
};
</script>
<style scoped>
</style>
