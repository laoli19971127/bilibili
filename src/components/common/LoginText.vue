<template>
  <div>
    <van-field
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: ["label", "type", "placeholder", "rule"],
  methods: {
    handlerulg() {
      const rue = new RegExp(this.rule);
      if (rue.test(this.content)) {
        this.$emit("inputChange", this.content);
      }
    }
  },
  watch: {
    content() {
      this.handlerulg();
    }
  }
};
</script>

<style></style>
