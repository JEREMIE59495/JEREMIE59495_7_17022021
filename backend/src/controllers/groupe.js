const groupeModel = require ('../models/groupe');

//get tous groupes
exports.getAllGroupe = (req, res)=>{
    groupeModel.getAllGroupe((err,groupelist)=>{
        if(err)
        res.send(err);
    //console.log('Groupelist',groupelist);
         res.send(groupelist);
    }) 
 }

//création new groupe
exports.createNewGroupe = (req,res)=> {
    const groupeReqData = new groupeModel(req.body);
    if(req.body.constructor === Object && Object(req.body).lenght === 0){
        res.send(400).send({succes:false,message:'merci de remplir tous les champs'})
    }else{
        groupeModel.createGroupe(groupeReqData,(err, groupe)=>{
            if(err)
                res.send(err);
                res.json({status: true, message: 'groupe crée avec succès !!',data:groupe})   
        })
    }
}

//supprimer employe
exports.deleteGroupe=(req,res)=>{
    groupeModel.deleteGroupe(req.params.id, (err,groupe)=>{
        if(err)
        res.send(err);
        res.json({success:true, message:'groupe supprimée'});
    })
}