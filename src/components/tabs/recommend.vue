<template>
  <mu-list textline="two-line">
    <mu-list-item avatar :ripple="false" button @click="setSong(33894312)">
      <!-- <mu-ripple>
        <mu-list-item-content>
          <mu-list-item-title>情非得已（童声版）</mu-list-item-title>
          <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">群星</mu-list-item-sub-title>
          <mu-list-item-sub-title>
            热门华语275
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-ripple> -->
      <!-- <mu-list-item-action>
        <mu-list-item-after-text>15 min</mu-list-item-after-text>
        <mu-checkbox color="yellow700" v-model="selects" value="value1" uncheck-icon="star_border" checked-icon="star"></mu-checkbox>
      </mu-list-item-action> -->
    </mu-list-item>
    <mu-divider></mu-divider>
    <div @click="clickTest">deduehfiuf</div>
  </mu-list>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {
      musicList: [
        {
          src: ''
        }
      ]
    };
  },
  methods: {
    setSong: async function(id) {
      console.log(
        '设置歌曲',
        this.globarVar_,
        this.globarVar_.musicApi.music.detail
      );
      const res = await this.$http.get(this.globarVar_.musicApi.music.detail, {
        params: {
          ids: id,
          timestamp: new Date().getTime()
        }
      });
      console.log('res', res);
      if (res.data.code === 200) {
        const songDetail = res.data.songs[0];
        this.$store.commit('setSong', songDetail);
      }
      this.$store.commit(
        'setPlaySongTest',
        this.globarVar_.musicApi.music.spareUrl(id)
      );
      this.getLyric(id);
    },
    async getLyric(id) {
      const res = await this.$http.get(this.globarVar_.musicApi.music.lyric, {
        params: { id, timestamp: new Date().getTime() }
      });
      if (res.data.code === 200) {
        console.log('res.data', res.data);
        this.$store.commit('setLyric', res.data.lrc.lyric);
      }
    },
    async clickTest() {
      const res = await this.$http.post(
        'http://supersy.xyz:7001/api/auth/register',
        {
          userName: 'supersy',
          password: 'supersypwd'
        }
      );
      console.log('res', res);
    }
  }
};
</script>

<style>
</style>
