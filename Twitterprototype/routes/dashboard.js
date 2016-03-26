/**
 * Created by Sourabh on 3/12/2016.
 */


/*
 * Dashboard funtionalities to be put here
 *
 * */


var ejs = require("ejs");
var mysql = require('./mysql');

/*
 *
 * Get all the user tweets from tweetdata
 * */
exports.inserttweet = function (req, res) {

    console.log('reached insert tweet');
    var tweettext = req.param("tweettext");
    var username = req.session.user;


    var inserttweet = "insert into tweetdata values('" + username + "','" + tweettext + "')";

    var showtweet = "select tweettext from tweetdata where username='" + username + "'";
    mysql.fetchData(function (err, result) {

        if (err) {
            console.log('reached error');
            throw err;

            res.send({'check': false});
        }
        else {
            console.log('query insert sucess');
            console.log('reached reply else');
            mysql.fetchData(function (err, result1) {

                if (err) {
                    console.log('reached error');
                    throw err;

                    res.send({'check': false});
                }
                else {
                    console.log('reached retrive query success');
                    res.send({"result": result1});

                }

            }, showtweet)

        }

    }, inserttweet);

};
/*
 *
 * Gets all the tweets of the all the users followed by a user
 * */
exports.allfollowingtweets = function (req, res) {

    console.log('reached allfollowingtweets ');
    //var tweettext = req.param("tweettext");
    var usernameloggedin = req.session.user;


    // var inserttweet = "insert into tweetdata values('"+username+"','"+tweettext+"')";

    var showtweets = "select username, tweettext from tweetdata where username IN (select username from followtable where following='" + usernameloggedin + "')";

    mysql.fetchData(function (err, result) {

        if (err) {
            console.log('reached error');
            throw err;

            res.send({'check': false});
        }
        else {
            console.log('reached allfollowingtweets query success');
            for (var i in result) {
                var username1 = result[i];
                //var tweettext1 = result[i].tweettext;
                console.log('username:' + username1);
                //console.log('tweettext1'+tweettext1);

            }
            res.send({"result": result});

        }


    }, showtweets);


};
/*
 * Method: To get the list of people followed by the user
 * */
exports.followinglist = function (req, res) {

    username = req.session.user;
    console.log('reached followinglist');
    var getfollowinglist = "select DISTINCT following from followtable where username='" + username + "'";
    console.log('in getfollowing');
    mysql.fetchData(function (err, followinglist) {

        if (err) {
            console.log('reached error');
            throw err;

            res.send({'check': false});
        }
        else {
            for (var result in followinglist) {

                console.log(followinglist[0].var);
            }
            res.send({"followinglist": followinglist});

        }
    }, getfollowinglist);
};

exports.followerlist = function (req, res) {

    username = req.session.user;

    var getfollowerlist = "select username from followtable where following='" + username + "'";
    console.log('in getfollowers');
    mysql.fetchData(function (err, followerlist) {

        if (err) {
            console.log('reached error');
            throw err;

            res.send({'check': false});
        }
        else {

            res.send({"followerlist": followerlist});

        }
    }, getfollowerlist);
};

exports.addtofollow = function (req, res) {

    followuser = req.param("followuser");
    username = req.session.user;
    var dummyforautoincrement = "NULL";
    console.log(followuser);
    console.log(username);
    var followuserquery = "insert into followtable values('" + username + "','" + followuser + "','" + dummyforautoincrement + "')";

    mysql.fetchData(function (err, result) {

        if (err) {
            throw  err;
        }
        else {
            console.log(result);
            res.send({"check": true});

        }

    }, followuserquery);


};
;