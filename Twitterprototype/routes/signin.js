/**
 * Created by Sourabh on 3/13/2016.
 */

/*
 * Sign in check and sign up user data persist
 *
 * */

var ejs = require("ejs");
var mysql = require('./mysql');
var session = require('client-sessions');

exports.signincheck = function (req, res) {

    var username = req.param("username");
    var password = req.param("password");


    var validatecreds = "select * from userdata where username='" + username + "'&& password='" + password + "'";
    console.log(validatecreds);
    mysql.fetchData(function (err, result) {

        if (err) {
            throw err;

            res.send({'check': false});
        }
        else {
            console.log(result[0].phone_no);
            if (result.length > 0) {
                req.session.user = result[0].username;
                req.session.fname = result[0].firstname;
                req.session.lname = result[0].lastname;
                req.session.email = result[0].email;
                req.session.location = result[0].location;
                req.session.phone = result[0].phone_no;

                console.log(req.session.username);
                res.send({'check': true});
            }
            else {
                console.log('login error');
            }
        }

    }, validatecreds);

};


