<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div>
      <P>
        请输入内容
        <van-icon class="ipt-icon" name="search" />
      </P>
    </div>
    <div @click="userMsg">
      <img src="@/assets/default_img.jpg" alt="" />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    userMsg(){
      if(localStorage.getItem("token")){
         this.$router.push('/edit')
      }else{
         this.$router.push('/login')
      }
    }
  }

};
</script>

<style lang="less">
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30.556vw;
    img {
      width: 80%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 1.389vw;
    p {
      font-size: 3.333vw;
      line-height: 7.222vw;
      padding-left: 6.944vw;
      background-color: #f4f4f4;
      height: 7.222vw;
      width: 100%;
      border-radius: 11.999px;
      position: relative;
      color: #aaa;
      .ipt-icon {
        position: absolute;
        left: 2.778vw;
        top: 50%;
        transform: translate(0, -50%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24.001px;
      height: 24.001px;
    }
    p {
      padding: 5px 10.001px;
      margin: 0 7.999px;
      background-color: #fb7299;
      color: white;
      border-radius: 4px;
      font-size: 13px;
    }
  }
}
</style>
