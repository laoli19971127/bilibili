<template>
  <div class="container-commontList">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="commontList">
        <div class="commontList-left">
        <div class="userImg">
          <img
            v-if="item.userinfo && item.userinfo.user_img"
            :src="item.userinfo.user_img"
            alt
          />
          <img v-else src="@/assets/default_img.jpg" alt="" />
        </div>
        <div class="userMsg">
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>此用户无姓名</span>
          <span>{{ item.comment_content }}</span>
        </div>
      </div>
      <div class="commontList-right">
        <span>{{ item.comment_date }}</span>
        <span  @click="publishClick(item.comment_id)">回复</span>
      </div>

      </div>
      
      <!-- 二级评论 -->
      <div style="padding-left:8.333vw;">
        <child-commont  :commentChild="item.child" @PostPublish="publishClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import childCommont from "@/components/article/childCommont.vue";
export default {
  data() {
    return {
      commentList: null,
    };
  },
  components: {
    childCommont,
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if (res.data) {
        this.$emit("lengthselect", res.data.length);
      } 
      this.commentList = this.changeCommentData(res.data);
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
     publishClick(id) {
     this.$emit('publishClick',id)
    }
   
  },

  created() {
    this.commentData();
  },
};
</script>

<style lang="less" scoped>
.container-commontList {
  .commontList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .commontList-left {
       width: 80%;
      display: flex;
      .userImg {
        margin-right: 2.778vw;
        img {
          width: 9.722vw;
          height: 9.722vw;
        }
      }
      .userMsg {
        display: flex;
        flex-direction: column;
        font-size: 3.611vw;
        color: #555;
      }
    }
    .commontList-right {
      display: flex;
      flex-direction: column;
      font-size: 3.611vw;

      span:nth-child(2) {
        color: red;
      }
    }
  }
}
</style>
