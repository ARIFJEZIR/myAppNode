const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const con = require('../../connection');

router.post('/signIN', (req, res,next) => {
const encryptPassword = sha256(req.body.Password);
const userDetails = `INSERT INTO user_data(fName, Lname, email, password) VALUES ('${req.body.fname}','${req.body.Lname}','${req.body.email}','${encryptPassword}')`;
con.query(userDetails, function(err, result){
    if (err){
        console.log(err);
        res.status(err.code).json({
            status: err.code,
            message: err.message,
            data:{}
        });
    }else{
        const resultt = {fname : req.body.fname,
            Lname : req.body.Lname,
            email : req.body.email,
            userId : result.insertId
        }
        res.status(200).json({
            status: 200,
            message:"Sucessfully update Details",
            data: resultt
        });
    }
});

});

router.post('/login', (req, res, next)=>{
    const userDetails = `SELECT * FROM user_data WHERE email = '${req.body.email}'`
    con.query(userDetails, function(err, results){
        if(err){
            res.status(err.code).json({
                status: err.code,
                message:err.message,
            });
        } else {
            console.log(req.body.Password);
            let enPass = sha256(req.body.Password);
            console.log(enPass);
            if (results.length > 0){
                console.log("helooo")
                console.log(results)
                if (results[0].password == enPass){
                    console.log(enPass);
                    delete results[0].password;
                    jwt.sign({results}, 'secretKey', (err, token)=> {
                        console.log(token);
                        res.status(200).json({
                            status: 200,
                            message: "login Successfully",
                            data: results[0],
                            token: token
                        });
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: "email and password do not match"   
                    });
                }
            }else{
                res.status(404).json({
                    status: 404,
                    message: "email and password do not match"
               });
            }
        }
    });
});

    router.get('/homePage',verifyToken, (req, res, next) => {
        console.log("helooo")
        const query = 'SELECT fName Lname FROM user_data';
        con.query(query, function(err, result ){
            console.log("result");
           if (err){
               console.log("error")
               console.log(err);
               res.status(err.code).json({
                   status: err.code,
                   message: err.message,
               });
           } else {
               console.log("hii mr")
               console.log(req.token)
               jwt.verify(req.token, 'secretKey', (err, authData) => {
                   if(err){
                    res.sendStatus(err.code)
                   } else {
                       console.log("dhsfhjgsdhfgdhjsfhasgdfhu")
                       res.status(200).json({
                           status: 200,
                           message: "home page",
                           data: result[0]
                       });
                   }
               })
               
           }
       })
       });
       function verifyToken(req, res, next) {
           console.log("tihfhasbfhadgshfb")
        const bearerHeader = req.headers['x-auth-token'];
        console.log(bearerHeader)
        if(typeof bearerHeader !== 'undefined'){
            console.log("45645645645644654")
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[0];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403)
        }
    }



module.exports = router;