<template>	
	<div class="bloc_profil">
		<div class= "profil">
			<p class= "first_name">{{user.first_name}}</p>
			<p> {{user.last_name}}</p>	
		</div>
		<div class="divers_profil">
			<a @click="displayProfil"><i class="fas fa-cog"></i>Paramètre</a>
			<a><i class="far fa-calendar-alt"></i>Evenement</a>
			<a><i class="fas fa-address-book"></i>Annuaire</a>
		</div>
	</div>
</template>

<script>
//import axios from 'axios'
import {mapState} from 'vuex'

export default {
	name: 'Profil',
	el:'.profil',
    data(){
      return{
        haut:true,
        publicDisplay:true,
        profilDisplay:false,
      }	
	},

	computed:{
		...mapState(['user'])
	},

//fonction pour ouvrir le detail du profil
    methods:{
        displayProfil:function(){
            this.$emit('openProfil',)
        }, 
    },

	mounted(){
		this.$store.dispatch('getInfoUser')
    }, 
}
</script>
<style scoped>
	.profil{
		height: 4em;
		padding-left:2em;
		padding-top: 2em;
		display:flex;
	}

    a{
        cursor:pointer;
    }
    
	.first_name{
		text-transform: uppercase;
		font-weight:bold;
		text-align: center;
		margin-right: 0.5em;;
	}

	.btn_profil{
		height:2em;
	}

	.bloc_profil{
		width:22%;
		display:flex;
		flex-direction: column;
	}

	.divers_profil{
		padding-left:1em;
		text-align: left;
		width:100%;
		display: flex;
		flex-direction: column;
	}

	.fa-address-book{
		background: rgba(240, 242, 245);
		color:rgb(37, 167, 11);
		font-size:1.3em;
		margin-right:0.5em;
		margin-bottom:0.5em;
	}

	.fa-calendar-alt{
		background: rgba(240, 242, 245);
		color:rgb(169, 27, 204);
		font-size:1.3em;
		margin-right:0.5em;
		margin-bottom:0.5em;
	}
	
	.fa-cog{
		background: rgba(240, 242, 245);
		color:grey;
		font-size:1.3em;
		margin-right:0.5em;
		margin-bottom:0.5em;
	}

	.groupe{
		display:none;
	}

	@media  screen and (max-width:600px) {
		.profil{
			padding:0em;
			margin-top:28em;
			margin:0;
		}
		
		.bloc_profil{
			width:100%;
		}

		.divers_profil{
			width:96%;
			height:4em;
			display: flex;
			justify-content: space-around;
			flex-direction: initial;
		}

		i{
			padding-left: 1em;
		}

		a{
			height:1em;
			width:100%;
			margin-right: 1em;
		}	
	}

	@media  screen and (max-width:750px) {
		.photo{
			display: none;
		}

		.first_name{
			margin-left:1em
		}	
	}
</style>
