<template>
  <mu-dialog transition="slide-bottom" fullscreen :open.sync="openRListProp" scrollable style="max-height: 100vh;">
    <mu-appbar title="推荐歌单" color="primary" style="position: fixed;width: 100vw;">
      <mu-button slot="left" icon @click="closeRListDialog">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <mu-button slot="right" icon>
        <mu-icon value="share"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div style="padding-top: 56px;">
      <mu-paper :zDepth="2">
        <mu-list textline="two-line">
          <div v-for="item in recommendList" :key="item.id">
            <mu-list-item avatar button @click="clickPlayList(item)">
              <mu-list-item-action>
                <div class="list-item-left">
                  <img :src="item.picUrl" style="width: 100%" />
                </div>
              </mu-list-item-action>
              <mu-list-item-content style="padding-left: 8px;">
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <div>{{item.trackCount}}首, by {{item.creator.nickname}}, 播放{{item.playcount}}次</div>
                  <div>{{item.copywriter}}</div>
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
        </mu-list>
      </mu-paper>
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
    openRListProp: {
      type: Boolean,
      default: false
    },
    recommendList: {
      type: Array,
      default: []
    }
  },
  computed: {
    getOpenRListProp() {
      return this.openRListProp;
    },
    currentPlayList() {
      return {
        tracks: this.recommendSongs
      };
    }
  },
  methods: {
    closeRListDialog() {
      this.$emit('closeRListDialog');
    },
    async clickPlayList(item) {
      this.$router.push({
        path: '/playListDetail',
        query: { id: item.id }
      });
    }
  }
};
</script>

<style scoped>
.list-item-left {
  background-color: rgb(103, 103, 103);
  /* padding: 8px; */
  width: 56px;
  height: 56px;
  border-radius: 10px;
}
.list-item-left > img {
  border-radius: 10px;
}
</style>
