<template>
  <div class="main-box">
    <mu-flex class="demo-linear-progress" v-if="loading">
      <mu-linear-progress color="#E5463B"></mu-linear-progress>
    </mu-flex>
    <div class="carousel-box">
      <mu-carousel class="carousel-body">
        <mu-carousel-item v-for="item in banners" :key="item.encodeId">
          <img :src="item.pic ? item.pic : item.picUrl" width="100%">
        </mu-carousel-item>
      </mu-carousel>
    </div>
    <personal-function @showLoading="loading = true;" @hideloading="loading = false" />
    <mu-divider style="background-color: rgba(0, 0, 0, 0.05);"></mu-divider>
    <tj-playlist />
    <mu-divider style="background-color: rgba(0, 0, 0, 0.05);"></mu-divider>
    <new-music />
    <mu-divider style="background-color: rgba(0, 0, 0, 0.05);"></mu-divider>
    <radio-list />

    <!-- <recommend /> -->
  </div>
</template>
<script>
import recommend from '../tabs/recommend.vue';
import tjPlaylist from './tjPlaylist.vue';
import personalFunction from './personalFunction.vue';
import newMusic from './newMusic.vue';
import radioList from './radioList.vue';

export default {
  name: 'dashboard',
  components: {
    recommend,
    tjPlaylist,
    personalFunction,
    newMusic,
    radioList
  },
  data() {
    return {
      active: 0,
      banners: [],
      loading: false
    };
  },
  async created() {
    this.getBanner().then(res => {
      this.banners = res;
    });
  },
  methods: {
    async getBanner() {
      const res = await this.$http.get(
        this.globarVar_.musicApi.resource.banner
      );
      if (res.data.code === 200) {
        return res.data.banners;
      }
    }
  }
};
</script>
<style scoped>
/* .main-box {
  padding: 8px;
} */
.carousel-box {
  height: calc(100vw * 0.36);
  background-color: rgb(229, 70, 59);
  padding: 16px 8px;
  margin-bottom: 24px;
}
.carousel-body {
  width: 100%;
  height: calc(100vw * 0.38);
  border-radius: 4px;
}
.grid-cell {
  border-radius: 4px;
  height: 36px;
  background: rgba(255, 255, 255, 0.8);
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell {
  background: rgba(0, 0, 0, 0.54);
}
</style>
