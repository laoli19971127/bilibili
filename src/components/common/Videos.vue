<template>
  <div class="allvideo" @click="pathPush">
    <div class="vidioImg">
      <div class="imgtop">
        <img :src="list.img" alt="" />
      </div>
      <div class="watchs">
        <span>123</span>
        <span>{{ list.commentlen }}</span>
      </div>
    </div>
    <p>{{ list.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    pathPush() {
      if (this.$route.path != `/details/${this.list.id}`) {
        this.$router.push(`/details/${this.list.id}`);
      }
    },
  },
};
</script>

<style lang="less">
.allvideo {
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
  .vidioImg {
    position: relative;
    .imgtop {
      width: 100%;
      height: 27.778vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .watchs {
      padding: 0 2.778vw;
      margin-bottom: 1.389vw;
      position: absolute;
      bottom: 0.556vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      justify-content: space-between;
      color: white;
      display: flex;
      left: 0;
      right: 0;
    }
  }
}
</style>
