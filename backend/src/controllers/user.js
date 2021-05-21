const dbConnect = require('../../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models/employee');
const CryptoJS = require("crypto-js");
require('dotenv').config();

exports.signup=(req, res)=>{
    const {first_name, last_name, email, password, isAdmin} = req.body;
    //console.log(req.body.password)
    let cryptEmail = CryptoJS.AES.encrypt(email,  CryptoJS.enc.Hex.parse(process.env.KEY), { iv: CryptoJS.enc.Hex.parse(process.env.IV) }).toString();
    dbConnect.query('SELECT email FROM employees WHERE email =?',[cryptEmail], async(error, result) =>{
        //console.log(result)
        if(error){
            //console.log(error); 
            res.status(401).json({message:"erreur"})     
        }
        const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
           // console.log(this.dataSignup)
            if (regexEmail.test(email))
            {
               if(result.length > 0){ 
                   console.log('ici',result.length)
                    res.status(401).json({message:"Cette email est déjà utilisée"})
                }else{
                    let cryptEmail = CryptoJS.AES.encrypt(email,  CryptoJS.enc.Hex.parse(process.env.KEY), { iv: CryptoJS.enc.Hex.parse(process.env.IV) }).toString();
                    let hashedPassword = await bcrypt.hash(password,5)
            
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
            if(!email ||!password){
                return res.status(401).json({message:"Tous les champs ne sont pas remplit"})      
             }
             let cryptEmail = CryptoJS.AES.encrypt(email, CryptoJS.enc.Hex.parse(process.env.KEY), { iv: CryptoJS.enc.Hex.parse(process.env.IV) }).toString();
            
            dbConnect.query('SELECT * FROM employees WHERE email = ?', [cryptEmail], async (error, result) =>{
          
                if(result.length ==0){
                res.status(401).json({message:' Votre email est incorrect'})
                }
                if(!(await bcrypt.compare(password, result[0].password) )){
                res.status(401).json({message:' Votre mot de passe est incorrect'})
                }
                    const id = result[0].id;
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




