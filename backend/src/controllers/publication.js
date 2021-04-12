const publicationModel = require ('../models/publication');
const fs = require('fs');

//get toutes les publications
exports.getAllPublication = (req, res)=>{
   publicationModel.getAllPublication((err,publication)=>{
        if(err)
            res.send(err);
           // console.log('publication',publication);
            res.send(publication);
   })
}

exports.getOnePublication =(req,res)=>{

    publicationModel.getOnepublication(req.params.id, (err,publication)=>{
        if(err)
        res.send(err);
     //console.log(req.params.id);
        res.send(publication);
    //console.log(publication)
    })
}

 

//création new publication

exports.createNewPublication = (req,res)=> {
    console.log(req.body.image) 
    if(req.body.image == null){
    req.body.image = null
    console.log('1==>',req.body.image)
    }else {
        req.body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const publicationReqData = new publicationModel(req.body);
    console.log('publicationReqData',publicationReqData);
    console.log(req.body.image)
    if(req.body.constructor === Object && Object.keys(req.body).lenght === 0){
        res.send(400).send({succes:false,message:'merci de remplir tous les champs'})
    }else{
        publicationModel.createPublication(publicationReqData,(err, publication)=>{
            if(err)
                res.send(err);
                res.json({status: true, message: 'commentaire crée avec succès !!',data: publication})   
        })
    }
}


//modifier un employee
exports.modifyPublication = (req,res)=>{
    const publicationReqData = new publicationModel(req.body);
    console.log('publicationReqData modify',publicationReqData);
    if(req.body.constructor === Object && Object.keys(req.body).lenght === 0){
        res.send(400).send({succes:false,message:'merci de remplir tous les champs'})
    }else{
        publicationModel.modifyPublication(req.params.id, publicationReqData,(err, publication)=>{
            if(err)
                res.send(err);
                res.json({status: true, message: 'publication modifié avec succès !!'})   
        })
    }
}

//supprimer employe
exports.deletePublication = (req,res)=>{
        publicationModel.deletePublication(req.params.id, (err,employee)=>{
            if(err)
            res.send(err);
            res.json({success:true, message:'publication supprimée'});
        })
   
    
}