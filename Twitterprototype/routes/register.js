var ejs = require("ejs");
var mysql = require('./mysql');

exports.register = function (req, res) {

    var username = req.param("username");
    var password = req.param("password");
    var firstname = req.param("firstname");
    var lastname = req.param("lastname");
    var email = req.param("email");
    var location = req.param("location");
    var phone = req.param("phone");
    console.log('in reg.js');
    var registeruser = "insert into userdata values('" + username + "','" + password + "','" + firstname + "','" + lastname + "'," +
        "'" + email + ",'" + location + "','" + phone + "'')";


    var validateuser = "select username from userdata where'" + username + "'";
    console.log(validateuser);
    mysql.fetchData(function (err, result) {

        if (err) {
            throw err;

        }
        else {
            if (result.length > 0) {
                console.log('in if');
                res.send({check: false});
            }
            else {
                mysql.fetchData(function (err, result) {

                    if (err) {
                        throw  err;
                    }
                    else {
                        res.send({check: true});
                    }

                }, registeruser);
            }
        }
    }, validateuser);

};