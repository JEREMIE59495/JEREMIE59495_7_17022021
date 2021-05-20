<template>
    <div>
        <div>
            <img alt="logo groupomania" src="../assets/icon1.png">
            <fieldset>
                <legend>Formulaire d'inscription</legend>
                <div class="name">
                    <label for="name">Nom :</label>
                    <input type="text" id="name" name="first_name" v-model="dataSignup.first_name">
                    <label for="surname">Prénom :</label>
                    <input type="text" id="surname" name="last_name" v-model="dataSignup.last_name">
                </div>
                <div class=" mail">
                    <label for="mail">E-mail :</label>
                    <input type="email" id="mail" name="user_mail" v-model="dataSignup.email" >
                </div>
                <div class="password">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="user_password" v-model="dataSignup.password">
                </div>
                <button @click="signupUser" type="submit">S'inscrire</button><br>
                <small>Déjà inscrit : <router-link to="/Connexion">Connectez-vous !</router-link></small>
            </fieldset>
        </div>

   <span> {{err}} </span>
   <span> {{error}} </span>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"inscription",
    data(){
        return{
            
            dataSignup: {
                first_name:null,
                last_name:null,
                email:null,
                password:null
            },
        error:'',
           err:'',

        }
    },

    methods:{
        signupUser:function(){
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            console.log(this.dataSignup)
            if ((this.dataSignup !==null) && (regexEmail.test(this.dataSignup.email)))
            {
                axios
                .post('http://localhost:8080/api/users/signup', this.dataSignup )
                .then(response=>{
                        location.replace('http://localhost:8081/Connexion')
                        console.log(response)
                })
                .catch(error =>{
                    this.err = error.response.data.message

                    console.log(this.err)

                })
            } else {     
               this.err=('Adresse mail incorrect!!')
            }
        }
    }
}
</script>
<style scoped lang="scss">
 img{
        margin-top:8em;
        width:5em;
    }
    
    fieldset{
        width: 40%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 0.5em;
    }

    legend{
        width: 10.5em;
        margin-left: 0;
        text-align: left;
    }

    form{
        margin-top: 5em;
    }

    #name,#surname{
        width: 10em;
        margin: 1em 2em 1em 0.5em;
    }

    .name{
        text-align: left;
        margin-left: 15%;
    }

    select{
        width: 8em;
    }

    #mail{
        width: 12em;
        margin: 0.5em 2em 1em 0.5em;
    }

    .mail, .password{
        text-align: left;
        margin-left: 14%;
    }

    #password{
        margin: 0.5em 2em 1em 0.5em;
    }

    span{
        color:red;
        font-weight: bold;
    }


    @media screen and (min-width:601px) and (max-width:750px) {
        img{
            margin-top:1em;
        }
    }

</style>