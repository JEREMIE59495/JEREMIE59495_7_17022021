<template>
    <div class='users_connected'>
		<h4>Contacts</h4>
        <ul v-bind:key="index" v-for="(userConnected, index) in userConnected">
           <li>{{userConnected.first_name}} {{userConnected.last_name}}</li>
       </ul>
    </div>
</template>
<script>
import axios from'axios'

export default {
    name:'User_connected',
    data(){
        return{
            userConnected:null,
        }
    },

    mounted(){
        axios
        .get ('http://localhost:8080/api/employee')
        .then((response) => {
            this.userConnected = response.data;
        })
        .catch(error => console.log(error));
    },
}
</script>
<style scoped>
    .users_connected{
        width: 20%;
        background: rgba(175, 175, 175, 0.075);
        border-radius:1em;
        float:right;
        margin-top:-30em;
        margin-right:1em;
    }

    h4{
        margin: 1em 0em 0em 2em;
        text-align: left;
        }

    li{
        text-align: left;
        width:100%;
        list-style:none;
        font-size:1em;
        margin-left:1em;
        padding:0;
    }

    @media  screen and (max-width:600px) {
        .users_connected{
           display:none;
        }
    }

    @media  screen and (min-width:601px) and (max-width:800px) {
        .users_connected{
            width:30%;
            float:left;
            margin-top:0em;
        }
        ul{
            width:100%
        }
}
</style>