const mysql = require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password:'admin123',
    database:'myApp'

});
con.connect(function(err){
    if(err){
        console.log(err);
    } else {
        const query = "CREATE TABLE IF NOT EXISTS user_data (id INT AUTO_INCREMENT PRIMARY KEY, fName VARCHAR(255), Lname VARCHAR(255), email VARCHAR(255), password VARCHAR(10000)) "

        con.query(query,function(err, result){
            if (err){
                console.log(err)
             console.log('problem was created Table');
            }else{
                console.log('table created');

            }
        });
    }
});

module.exports = con;