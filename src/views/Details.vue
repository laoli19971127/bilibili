<template>
  <div v-if="model" class="container-detail">
    <navbar></navbar>
    <div class="videos">
      <video controls="controls" :src="model.content"></video>
    </div>
    <article-msg
      :model="model"
      :collectionActive="collectionActive"
      :subscritionActive="subscritionActive"
      @collectionClick="collectionClick"
      @subscriptClick="subscriptClick"
    ></article-msg>
    <div class="vidioTab">
      <videos
        v-for="(item, index) in commendList"
        :key="index"
        :list="item"
        class="videoItem"
      />
    </div>
    <!-- 评论头 -->
    <comment :dataLength="lens" @Postcomment="PostSuccess" ref="commentIpt" />
    <!-- 评论列表 -->
    <commont-list
      @lengthselect="(len) => (lens = len)"
      @publishClick="PostChildClick"
    />
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import articleMsg from "@/components/article/articleMsg.vue";
import Videos from "@/components/common/Videos.vue";
import comment from "@/components/article/comment.vue";
import commontList from "@/components/article/commontList.vue";
export default {
  data() {
    return {
      model: null,
      commendList: null,
      lens: null,
      collectionActive: null,
      subscritionActive: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
    };
  },
  components: {
    Navbar,
    articleMsg,
    Videos,
    comment,
    commontList,
  },
  created() {
    this.getdeatails();
    this.commendData();
    this.collectionInit();
  },
  watch: {
    $route() {
      this.getdeatails();
      this.commendData();
      this.collectionInit();
    },
  },
  methods: {
    //点击回复
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    // 获取文章信息
    async getdeatails() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        this.subscritionInit();
      }
    },
    //获取推荐文章
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    //进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        this.collectionActive = res.data.success;
      }
    },
    //进入页面获取是否关注
    async subscritionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid,
            },
          }
        );
        this.subscritionActive = res.data.success;
      }
    },
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.subscritionActive = true;
        } else {
          this.subscritionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    //发送评论
    async PostSuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      // let str = `${m}-${d}`;
      let str = "m" + "-" + "d";
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPulish.commentData();
      this.Postcom.parent_id = null;
      if (result.status == 200) {
        this.$msg.fail("评论发表成功");
      }
    },
  },
};
</script>

<style lang="less">
.container-detail {
  width: 100%;
  background-color: white;
  overflow: hidden;
}
.videos {
  height: 100%;
  height: 55.556vw;
  video {
    height: 100%;
    width: 100%;
  }
}
</style>
