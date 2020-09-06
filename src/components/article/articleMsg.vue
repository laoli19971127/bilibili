<template>
  <div class="contain-arts">
    <div class="articlemsg-top">
      <span>{{ model.category.title }}</span>
      <span>{{ model.name }}</span>
    </div>
    <div class="articlemsg-middle">
      <span>{{ model.userinfo.name }}</span>
      <span>146.4万次观看</span>
      <span>5281弹幕</span>
      <span>{{ model.date }}</span>
    </div>
    <div class="articlemsg-bottom">
      <p @click="collectionClick1" :class="{activeColor:collectionActive}">
        <span class="icon-star-full"></span>
        <span>收藏</span>
      </p>
      <p @click="subscriptClick1" :class="{activeColor:subscritionActive}">
        <span class="icon-bubble"></span>
        <span>关注</span>
      </p>
      <p>
        <span class="icon-redo2"></span>
        <span>分享</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["model","collectionActive","subscritionActive"],
  methods: {
    //收藏文章
    collectionClick1() {
      this.$emit("collectionClick")
    },
    //点击关注发帖用户
    subscriptClick1() {
      this.$emit("subscriptClick")
    },
   
  }
};
</script>

<style lang="less">
.contain-arts {
  padding: 20px 20px;
  .articlemsg-top {
    span:nth-child(1) {
      color: #fb7299;
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 10px;
    }
    span:nth-child(2) {
      margin-left: 20px;
    }
  }
  .articlemsg-middle {
    padding: 20px 3px;
    span {
      color: #aaa;
      font-size: 3.333vw;
      margin-right: 2.778vw;
    }
    span:nth-child(1) {
      color: black;
      font-size: 4vw;
      padding-right: 2.778vw;
    }
  }
  .articlemsg-bottom {
    padding: 0 3px;
    display: flex;
    p {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        margin-right: 3px;
        font-size: 21px;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }
    .activeColor {
      color: #fb7299;
    }
  }
}
</style>
