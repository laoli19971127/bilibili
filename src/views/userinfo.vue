<template>
  <div class="userinfo">
    <navbar />
    <img src="@/assets/bannerTop_new.png" alt="" class="backImg" />
    <user-details :userInfo="model" />
    <user-article />
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import userDetails from "@/components/userComponent/userDetail.vue";
import userArticle from "@/components/userComponent/userArticle.vue";
export default {
  data() {
    return {
      model: {}
    };
  },
  components: {
    Navbar,
    userDetails,
    userArticle
  },
  methods: {
    async userData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    }
  },
  created() {
    this.userData();
  }
};
</script>

<style lang="less">
.userinfo {
  .backImg {
    height: 11px;
    width: 100%;
  }
}
</style>
