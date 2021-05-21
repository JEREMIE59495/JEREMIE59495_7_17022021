const express = require ('express');
//const bodyParser = require('body-parser')
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   // res.setHeader ('authorization', 'bearer ')
    next();
  });

app.use(express.urlencoded({extended:true}));
app.use(express.json())

//Definie la route racine
app.get('/',(req,res)=>{
    res.send('Hello World');
});

//import route employee
const employeeRoutes = require('./src/routes/employee');
const publicationRoutes = require('./src/routes/publication');
const groupeRoutes = require('./src/routes/groupe');
const userRoutes= require('./src/routes/user')



//create route employee
app.use('/api/employee',employeeRoutes)
app.use('/api/publication',publicationRoutes)
app.use('/api/groupe',groupeRoutes)
app.use('/api/users',userRoutes)

//Ecoute du port
app.listen(port,()=>{
    console.log(`Express server is running at port ${port}`);
});

//images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))