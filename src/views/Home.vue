<template>
  <div>
    <navbar></navbar>
    <is-scoll :category="category" ref="getActive"></is-scoll>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import isScoll from "@/components/common/isScoll.vue";
export default {
  data() {
    return {
      category: [],
    };
  },
  components: {
    Navbar,
    isScoll,
  },
  created() {
    this.gethomeData();
  },
  methods: {
    async gethomeData() {
      let res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      this.selectArticle();
      console.log(this.category)
    },
    changeCategory(data) {
      const category1 = data.map((item) => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = true;
        item.pagesize = 10;
        return item;
      });
      return category1;
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    categoryItem() {
      const categoryitem = this.category[this.$refs['getActive'].getActive()];
      return categoryitem;
    },
  },
};
</script>

<style></style>
