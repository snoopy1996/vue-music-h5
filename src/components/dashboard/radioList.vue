<template>
  <div class="playlist-box">
    <div class="playlist-box-title">
      主播电台
      <mu-icon size="24" value="chevron_right" color="black"></mu-icon>
    </div>
    <mu-row gutter>
      <mu-col span="4" v-for="item in getList" :key="item.id" class="onelist-box">
        <img :src="item.picUrl" width="100%" />
        <div class="playlist-name">{{item.name}}</div>
      </mu-col>
    </mu-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistArray: []
    };
  },
  computed: {
    getList() {
      const listArray = this.playlistArray;
      if (listArray.length > 6) {
        return listArray.slice(0, 6);
      } else {
        return listArray;
      }
    }
  },
  async created() {
    this.playlistArray = await this.getPersonalized();
  },
  methods: {
    async getPersonalized() {
      const res = await this.$http.get(
        this.globarVar_.musicApi.personalized.djprogram
      );
      if (res.data.code === 200) {
        return res.data.result;
      }
    }
  }
};
</script>

<style scoped>
.playlist-box {
  margin-top: 16px;
  padding: 8px;
}
.playlist-box-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.playlist-name {
  font-size: 12px;
}
.onelist-box {
  padding-left: 3px;
  padding-right: 3px;
  margin-top: 8px;
}
.onelist-box > img {
  border-radius: 4px;
}
</style>
