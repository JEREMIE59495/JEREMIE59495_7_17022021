import axios from 'axios'
import Vuex from 'vuex'


//Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      userId:'NC',
      first_name:'NC',
      last_name:'NC',
      email:'NC',
      password:'NC',
      isAdmin:false
    },
    changeOption:''
  },
  mutations: {
    userInfo(state,[userId ,first_name,last_name, email, password, isAdmin]) {
      state.user.userId = userId,
      state.user.first_name = first_name,
      state.user.last_name = last_name,
      state.user.email = email,
      state.user.password = password,
      state.user.isAdmin = isAdmin 
    }, 
    
    modifOption(state,value) {
      state.changeOption = value
    }
  },
  actions: {
    getInfoUser(valeur){
      //On récupère  l'id
      const id = localStorage.getItem('userId')
     
      // On récupère toute les info sur l'utilisateur qui se connecte
      axios
      .get ('http://localhost:8080/api/employee/'+ id,{
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
       }
      })
      .then(response => {
        valeur.commit('userInfo',[response.data[0].id,response.data[0].first_name,response.data[0].last_name,response.data[0].email,response.data[0].isAdmin]	)   

      })
      .catch(error => {
        
        console.log(error); 
      });         
      },
      changeParam(contexte, value) {
        contexte.commit('modifOption',value)
      } 
    },
    modules: {
  }
})
