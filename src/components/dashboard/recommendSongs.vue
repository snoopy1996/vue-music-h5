<template>
  <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openRSongsProp" scrollable style="max-height: 100vh;">
    <mu-appbar title="推荐歌曲" color="primary" style="position: fixed;width: 100vw;">
      <mu-button slot="left" icon @click="closeRSongDialog">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <mu-button slot="right" icon>
        <mu-icon value="share"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div style="padding-top: 56px;">
      <recommend-songs-list :currentPlayList="currentPlayList" />
    </div>
  </mu-dialog>
</template>

<script>
import recommendSongsList from '../playList/songlist';
export default {
  components: {
    recommendSongsList
  },
  props: {
    openRSongsProp: {
      type: Boolean,
      default: false
    },
    recommendSongs: {
      type: Array,
      default: []
    }
  },
  computed: {
    getOpenRSongsProp() {
      return this.openRSongsProp;
    },
    currentPlayList() {
      return {
        tracks: this.recommendSongs
      };
    }
  },
  methods: {
    closeRSongDialog() {
      this.$emit('closeRSongDialog');
    }
  }
};
</script>

<style>
</style>
