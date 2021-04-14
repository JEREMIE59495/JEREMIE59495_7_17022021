<!-- bloc Groupe pour voir ou ajouter un nouveau groupe-->
<template>
    <div class="groupe">
        <h3>Groupes</h3>
        <div class="listGroup">
            <ul> 
                <button class="btn_groupe" v-bind:key="index" v-for="(groupe,index) in groupe" @click='showThisPublication( groupe.id_groupe , groupe.name_group)'><img class="logo">{{groupe.name_group}}</button>
            </ul>
            <div class=" addNewGroup" @click="group">
              <i class="fas fa-plus"></i>
              <p>Créer un groupe</p>
            </div>
       </div>
   </div> 
</template>

<script>
    import axios from 'axios'

    export default { 
        name:'Groupe',
        data(){
            return{
                groupe:null,   
            }  
        },
     //fonction pour ouvrir l'ajout du nouveau groupe
        methods:{ 
            group:function(){
            this.$emit('openGroup')
            }, 

            showThisPublication(id_groupe , name_group){
                const infoGroup = []
                const nameGroup =[]
                nameGroup.push(name_group)
                infoGroup.push(id_groupe)
                //infoGroup.push(name_group)
                localStorage.setItem('group', nameGroup)
                localStorage.setItem('id_group', infoGroup),
                this.$emit('showThispublication', infoGroup)
                document.location.reload();
            }
        },

     // Récupère tous les groupes sur la db
        mounted(){
            axios
            .get ('http://localhost:8080/api/groupe')
            .then((response) => {
                this.groupe = response.data;
              //  console.log(this.groupe)
            });
        },
    }
</script>

<style scoped>
    .groupe{
        width: 22%;
        height: 23.6em;
    }

    .listGroup{
        display: flex;
        flex-direction: column;
        margin-top:0.5em;
        padding-left:2em;
    }

    h3{
        text-align: left;
        margin:1em 0em 0.5em 2em;
    }

    .btn_groupe{
        font-size:1em;
        border-radius:0.5em;
        width:10em;
        text-decoration: none;
        border:none;
        text-align:left;
        margin-bottom:0.5em;
        float:left
    }

    ul{
        padding:0em;
    }

    .addNewGroup{
        width:100%;
        height:1.5em;
        padding-left:0em;
        display:flex
    }

    .fa-plus{
        margin-right:0.5em;
    }

    p{
        margin:0em
    }

    .logo{
        width: 1.5em;
        height:1.5em;
        border-radius: 0.5em;
        margin-right:1em;
        background:rgba(255,215,215);
    }

    @media  screen and (max-width:600px) {
        .groupe{
        width:22%;
        height:1.5em;
        }

        .listGroup{
            display:none;
        }

        .groupe:hover .listGroup{
            display:inline;
        }

        .groupe:hover{
                height:auto;
        }
        .btn_groupe{
            width:15em;
        }
        .addNewGroup{
            width:15em;
            padding-left:50%;
        }
    }

    @media screen and (min-width:751px) and (max-width:950px){
        .listGroup{
            width:100%
        }
        .addNewGroup{
            padding:0em;
        } 
    }
</style>