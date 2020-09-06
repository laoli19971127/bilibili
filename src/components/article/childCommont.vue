<template>
  <div class="container-commontList">
    <div v-for="(item, index) in commentChild" :key="index">
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
          <span v-if="temp" @click="PostItemcomment(item.comment_id)">回复</span>
          <span v-else @click="PostItemcomment(item.comment_id)">回复</span>
        </div>
      </div>

      <commentchild-item :commentChild="item.child" @postChild="postChild" :temp="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild",'temp'],
  methods:{
    PostItemcomment(id) {
      this.$emit('postChild',id)
      this.$emit('PostPublish',id)
    },
    postChild(id) {
      this.PostItemcomment(id)
      this.$emit('PostPublish',id)
    }
  }
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
