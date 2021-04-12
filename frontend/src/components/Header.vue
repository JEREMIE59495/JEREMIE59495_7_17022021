<template v-show="headPage">
  <div id="nav" >
    <router-link to="/Connexion">Connexion</router-link> |
    <router-link to="/Inscription">Inscription</router-link> 
  </div>
</template>
<script>
export default {
  el:'#nav',
   data(){
    return{
      deconnexion:true,
      headPage:true
    }
   },
  methods:{
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0.1em;
  background:white;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
