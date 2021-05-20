
const employeeModel = require ('../models/employee');

//get tous les employées
exports.getEmployeeList = (req, res)=>{
   employeeModel.getAllEmployees((err,employees)=>{
       if(err)
       res.send(err);
   //console.log('Employees',employees);
        res.send(employees);
   })
}

// un seul employé deplaceé vers user controllers
exports.getOneEmployee =(req,res)=>{
    employeeModel.getOneEmployee(req.params.id, (err,employee)=>{
        if(err)
        res.send(err);
     //   console.log(req.params.id);
        res.send(employee);
    //  console.log(employee)
    })
}

//création new employee
exports.createNewEmployee = (req,res)=> {

   // console.log('employeeReqData',employeeReqData);

    if(req.body.constructor === Object && Object.keys(imageUpdate).lenght === 0){
        res.send(400).send({succes:false,message:'merci de remplir tous les champs'})
    }else{
        employeeModel.createEmployee(employeeReqData,(err, employee)=>{
            if(err)
                res.send(err);
                res.json({status: true, message: 'Employee crée avec succès !!',data: employee})   
        })
    }
}


//modifier un employee

exports.modifyEmployee = (req,res, next)=>{
    const employeeReqData = new employeeModel(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).lenght === 0){
        res.send(400).send({succes:false,message:'merci de remplir tous les champs'})
    }else{
        employeeModel.modifyEmployee(req.params.id, employeeReqData,(err, employee)=>{   
            if(err)
                res.send(err);
                res.json({status: true, message: 'Employee modifié avec succès !!',data: employee})   
        })
    }
}

//supprimer employe
exports.deleteEmployee=(req,res)=>{
    employeeModel.deleteEmployee(req.params.id, (err,employee)=>{
        if(err)
        res.send(err);
        res.json({success:true, message:'Employe supprimée'});
    })
}