<template >
    <div>
        <div class="connexion" >
            <img alt="logo groupomania" src="../assets/icon1.png">
            <fieldset>
                <legend>Connexion</legend>
                <div class=" mail">
                    <label for="email">E-mail :</label>
                    <input type="email" id="email" name="user_mail" v-model="dataLogin.email"><br>
                </div>
                <div class="password">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="user_password" autocomplete="current-password" v-model="dataLogin.password">
                </div>
                <button @click="login" type="submit">Se connecter</button><br>
                <small>Pas encore inscrit : <router-link to="/Inscription">enregistrez-vous !</router-link></small>
            </fieldset>
        </div>
        <span> {{err}}</span>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'connexion',
    data(){
        return{
            dataLogin: {
                email:null,
                password:null
            },
          err:''
        }
    },
    methods:{ 
        login:function(){
            //console.log(this.dataLogin)
            if(
                this.email !== null ||
                this.password !== null
            ){
            axios
            .post('http://localhost:8080/api/users/login',this.dataLogin
            )
            .then(response =>{
                localStorage.setItem('userInfo',response.data.token,)
                location.replace('http://localhost:8081/Dashboard')
               // console.log( response)
                //console.log(response.data)
            })
            .catch(error =>{
                this.err = error.response.data.message
                console.log(this.err);
                // console.log(error.response.data.message);
            })
        } else {  
            console.log('echec de la connexion')
            //console.log(this.error)
        }   
    }}
}

</script>
<style scoped lang="scss">
    img{
        margin-top:8em;
        width:5em;
    }

    fieldset{
        width: 30%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 0.5em;
    }

    legend{
        width: 5em;
        margin-left: 0;
        text-align: left;
    }

    form{
        margin-top: 10em;
    }

    #mail{
        width: 12em;
        margin: 0.5em 2em 1em 0.5em;   
    }

    .password{
        margin: 0.5em 2em 1em 6.5em;
        text-align: left;
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