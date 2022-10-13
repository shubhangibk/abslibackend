const express = require("express")
const app = express();
const mysql = require('mysql')
const BodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const CryptoJS = require('crypto-js');
const axios = require("axios");
const https = require('https')
var FormData = require("form-data");
 
const { response } = require("express");
var formdata = new FormData();


// const ENC_KEY = 'aesEncryptionKey'
// const IV = 'knowarthKaitesVe'



// var encrypt = ((data)=>{
//     let cipher = crypto.createCipheriv('aes-256-cbc',ENC_KEY,IV);
//     let encrypted = cipher.update(data,'utf8','base64');
//     encrypted += cipher.final('base64');
//     return encrypted;
// })

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "shubhu@",
//     database: 'req.body',
   
// });

// var jsonParser = BodyParser.json()
app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())


// db.connect(function (err) {
//     if(err){
//         console.log("error occurred while connecting");
//     }
//     else{
//         console.log("connection created with Mysql successfully");
//     }
//  });


//  app.get("/", (req, res) => {
    
//     res.json({ message: "Welcome to bezkoder application." });
//   });


app.post("/api/nextpage",(req,res) => {

    // console.log(req.body.PAN)
    // console.log(req.body.Phone)
    // console.log(req.body.email)


    // const PAN = req.body.PAN
    // const Phone = req.body.Phone
    // const email = req.body.email

    // const sqlInsert = "INSERT INTO form_data (PAN ,Phone, email) VALUES(?,?,?);"

        
    //     db.query(sqlInsert,[PAN,Phone,email],(err,result)=> {
        
           
    //        if (err){
    //         console.log(err)
    //        }
    //        else{
    //         res.send("Inserted!")
    //        }
             
        
    // });

      

      console.log(req.body.firstName)
      console.log(req.body.lastName)


       const Data = 
            {
                product: "AFD",
                uid: "FDHK01X01",
                customer: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                gender : req.body.gender,
                mobile: req.body.phonenumber,
                emailId: req.body.emailID,
                isJointLife: "false",
                isWhatsapp: true
                },
                policy: {
                premiumAmount: "180000",
                premiumPayingTerm: "7",
                term: 7,
                premiumPayingFrequency: "1",
                sumAssuredOption: "A",
                source: "IIFL"
                },
                customerIdentity: {
                nationality: "IND"
                },
            };
        
            console.log(JSON.stringify(Data))

        //  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Data),'aesEncryptionKey').toString();
        //  console.log(ciphertext);

        const ENC_KEY = 'aesEncryptionKey'
        const IV = 'knowarthKaitesVe'

        const algorithm = "aes-128-cbc";


        const cipher = crypto.createCipheriv(algorithm,ENC_KEY,IV);

        let ciphertext = cipher.update(JSON.stringify(Data),"utf-8","base64");



        ciphertext += cipher.final("base64");



        console.log(ciphertext);


        formdata.append('encryptedData',ciphertext);




        axios({
            method:"post",
            url:'https://lifeinsuranceuat.adityabirlacapital.com/api/jsonws/absli-services-portlet.customer/getPlanPageProductURL',
            data:formdata,
            headers : {"Content-Type":"multipart/form-data"},
        
        }).then(function(response){
            console.log("response",response.data);
        


        //   res.status(200).send(response.data.url);
    }).catch(function(error){
        console.log(error);
        if(error.response){
            console.log("response data",error.response.data);

        }
        else if (error.request){
            console.log("no res",error.request);
        }
        else{
            console.log("Error",error.message);
        }
    });


        




        

        //  axios.post('https://lifeinsuranceuat.adityabirlacapital.com/api/jsonws/absli-services-portlet.customer/getPlanPageProductURL',ciphertext).then(
        //     function(resp){
        //         console.log("response: ",resp);


        //     }
        //  ).catch(function(error){
        //     console.log("error :",error);
        //  });






});
    
    






app.listen(3005,() => {
   console.log("running on port 3005")
});