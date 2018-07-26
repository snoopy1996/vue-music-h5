<template>
  <div>
    <div v-if="events && events.length > 0">
      <event-view :events="events" />
      <!-- <event-view :events="events" /> -->
    </div>
    <div v-else class="noDymaics-box">
      暂时没有动态
    </div>
  </div>
</template>

<script>
import eventView from '../eventView/eventView';
export default {
  components: {
    eventView
  },
  computed: {
    getUser() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return { events: [] };
  },
  created() {
    this.getEvent(this.getUser.profile.userId);
  },
  methods: {
    async getEvent(uid) {
      const res = await this.$http.get(this.globarVar_.musicApi.user.event, {
        params: { uid }
      });
      console.log('res-->', res);
      if (res.data.code === 200) {
        this.events = res.data.events.map(v => {
          if (v.json) {
            v.jsonP = JSON.parse(v.json);
          }
          return v;
        });
      }
    }
  }
};
</script>

<style scoped>
.noDymaics-box {
  padding: 32px;
  text-align: center;
  color: gray;
}
</style>
