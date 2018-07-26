<template>
  <div>
    <mu-paper v-for="item in events" :key="item.id" :class="'event-box'" :zDepth="3">
      <div class="authorAndReson-box">
        <div class="avatar-box">
          <mu-avatar>
            <img :src="item.user.avatarUrl">
          </mu-avatar>
        </div>
        <div>
          <div>{{item.user.nickname}} {{item.info.commentThread.resourceTitle ? item.info.commentThread.resourceTitle.slice(0,5) : ''}}</div>
          <div class="showtime-box">{{item.showTime | formatDate('yyyy年MM月dd日 hh:mm')}}</div>
        </div>
      </div>
      <div class="json-box">
        <div>
          {{item.jsonP.msg}}
        </div>
        <div v-if="item.pics && item.pics.length > 0">
          <img :src="item.pics[0].originUrl" style="width: 70%;border-radius: 8px;" />
        </div>
      </div>
      <div class="music-box" v-if="getName(item.jsonP)" @click="goSearch(getName(item.jsonP))">
        <div class="album-img-box">
          <img :src="getImg(item.jsonP)" width="100%">
        </div>
        <div class="songinfo-box">
          <div>
            {{getName(item.jsonP)}}
          </div>
          <div style="color: gray;font-size: 12px;">
            {{getArtistsNames(item.jsonP)}}
          </div>
        </div>
      </div>
    </mu-paper>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      tyep: Array,
      default: []
    }
  },
  methods: {
    getArtistsNames(json) {
      let artistsname = '';
      for (let key in json) {
        if (key !== 'msg' && json[key] && json[key].artists) {
          for (let art of json[key].artists) {
            artistsname += art.name + ' ';
          }
          break;
        }
      }
      return artistsname;
    },
    getName(json) {
      if (json.resource) {
        return json.resource.name;
      }
      if (json.song) {
        return json.song.album.name;
      }
      if (json.album) {
        return json.album.name;
      }
      if (json.mv) {
        return json.mv.name;
      }
    },
    getImg(json) {
      if (json.resource) {
        return json.resource.picUrl;
      }
      if (json.song) {
        return json.song.album.picUrl;
      }
      if (json.album) {
        return json.album.picUrl;
      }
      if (json.mv) {
        return json.mv.imgurl;
      }
      return 'https://ws1.sinaimg.cn/large/0064OUUqly1fs5u8y5jn8j308c08bta3.jpg';
    },
    goSearch(searchInfo) {
      this.$router.push({
        path: 'musicSearch',
        query: {
          searchInfo
        }
      });
    }
  }
};
</script>

<style>
</style>
