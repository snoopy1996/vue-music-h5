<template>
  <div>
    <mu-appbar color="primary">
      <mu-button icon slot="left" @click="back">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      搜索
    </mu-appbar>
    <mu-paper :zDepth="3">
      <div class="input-box">
        <mu-text-field v-model="searchInfo" full-width placeholder="输入搜索内容" @change="searchMusic">
          <mu-button slot="append" icon color="primary" @click="searchMusic">
            <mu-icon value="search"></mu-icon>
          </mu-button>
        </mu-text-field>
      </div>
      <div v-if="!searchResult || searchResult.length === 0">
        <div style="padding-left: 16px;">热搜建议</div>
        <div class="hot-box">
          <mu-chip class="hot-item" v-for="(item, index) in hotList" :key="index" @click="searchInfo = item.first;searchMusic()">
            {{item.first}}
          </mu-chip>
        </div>
      </div>
      <mu-load-more v-else class="searchR-box" :loading="loading" @load="loadSongs">
        <song-list :songs="searchResult" />
      </mu-load-more>
    </mu-paper>
  </div>
</template>

<script>
import songList from './songList.vue';
export default {
  components: {
    songList
  },
  data() {
    return {
      searchInfo: '',
      hotList: [],
      searchResult: null,
      songCount: 0,
      loading: false
    };
  },
  created() {
    this.getHotSearch();
    if (this.$route.query.searchInfo) {
      this.searchInfo = this.$route.query.searchInfo;
      this.searchMusic();
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getHotSearch() {
      const res = await this.$http.get(this.globarVar_.musicApi.serarch.hot);
      console.log('res', res.data);
      this.hotList = res.data.result.hots;
      console.log('this.hotList', this.hotList);
    },
    async searchMusic() {
      if (this.searchInfo && this.searchInfo.length > 0) {
        const params = {
          keywords: this.searchInfo,
          offset: 0,
          limit: 30
        };
        const res = await this.$http.get(
          this.globarVar_.musicApi.serarch.serarch,
          {
            params
          }
        );
        this.songCount = res.data.result.songCount;
        this.searchResult = res.data.result.songs;
      } else {
        this.songCount = 0;
        this.searchResult = [];
      }

      // console.log(res);
    },
    async loadSongs() {
      this.loading = true;
      if (this.searchResult.length < this.songCount) {
        const params = {
          keywords: this.searchInfo,
          offset: this.searchResult.length,
          limit: 30
        };
        const res = await this.$http.get(
          this.globarVar_.musicApi.serarch.serarch,
          {
            params
          }
        );
        this.searchResult = this.searchResult.concat(res.data.result.songs);
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.input-box {
  padding: 16px;
}
.hot-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px;
}
.hot-item {
  margin: 4px;
}
.searchR-box {
  height: calc(100vh - 224px);
  overflow-y: auto;
}
</style>
