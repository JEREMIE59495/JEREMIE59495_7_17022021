<template >

  <section class="head">
      <router-link class="deconnexion" to="/">Déconnexion</router-link>
      <img alt="logo groupomania" src="../../assets/icon.png ">
    <h2>GROUPOMANIA</h2>
  </section> 
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .head{
    width:55%;
    float:right;
    margin-left:auto;
    margin-right:auto;
    height:4em;
    margin-right:22.5%;
    background: white;
  }

  img{
    width:4em;
    height:4em;
    float:left;
  }

  h2{
    width:25%;
    float:left;
    margin-top:0.7em;
    margin-left:0;
    color:black;
  }

  .deconnexion{
    float:right;
    margin-right:1em;
    margin-top:2em;
    text-decoration:none;
    font-weight: bold;
    color:black;
  }

  .deconnexion:hover{
    color:blue;
  }

  @media  screen and (max-width:600px) {
    .head{
      width:100%;
      height:5em;
      margin:0;
    }

    .deconnexion{
      margin-top:3.5em;
    }
  }

  @media  screen and (min-width:601px) and (max-width:750px) {
    .head{
      width:70%;
      float:right;
      margin:0;
    }
  }
  @media screen and (min-width:761px) and (max-width:950px){
  .head{
      width:70%;
      float:right;
      margin:0;
    }
  }
</style>
