const passwordSchema = require('../models/password');


// Contrôle les caractères du Mdp
module.exports = (req, res, next) => {

    console.log(res)
    if (!passwordSchema.validate(req.body.password))
    {         
     return res.status(400).json({message:"Votre mot de passe doit contenir: 8 caractères minimun avec  Majuscule,  minuscule ,  chiffre et sans espaces"}) 
    } else {
        next();
    }
    
};


