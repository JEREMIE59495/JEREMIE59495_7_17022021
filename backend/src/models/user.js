const dbConnect =require('../../config/db.config');

const User = function(){
    this.email = email;
    this.password= password 
}

//get One employee
User.getOneUser = (id, result )=>{
    dbConnect.query('SELECT * FROM employees WHERE id=?',id,(err,res)=>{
            if(err){
               // console.log('error  employees',err);
                result(null, err);
            }else{
               // console.log(err)
                result(null,res);   
            }
    });
};



module.exports = User;