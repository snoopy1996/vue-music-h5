<template>
  <div>
    <mu-appbar color="primary">
      <mu-button slot="left" icon @click="back">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      {{type}}评论({{commentCount}})
    </mu-appbar>
    <mu-load-more class="allComment-box" :loading="loading" @load="loadMore">
      <div v-if="hotComments.length > 1" class="list-box">精彩评论</div>
      <div v-for="(item, index) in hotComments" :key="index + 'hot'" class="comment-box">
        <div class="commenter-box">
          <div class="commenter-info">
            <mu-avatar>
              <img :src="item.user.avatarUrl">
            </mu-avatar>
            <div style="padding-left: 8px;">
              <div>{{item.user.nickname}}</div>
              <div style="font-size:12px;color: gray;">{{item.time | formatDate('yyyy年MM月dd日')}}</div>
            </div>
          </div>
          <div class="liekCount" style="font-size: 12px;display: flex">
            <mu-icon value="thumb_up" color="gray" :size="18" style="margin-right: 4px;"></mu-icon>
            <span>{{item.likedCount}}</span>
          </div>
        </div>
        <div class="comment-content-box">
          {{item.content}}
        </div>
        <mu-divider></mu-divider>
      </div>
      <div class="list-box">所有评论</div>
      <div v-for="(item, index) in commentList" :key="index" class="comment-box">
        <div class="commenter-box">
          <div class="commenter-info">
            <mu-avatar>
              <img :src="item.user.avatarUrl">
            </mu-avatar>
            <div style="padding-left: 8px;">
              <div>{{item.user.nickname}}</div>
              <div style="font-size:12px;color: gray;">{{item.time | formatDate('yyyy年MM月dd日')}}</div>
            </div>
          </div>
          <div class="liekCount" style="font-size: 12px;display: flex">
            <mu-icon value="thumb_up" color="gray" :size="18" style="margin-right: 4px;"></mu-icon>
            <span>{{item.likedCount}}</span>
          </div>
        </div>
        <div class="comment-content-box">
          {{item.content}}
        </div>
        <mu-divider></mu-divider>
      </div>
    </mu-load-more>
    <div v-if="this.commentList.length == this.commentCount" style="color:gray;text-align: center;font-size: 12px">
      已加载全部评论
    </div>
    <mu-button fab color="info" class="back-fab" @click="back">
      <mu-icon value="arrow_back"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      commentCount: 0,
      api: '',
      hotComments: [],
      loading: false,
      type: '歌曲',
      id: '',
      typeQuery: ''
    };
  },
  created() {
    const query = this.$route.query;
    this.id = query.id;
    this.typeQuery = query.type;
    if (query.type === 'playlist') {
      this.api = this.globarVar_.musicApi.comment.playlist;
      this.type = '歌单';
    } else {
      this.api = this.globarVar_.musicApi.comment.music;
    }
    // console.log('进入评论页面');
    this.id = query.id;
    this.getCommentList(query.id);
  },
  activated() {
    const query = this.$route.query;
    if (this.typeQuery !== query.type || this.id !== query.id) {
      this.id = query.id;
      this.typeQuery = query.type;
      if (query.type === 'playlist') {
        this.api = this.globarVar_.musicApi.comment.playlist;
        this.type = '歌单';
      } else {
        this.api = this.globarVar_.musicApi.comment.music;
      }
      this.id = query.id;
      this.getCommentList(query.id);
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getCommentList(id) {
      const res = await this.$http.get(this.api, {
        params: {
          id,
          offset: 0
        }
      });
      this.commentCount = res.data.total;
      this.hotComments = res.data.hotComments;
      this.commentList = res.data.comments;
    },
    async loadMore() {
      console.log(
        'this.commentList.length < this.commentCount',
        this.commentList.length < this.commentCount
      );
      if (this.commentList.length < this.commentCount) {
        this.loading = true;
        const res = await this.$http.get(this.api, {
          params: {
            id: this.id,
            offset: this.commentList.length
          }
        });
        this.commentList = this.commentList.concat(res.data.comments);
        this.loading = false;
      }
    },
    goLigin() {
      this.openAlert = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scopde>
.allComment-box {
  /* padding: 24px 12px; */
  /* height: calc(100vh - 56px); */
  overflow-y: auto;
  background-color: white;
}
.comment-box {
  margin: 8px 12px;
}
.commenter-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commenter-info {
  display: flex;
  align-items: center;
}
.comment-content-box {
  padding-left: 48px;
  font-size: 13px;
}
.list-box {
  padding: 4px 16px;
  background-color: rgb(239, 240, 241);
}
</style>
