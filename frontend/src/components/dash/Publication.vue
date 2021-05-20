<template >
    <section>
         <!-- Formulaire de publication-->
        <div class="addComment">
            <h3>Ajouter une publication</h3>
            <div class="add-title">
                <h4>Titre</h4>
                <input class="input_text" placeholder="Titre de votre publication" v-model="titleOfComment">
            </div>
            <div class=" add-comment">
                <h4>Votre commentaire</h4>
                <textarea placeholder="Tapez votre texte ici" v-model="textOfComment"></textarea>
            </div>
            <div class ='btn_action'>
                <input type="file" name='image' @change="uploadFile" >
                <button class="bouton_bloc_ajout" @click="closeBlocComment">Annuler</button>        
                <button class="bouton_bloc_ajout" @click="PublieComment">Publier</button>
            </div>
       </div>
        <!--Titre du groupe -->
        <h1>{{name_group}}</h1>
        <!--Affichage des commentaires-->
        <div class="bloc-commentaire" v-bind:key="index"  v-for="(publication , index)  in publication"  >
            <div class='title'>
                {{publication.title}}
                <span class="auteur_publication"><strong>par</strong> <small>{{publication.auteur}}</small> <strong>le </strong><small>{{publication.createdAt}}</small> </span>
           <span class=“date” > Date de creation: {{moment(publication.createdAt).format("DD/MM/YYYY")}}</span>
            </div>
            <div class='commentaire'>
                <div class='bloc_commentaire'>{{publication.comment}}</div>
                <div class='bloc_image'><img :src="publication.image" class="imagePub"></div>  
            </div> 
            <!-- a controler -->  
            <div class="bloc_admin" v-if='user.password >=1'>
                <button class="btn_admin" v-bind:key='index'  @click="nocheck(publication,index)">Supprimer</button>
            </div>
        </div>
    </section>
</template>
<script>
import axios from'axios'
import {mapState} from 'vuex'
import moment from 'vue-moment'
export default {
    name:"mur",
    data(){
        return{
            moment:moment,
            //Etat actuel des input formulaire
            textOfComment:null,
            titleOfComment:null,
            publication:true, 
            noValidate :true ,
            index:true,
            selectedFileName:null,
            selectedFile:null,
            name_group:"",
            
        }
    },

    created:function(){
        this.name_group = localStorage.getItem('group');
        //console.log(this.name_group);
        if(this.name_group == null){
            this.name_group = " Fil d'actualité"
        }
    },

    computed: {
            ...mapState(['user']),       
            infoUser(){
                return this.$store.state.user   
            }, 
    },

    methods:{

        nocheck(index){
            const deletePublication =window.confirm("Voulez-vous vraiment supprimer cette publication");
            if(deletePublication == true){
            this.publication = this.publication.filter(i=> i !=index)
            console.log(index.id)
            axios
                .delete('http://localhost:8080/api/publication/'+index.id,{
               headers:{
                     'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                }
                })
                .then((response)=>{   
                    console.log(response)
                    this.showComment= false
                    document.location.reload();
                })
                .catch(error => console.log(error));
        }
},
        // insertion images
        uploadFile (event) {
            console.log(event)
            this.selectedFile = event.target.files[0]
            this.selectedFileName = event.target.files[0].name
            console.log(this.selectedFile.name)
        },

        PublieComment(){  
            const clicGroup = localStorage.getItem('id_group')  
            const fd = new FormData();
            if(this.selectedFile != null &&  this.selectedFileName != null){
                fd.append('img', this.selectedFile)
                fd.append('image', this.selectedFileName )
                fd.append('title', this.titleOfComment)
                fd.append('comment', this.textOfComment)
                fd.append('id_groupe',clicGroup)
                fd.append('auteur', this.$store.state.user.last_name,)
            }else{
                fd.append('title', this.titleOfComment)
                fd.append('comment', this.textOfComment)
                fd.append('id_groupe',clicGroup)
                fd.append('auteur', this.$store.state.user.last_name,)
           }

           axios
                .post('http://localhost:8080/api/publication/',fd,{
                headers:{
                     'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                }
                })
            
                .then((response)=>{   
                    console.log(response)
                    this.showComment= false
                    document.location.reload();
                })
                .catch(error => console.log(error));
        }
    },
    
    mounted(){
        const clicGroup = localStorage.getItem('id_group') 
       //console.log('CLIC',clicGroup)
        if(clicGroup == null){
            this.clicGroup='Génér_1615563480250'
        }  else {
            this. clicGroup = localStorage.getItem('id_group')
        }

        axios
            .get ('http://localhost:8080/api/publication/'+ this.clicGroup,{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                }
            }) 
            .then((response) => {
                this.publication = response.data.slice().reverse()
                console.log(response.data)
               
            })
            .catch(error => console.log(error));
    }, 

}

</script>

<style scoped>
    .publication{
        width: 100%;
        height:40em;
        overflow-y:scroll;
    }

    img{
        min-width: 0px;
        min-height:0em;
        max-width: 12em; 
        max-height: 9em; 
        object-fit: cover; 
    }

    h1{
        text-align: left;
        font-style: italic;
        font-size: 1.2em;
        margin-left: 1em;
        margin-right: 1em;
        border-bottom: 1px solid grey;
    }

    h3{
        margin:0.2em;
        margin-bottom:1em;
    }

    input{
        width:100%;
        margin-bottom:1em;
        border:1px solid grey;
        border-radius:0.3em;
        float:left;
    }

    .add-comment{
        padding-top:0.5em;
        text-align:left;
    }

    h4{
        margin:0em;
        text-align:left;
    }

    .addComment{
        padding:0em 4em 0em 4em;
        border:1px solid grey;
        height:12em;
        margin:0.5em 0.6em 0em 0.6em;
        border-radius:0.5em;
        background: rgba(175, 175, 175, 0.301);
        box-shadow: 5px 3px 5px grey;
    }

    textarea{
        width:100%;
        height:3em;
        border-radius:0.5em;
        resize: none;
    }

    .bouton_bloc_ajout{
        float:right;
        margin-left:0.5em;
    }

    .title{
        text-align:left;
        padding:0.2em 1em 0.2em 1em ;
        background:rgba(255,215,215);
    }

    .auteur_publication{
        float:right;
    }

    .id_groupe_publication{
        margin-left:50%;
    }

    .bloc-commentaire{
        border: 1px solid grey;
        width:90%;
        margin-left:auto;
        margin-right: auto;
        margin-bottom: 0.5em ;
        margin-top:1em;
        border-radius:0.4em;
        background:white;
        box-shadow: 5px 3px 5px grey;
        border:2px solid black;
        color:black;
    }

    .commentaire{
        display:flex;
        padding:0.5em;
        border-top:1px solid black;
    }

    .bloc_admin{
        width:100%;
        text-align: right; 
        border-top: 1px solid black;
    }

    .bloc_image{
        margin-top:auto;
        margin-bottom:auto;
        margin-left:1em;
        margin-right:0.5em;
    }

    .imagePub{
        box-shadow: 5px 3px 5px grey;
        border: 1px solid grey;
        border-radius: 0.2em;
    }

    .btn_admin{  
        margin:0.2em 1em 0.2em 1em;
    }

    .btn_action{
        display:flex;
    }
    button{
        height:1.6em;
    }

    @media  screen and (max-width:420px) {
        .publication{
            margin-top:0em;
            overflow-y: hidden;
            height: auto;
            width:100%;
        }

        .addComment{
            text-align: none;
            padding:0em 0.6em 0em 0.2em;
            margin-right: 0.5em;
        }

        .commentaire{
            display:flex;
            flex-direction: column;
        }

    }

    @media  screen and (max-width:600px) {
        .publication{
           margin-top:0em;
        }

        .commentaire{
            display:flex;
            flex-direction: column;
        }
    }

    @media  screen and (min-width:601px)and (max-width:750px) {
        .publication{
            width:96%;
            margin-top:0em;
            height:39em;
        }

        .addComment{
            margin-right:1.5em;
        }

        .commentaire{
            display:flex;
            flex-direction: column;
        }
    }

    @media screen and (min-width:751px) and (max-width:950px){
        .publication{
            height:auto;
        }
  }

</style>