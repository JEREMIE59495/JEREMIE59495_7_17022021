var dbConnect =require('../../config/db.config');
const bcrypt = require('bcrypt')
 
const Employee = function(employee){
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.password = employee.password 

    this.newPassword = employee.newPassword

}

//get all employee
Employee.getAllEmployees = (result)=>{
    dbConnect.query('SELECT *FROM employees ',(err,res)=>{
        if(err){
            err=('IL n existe pas');
            result(null,err);
        }else{
            console.log('Données employees chargées avec succes !!');
            result(null,res);

        }  

    })
}

Employee.getOneEmployee = (req,result )=>{

  // console.log('recup back model emplo L27',req)

            dbConnect.query('SELECT * FROM employees WHERE id=?',[req],(err,res)=>{
            if(err){
                console.log('error while fetching employees',err);
                result(null, err);
            }else{
         //     console.log('ctrl employee L36',res)
            result(null,res);
            }
        })
},
         

//création new models

Employee.createEmployee = (employeeReqData, result)=>{
    dbConnect.query('INSERT INTO employees SET ?', employeeReqData,(err,res)=>{
        if(err){
            console.log('err insertion datas');
            result(null,err);
        }else{
            console.log('employee crée avec succès');
            result(null,res)
        }
    })
}

//modifier employé

Employee.modifyEmployee=(id,employeeReqData, result)=>{
    console.log('la',employeeReqData)
    dbConnect.query('SELECT password FROM employees WHERE id=?',id,(err,res)=>{

        console.log(res[0].password);
        console.log('model employee L59',employeeReqData)
        bcrypt.compare ( employeeReqData.password ,res[0].password) . then ( function ( result )  { 
            if(result == true){ 
                console.log('Mot de passe identique')
                // changement du mot de passe
                    if(employeeReqData.newPassword != null){
                        employeeReqData.password = employeeReqData.newPassword
                    }

                let hashedPassword =  bcrypt.hashSync(employeeReqData.password,5)
                dbConnect.query("UPDATE employees SET first_name=?, last_name=?, email=? ,password=? WHERE id = ?",
                [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,hashedPassword,id],(err, res)=>{
                    if(err){
                        console.log('erreur lors de la modification');
                       // result(null,err);
                    }else{

                        console.log('modification effectuée');

                        //result(null,res)
                    }
                })
            }else if(result == false){ 

                console.log('mot de passe erronné')
            }   

        })
    }) 
},

//supprime employer
Employee.deleteEmployee=(id, result)=>{
    dbConnect.query('DELETE FROM employees WHERE id=?',[id],(err,res)=>{
        if(err){
            console.log('erreur de supression');
            result(null, err);
        }else{
            result(null,res);
        }
    })
}
module.exports = Employee;