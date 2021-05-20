const dbConnect = require('../../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models/employee');
const cryptoJS = require("crypto-js");
require('dotenv').config();

exports.signup=(req, res)=>{
    const {first_name, last_name, email, password, isAdmin} = req.body;
    //console.log(req.body.password)
    dbConnect.query('SELECT email FROM employees WHERE email =?',[email], async(error, result) =>{
        console.log(result)
        if(error){
            console.log(error); 
            res.status(401).json({message:"erreur"})     
        }
        const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            console.log(this.dataSignup)
            if (regexEmail.test(email))
            {
               if(result.length > 0){ 
                    res.status(401).json({message:"Cette email est déjà utilisée"})
                }else{
                    let cryptEmail = await bcrypt.hash(email,5);
                let hashedPassword = await bcrypt.hash(password,5)
             console.log(cryptEmail)
                    dbConnect.query('INSERT INTO employees SET ?',{first_name: first_name, last_name: last_name, email: cryptEmail, password: hashedPassword, isAdmin:'0'}, (error, result)=>{
                        if(error){
                            //console.log(error);
                        } else{
                        // console.log(result)
                        }
                        res.send('envoyer')
                    });
                }
            }else{
                 res.status(401).json({message:"Caractère spéciaux non autorisés"})
            }
        
    })
}

exports.login = async (req, res)=> {
    try{
        const { email, password} = req.body  
             // console.log('ICI',req.body.email)
            if(!email ||!password){
                return res.status(401).json({message:"Tous les champs ne sont pas remplit"})      
             }
             
        dbConnect.query('SELECT * FROM employees WHERE email = ?', [email], async (error, result) =>{
          console.log(email)
          console.log(result[0].password)
            if((await bcrypt.compare(email, result[0].email))){
                res.status(401).json({message:' Votre email est incorrect'})
           } 
             
            if(!(await bcrypt.compare(password, result[0].password) )){
               res.status(401).json({message:' Votre mot de passe est incorrect'})
            }
                const id = result[0].id;
                console.log(id)
                res.status(200).json({
                    id: id,
                    token: jwt.sign(
                      { id: id },
                      process.env.TOKEN,
                      { expiresIn: '24h' }
                    )
                    
                })
            })    
    }catch(error){
        console.log(error)
    }  
}




