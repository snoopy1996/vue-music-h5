<template>
  <mu-paper class="userinfo-box" :zDepth="3">
    <div class="info-type">
      <div class="type-title">个人信息</div>
      <div class="info-box">
        <div>
          <span style="color:gray">等级：</span> {{getUser.level}}
        </div>
        <div>
          <span style="color:gray">性别：</span> {{getUser.profile.gender == 0 ? '保密' : getUser.profile.gender == 1 ? '男生' : '女生'}}
        </div>
        <!-- <div>
          <span style="color:gray">地区：</span> {{getUser.profile.city}}
        </div> -->
        <div>
          <span style="color:gray">账号时长：</span> {{getUser.createDays}}天
        </div>
        <div>
          <span style="color:gray">出生日期：</span> {{getUser.profile.birthday | formatDate('yyyy-MM-dd')}}
        </div>
        <!-- <div>
          <span style="color:gray">个签：</span> {{getUser.profile.signature}}
        </div> -->
      </div>
    </div>
    <div class="info-type">
      <div class="type-title">个人介绍</div>
      <div class="info-box">
        <div v-if="getUser.profile.signature" style="margin-bottom: 16px;">
          {{getUser.profile.signature}}
        </div>
        <div v-else style="padding: 16px 0;">
          还没有个人介绍
        </div>
      </div>
    </div>
  </mu-paper>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      openFullscreen: false
    };
  },
  created() {
    console.log('getUser', this.getUser);
  },
  methods: {}
};
</script>

<style scoped>
.type-title {
  border-left: 1px solid rgb(229, 70, 59);
  padding-left: 8px;
}
.info-type {
  margin-bottom: 16px;
  padding: 8px;
}
.info-box {
  padding-left: 8px;
}
.info-box > div {
  font-size: 12px;
  color: rgb(0, 0, 0, 0.75);
  margin-top: 4px;
}
</style>
