
var dbConnect =require('../../config/db.config');

const Groupe = function(groupe){
    this.name_group = groupe.name_group  
    this.id_groupe= groupe.id_groupe
}

//création new groupe

Groupe.createGroupe = (groupeReqData, result)=>{
    //console.log('groupeReqData)
    dbConnect.query('INSERT INTO groupelist SET ? ', groupeReqData,(err,res)=>{
        if(err){
            console.log('err insertion data');
            result(null,err);
        }else{
            console.log('groupe crée avec succès');
            result(null,res)
        }
    })
}

//supprime groupe
Groupe.deleteGroupe=(id, result)=>{
    dbConnect.query('DELETE FROM groupelist WHERE id=?',[id],(err,res)=>{
        if(err){
            console.log('erreur de supression');
            result(null, err);
        }else{
            result(null,res);
        }
    })
}

//get all employee
Groupe.getAllGroupe = (result)=>{
    dbConnect.query('SELECT * FROM groupelist',(err,res)=>{
        if(err){
            console.log('error while fetching groupelist',err);
            result(null,err);
        }else{
            console.log('Liste des groupes chargée succès !!');
            result(null,res);
        }
    })
}

module.exports = Groupe;