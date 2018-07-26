<template>
  <div style="padding-bottom: 24px;">
    <mu-flex class="demo-linear-progress" v-if="loading">
      <mu-linear-progress color="#E5463B"></mu-linear-progress>
    </mu-flex>
    <div class="dymaic-bg">
      动听音乐，动态人生
    </div>
    <event-view :events="events" />
    <mu-button fab color="primary" style="position:fixed;right: 16px;bottom: 56px;" @click="getEvent">
      <mu-icon value="refresh"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
import eventView from '../eventView/eventView';
export default {
  components: {
    eventView
  },
  data() {
    return {
      events: [],
      loading: false
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    async getEvent() {
      this.loading = true;
      try {
        const res = await this.$http.get(
          this.globarVar_.musicApi.user.firendEvent,
          {
            params: { timestamp: new Date().getTime() }
          }
        );
        console.log('res', res);
        this.events = res.data.event.map(v => {
          if (v.json) {
            v.jsonP = JSON.parse(v.json);
          }
          return v;
        });
        const json0 = JSON.parse(res.data.event[0].json);
        console.log(json0);
      } catch (err) {
        console.log('err', err);
      }
      this.loading = false;
    }
  }
};
</script>

<style>
.dymaic-bg {
  background-image: url('http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg');
  background-size: 100%;
  height: 35vh;
  text-align: center;
  padding: 32px;
  color: aliceblue;
  font-size: 20px;
  font-weight: 600;
}
.event-box {
  margin: 8px 0;
  padding: 8px;
}
.authorAndReson-box {
  display: flex;
}
.authorAndReson-box > .avatar-box {
  margin-right: 8px;
}
.showtime-box {
  font-size: 12px;
  color: gray;
}
.img-box {
  display: flex;
}
.json-box {
  padding-left: 48px;
  word-wrap: break-word;
}
.music-box {
  display: flex;
  margin-left: 48px;
  background-color: rgba(0, 0, 0, 0.16);
  align-items: center;
}
.album-img-box {
  width: 48px;
  height: 48px;
}
.album-img-box > img {
  height: 48px;
}
.music-box > .songinfo-box {
  font-size: 13px;
  padding-left: 8px;
}
</style>
