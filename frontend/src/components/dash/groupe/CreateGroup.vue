<!--Pop up pour ajouter un nouveau groupe-->
<template >
    <div class='bloc_new_group'>
        <div class='group'>
            <h3>Création d'un nouveau groupe</h3>
            <label for="createGroup">Nom du groupe : </label>
            <input type="text" id="createGroup" class="createGroup" v-model="name_group">
            <button  type="submit" @click="addGroup">Enregistrer</button><br>
            <button @click="closeGroup">Annuler</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default  {
        name:'createGroup',
       data(){
            return{             
                  name_group :null,         
            }
        }, 

        methods:{
            //fonction pour envoyer le nouveau groupe a la db
            addGroup(){  
                const id_groupe = this.name_group.slice(0,5)+'_'+Date.now()
                const name_group =this.name
                console.log(id_groupe)
                axios.post('http://localhost:8080/api/groupe' ,id_groupe +name_group,{
                headers:{
                     'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                },
                    
                   // name_group: this.name_group,
                   // id_groupe
                }).then((response)=>{  
                    console.log(response)
                })  
                document.location.reload();
                this.$emit('fermer-bloc')
            },
            closeGroup(){
                this.$emit('fermer-bloc')
            }
        }    
    }
</script>
<style scoped>
    .group{   
        height:7em;
        width:90%;
        padding-top:0.5em;
        margin-left:auto;
        margin-right: auto;
        text-align:center;
        border: 1px solid black;
        border-radius:0.5em;
    }

    button{
        margin: 1em;  
    }

    .bloc_new_group{
         margin-left:auto;
        margin-right: auto;
        margin-top:-29.4em;
        padding-top:5em;
        width:48%;
        height:36em;
        background: rgba(175, 175, 175, 0.075);
    }

    h3{
        margin:0;
    }

    @media screen and (max-width:420px){
        .bloc_new_group{
            width:100%;
            height: 27em;
            margin:0;
            padding:0;
        }

        .group{
            width:98%;
            margin-top:0em;
        }

        h3, .createGroup{
            margin-bottom: 1em;
        }
        
        
        button{
            margin:0;
        }
    }

    @media screen and(max-width:750px) {
        .bloc_new_group{
            width:100%;
            margin:0;
            float:right;
            
        }

        .group{
            margin:0;
        }
    }
        @media screen and (min-width:751px) and (max-width:950px){
    .bloc_new_group{
            width:70%;
            height:10em;
            margin-top:-20em;
            float:right;
        }

        .group{
            margin:0;
        }
    }
</style>
