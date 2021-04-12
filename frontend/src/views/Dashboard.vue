<template class="Dashboard">
  <div class="dashboard">
    <div class="compo">
      <Entete />     
      <Profil v-on:openProfil="showTheProfil"/>
      <Groupe v-on:openGroup='showNewGroup' />        
      <CreateGroup class="new_group" v-on:fermer-bloc="closeGroup" v-show="groupeDisplay" />
      <Users/>
    </div>     
    <div class="pop_up">   
      <Publication class="publication" v-show="publicationDisplay"/> 
      <DetailProfil v-on:closeProfil="closeProfil" v-show="profilDisplay"/>
    </div>         
  </div>
</template>

<script>
  import Entete from '@/components/dash/Entete.vue'
  import Profil from '@/components/dash/Profil.vue'
  import Groupe from '@/components/dash/groupe/Groupe.vue'
  import Users from '@/components/dash/Users_connected.vue'
  import Publication from '@/components/dash/Publication.vue'
  import CreateGroup from '@/components/dash/groupe/CreateGroup.vue'
  import DetailProfil from '../components/dash/DetailProfil.vue'
 
  export default {
   name: 'Dashboard',
    components: {
      Entete,
      Profil,
      Groupe,
      Users,
      Publication,
      CreateGroup,
      DetailProfil,
   },

    el:'.Dashboard',
      data(){
        return{
          groupeDisplay:false,
          profilDisplay:false,
          publicationDisplay:true,
        }
      },
    
    methods:{
      //Affichage du pop up creation de groupe
      showNewGroup(){
        this.groupeDisplay= true;
        this.profilDisplay= false;
        this.publicationDisplay= false
      },

      closeGroup(){
        this.groupeDisplay=false; 
        this.publicationDisplay=true;
      },
    
      // Affichage des détail du profil
      showTheProfil(){
        this.profilDisplay= true;
        this.groupeDisplay=false; 
        this.publicationDisplay= false;
      },

      closeProfil:function(){
        this.profilDisplay= false;
        this.publicationDisplay= true;
        document.location.reload();
      },
    },
  }
</script>
<style scoped>
  .navLeft{
    width: 100%;
  }

  .dashboard{
    width:100%;
    background: rgba(240, 242, 245);
  }

  .pop_up{
    width:55%;
    margin-left:auto;
    margin-right:auto; 
    margin-top:-29.4em;
    position :relative;
    background: rgba(175, 175, 175, 0.075)
  }

  @media screen and (max-width:400px) {
    .pop_up{
      width:100%; 
    }
  }

  @media screen and (max-width:600px) {
    .pop_up{
      width:100%;
      margin-top:0em;
    }
  }

  @media screen and (min-width:601px) and (max-width:750px) {
    .pop_up{
      width:72.5%;
      float:right;
      margin-right:-1em;
     }

    .dashboard{
      width:97.5%;
      height:auto;
    }

    .new_group{
      width:70%;
      float:right;
    }

    .pop_up{
      margin-top:-41.4em;
    }
  }

  @media screen and (min-width:751px) and (max-width:950px){
  
    .pop_up{
      width:72.5%;
      float:right;
      margin-right:-1em;
      margin-top:-41.5em;
    }
  }
</style>


