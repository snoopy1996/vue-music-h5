<template>
  <mu-appbar color="#E5463B" class="header-box">
    <mu-button @click="headerPageToggle()" slot="left" icon>
      <mu-icon value="menu"></mu-icon>
    </mu-button>
    <mu-tabs color="#E5463B" slot="default" :value="getActive" indicator-color="rgba(1,1,1,0)" center @change="change">
      <mu-tab value="dymaic">
        <i class="iconfont">&#xe600;</i>
      </mu-tab>
      <mu-tab value="main">
        <i class="iconfont icon-wangyiyunyinle"></i>
      </mu-tab>
      <mu-tab value="person">
        <i class="iconfont">&#xe640;</i>
      </mu-tab>
    </mu-tabs>
    <mu-button slot="right" icon @click="goSearch">
      <mu-icon value="search"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>
<script>
import Bus from '@/eventBus/bus';

export default {
  components: {},
  data() {
    return {
      active: 'main'
    };
  },
  computed: {
    getActive() {
      return this.$route.name;
    }
  },
  created() {},
  methods: {
    headerPageToggle() {
      Bus.$emit('drawerToggle', { drawerBoo: true });
    },
    change(value) {
      this.$router.push(value);
    },
    goSearch() {
      this.$router.push('/musicSearch');
    }
  }
};
</script>
<style scoped>
@font-face {
  font-family: 'iconfont'; /* project id 511645 */
  src: url('//at.alicdn.com/t/font_511645_j2z1uhq6z9kvs4i.eot');
  src: url('//at.alicdn.com/t/font_511645_j2z1uhq6z9kvs4i.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_511645_j2z1uhq6z9kvs4i.woff') format('woff'),
    url('//at.alicdn.com/t/font_511645_j2z1uhq6z9kvs4i.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_511645_j2z1uhq6z9kvs4i.svg#iconfont')
      format('svg');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.button-margin {
  margin-left: 10px;
  margin-right: 10px;
}
.header-box {
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 101;
}
</style>
