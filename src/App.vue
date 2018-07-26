<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <audio-ctr />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import audioCtr from './components/audioCtrl/audioCtr';
export default {
  name: 'app',
  components: {
    audioCtr
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  background-color: rgb(238, 238, 238);
  min-height: 100vh;
  /*margin-top: 60px;*/
}
</style>
