<template>
  <div class="appContainer">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>


<script>
  import Header from "./components/Header"
  import Home from "./components/Home";
  import Footer from "./components/Footer";
  export default {
    components : {
      appHeader : Header,
      appFooter : Footer
    },
    created() {
      this.$store.dispatch("initAuth")
    }
  }
</script>
<style>
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity .3s;
  }
  .fade-leave{
  }
  .fade-leave-active{
    transition: opacity .3s;
    opacity: 0;
  }
  body{
    background-color: rgb(255, 236, 198);
  }

</style>
