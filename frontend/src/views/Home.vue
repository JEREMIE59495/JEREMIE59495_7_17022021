<template>
  <div class="home_page">
    <div class='menu'>
      <Headers class="header"/>
    </div>
    <div class="logo">
      <img alt="logo groupomania" src="../assets/icon-left-font-monochrome-black.png">
    </div>
  </div>
</template>

<script>
import Headers from '@/components/Header.vue'
export default {
  name: 'Interface',
  components:{
    Headers
  }
}
</script>

<style scoped lang="scss">
  .home_page{
    width:100%;
    padding:0;
  }

  .menu{
    width:100%;
    height:2em;
  }
  
  img{
    height:30em;
    margin-top:0em;
    margin-left: auto;
    margin-right: auto;
  }
  
  .header{
    float: right;
    margin-right: 1em;
  }
  
  @media screen and (max-width:600px) {
    img{
      margin-top:5em;
      height:16em;
    }
  }

  @media screen and (min-width:601px) and (max-width:750px) {
    img{
      height:16em;
    }
  }
  
</style>
