<template  id="profils">
  <div class='bloc_detail_profil'>
    <div class='formModifProfil' >
      <div class="headProfil" >
        <a @click="next" class="linkAdvance" v-if='advance'>Paramètre avancé</a>
        <a @click="previous" class="linkGeneral" v-if='general'>Général</a>
        <h3> Détail de votre profil</h3>
        <button @click ="close" class="Annuler">X</button>
      </div>
      <div class='formProfil' v-if='modifProfil'>

        <div class="formulaire">
          <p>Nom :
          <span>  {{user.first_name}}</span>     
            <input type:text v-show='modifyFirstName' v-model="first_name">
            <button @click='modifyFN'><i class="fas fa-pen"></i></button>
          </p> 
          <p  >Prénom :
            <span> {{user.last_name}} </span>
            <input type:text v-if='modifyLastName' v-model ='last_name'>
            <button @click='modifyLN'><i class="fas fa-pen"></i></button>
          </p>
          <p>Confirmer votre mot de passe :
              <input id='pass' type="password" v-model='password' @keyup="ctrlMdp" >
          </p>
        </div>
      </div> 
      <div class="modifPassword" v-if='modifPassword'>
        <p>Ancien mot de passe :
          <input type="password"  v-model='password'>

        </p>
        <p>Nouveau mot de passe :
            <input id='pass' type="password" v-model='newPassword' placeholder=" 8 caractères minmum" @keyup="ctrlMdp">
        </p>
        <button class='supprimer' type="submit" @click ="deleteAccount">Supprimer le compte</button>  
      </div>
      <button class='envoyer' id='envoyer' type="submit" @click="updateClose" :disabled ="submitted" >Enregistrer</button>  
    </div>  
  </div>        
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import jwt_decode from'jwt-decode'

export default {
  name: 'DetailProfil',
    el:'#profils',
      data(){
        return{
          //Masquage des inputs a l'initialisation
          modifyFirstName: false,
          modifyLastName: false,
          //modifyEmail: false,
          modifProfil :true,
          modifPassword:false,
          //valeur de l'input
          first_name: null,
          last_name: null,
          email: null,
          password:"",
          newPassword:null,
         // validated:true,
          advance:true,
          general:false,

          submitted:""

        }    
      },
      computed:{
        ...mapState(['user']),
        infoUser(){
            return this.$store.state.user  
        },
      }, 
      //click du bouton pour refermer la div
      methods:{ 
        //Pour modifier le mdp
        next(){
          this.modifProfil= false,
          this.modifPassword= true,
          this.advance= false,
        this.general = true
        },

        //pour revenir au modif general
        previous(){
          this.modifProfil=true,
          this.modifPassword=false,
          this.general = false,
          this.advance= true
        },

        //Fermé le bloc de modification
        close(){
          this.$emit('closeProfil')
        },
        
        // Contrôle longueur mot de passe
        ctrlMdp(){ 
          if(this.password.length < 8){
              this.submitted=true
          }else{
            this.submitted=false
          }
        },

        updateClose(){

          if(this.first_name == null){
            this.first_name=this.$store.state.user.first_name
          }

          if(this.last_name == null){
            this.last_name=this.$store.state.user.last_name
          }

          if(this.email == null){
            this.email=this.$store.state.user.email
          }

          if(this.password == null || this.newPassword == null || this.password != this.newPassword){
               console.log('tvb')
         }else {
             alert('Votre mot de passe doit être différent')
         }

        //recuperation token
          const token = localStorage.getItem('userInfo')
          var decode = jwt_decode(token)
          let userId= decode.id
        
          //modification du profil
     
          axios
            .put('http://localhost:8080/api/employee/' + userId,{ 
                    first_name:this.first_name,
                    last_name:this.last_name,
                    email:this.email,

                    password: this.password,
                    //modif mdp
                    newPassword:this.newPassword
                
            })
            .then(res => console.log('titi',res))
              this.$emit('closeProfil')
              this.modifyFirstName=false
              this.modifyLastName=false
             // this.modifyEmail=false
              this.modifypassword=false
       // }
        },
          deleteAccount() {
             const deleteSession = window.confirm('Voulez vous vraiment suprrimer votre compte ?');
                if(deleteSession == true){
                    const token = localStorage.getItem('userInfo')
                    var decode = jwt_decode(token)
                    let userId= decode.id

                    axios
                    .delete("http://localhost:8080/api/employee/"+ userId,{
                     headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                }
                })
                    .then(() => {
                        localStorage.clear();
                        location.replace(location.origin);
                    })
                    .catch(error => console.log(error));
                    }
                    },
            //Affiche les inputs de modification
            modifyFN(){
              this.modifyFirstName=true
            },
            modifyLN(){
              this.modifyLastName=true
            },
          //  modifyE(){
          //    this.modifyEmail=true
          //  },
      },
}
</script>
<style scoped>
  .bloc_detail_profil{
      width:100%;
      height:40em;
      padding-top:5em;
      margin-left:auto;
      margin-right: auto;
      text-align:center; 
      background: rgba(175, 175, 175, 0.075)
  }
  a{
      cursor:pointer;
  }
  
  .formProfil{
    width:100%;
    display:flex;
  }

  .formModifProfil{
    width:90%;
    margin-left:auto;
    margin-right:auto;
    padding-bottom: 1em;
    border: 1px solid grey;
    border-radius:0.5em;
    background: rgba(240, 242, 245);  
  }
  .formulaire{
    width:100%;
  }

  .bloc_avatar{
    width:35%;
    border-right:1px solid grey;
  }
  .avatar{
    background:white;
    width:50%;
    height: 8em;
    margin-top:0.5em;
    margin-bottom:0.5em;
    margin-left:auto;
    margin-right:auto;
    border-radius:0.4em;
    padding:0;
  }
  

  .Annuler{
    height:2em;
    background:rgba(255, 0, 0, 0.527);
    border-radius:0.5em;
    margin:1em;
    text-align:right;
    margin-right:1%;
  }

  button{
    margin-left:0.5em;
  }

  .supprimer{
    margin-bottom:1em;
  }

  p{
    margin-left:2em;
    text-align:left;
    font-weight: bold;
    font-style: italic;
  }

  span{
    font-weight: normal;
    font-style: normal;
  }

  input{
    margin-left:0.5em;
    outline: none;
  }

  .headProfil{
    width:100%;
     background: rgb(226, 228, 231);   
    display:flex;
  }

  h3{
    width:75%;
    margin-bottom:0.2em;
  }
  a{
    width:20%;
    margin-left:0em;
    margin-top:0.5em;
    text-decoration: underline;
    font-style: italic;
  }

  @media screen and(max-width:750px) {
   .bloc_detail_profil{
    margin-top: 1em;
  }
}

</style>