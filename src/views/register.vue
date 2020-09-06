<template>
  <div>
    <login-top middleTop="注册bilibili">
      <div
        slot="right"
        style="font-size:3.611vw"
        @click="$router.push('/login')"
      >
        切换到登录页
      </div>
    </login-top>
    <login-text
      label="姓名"
      style="margin:10px 0px"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="res => (model.name = res)"
    ></login-text>
    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res => (model.username = res)"
    ></login-text>
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => (model.password = res)"
    ></login-text>
    <login-btn btntext="注册" @registerClick="registerClick"></login-btn>
  </div>
</template>

<script>
import LoginBtn from "@/components/common/LoginBtn.vue";
import LoginTop from "@/components/common/LoginTop.vue";
import LoginText from "@/components/common/LoginText.vue";
export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerClick() {
      let rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        let res = await this.$http.post("/register", this.model);
        this.$message.success(res.data.msg);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        setTimeout(() => {
          this.$router.push("/userinfo");
        }, 1000);
      } else {
        this.$message.fail("格式不正确请重新输入");
      }
    }
  }
};
</script>

<style></style>
