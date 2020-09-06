<template>
  <van-tabs v-model="active" swipeable>
    <van-tab v-for="(item, index) in category" :key="index" :title="item.title">
      <van-list
        v-model="item.loading"
        :immediate-check="false"
        :finished="item.finished"
        finished-text="我也是有底线的"
        @load="onLoad"
      >
        <div class="vidioTab">
          <videos
            v-for="(categoryitem, index1) in item.list"
            :key="index1"
            :list="categoryitem"
            class="videoItem"
          />
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script>
import Videos from "@/components/common/Videos.vue";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Videos,
  },
  props: ["category"],
  watch: {
    active() {
      const categoryitem = this.$parent.categoryItem();
      if (!categoryitem.list.length) {
        this.$parent.selectArticle();
      }
    },
  },
  methods: {
    getActive() {
      return this.active;
    },
    onLoad() {
      const categoryitem = this.$parent.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.$parent.selectArticle();
      }, 1000);
    },
  },
};
</script>

<style lang="less">
.vidioTab {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .videoItem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
