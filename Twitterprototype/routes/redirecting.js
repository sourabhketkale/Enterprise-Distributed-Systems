/**
 * Created by Sourabh on 3/12/2016.
 */


exports.gotodashboard = function (req, res) {

    res.render('dashboard', {
        'username': req.session.user, 'firstname': req.session.fname, 'lastname': req.session.lname,
        'location': req.session.location, 'email': req.session.email
    });
};

exports.gotosignin = function (req, res) {

    console.log(req.session.user);

    res.render('signin');
};

exports.gotosignup = function (req, res) {

    res.render('signup');
};

exports.gotoindex = function (req, res) {

    res.render('index');
};
exports.gotoprofile = function (req, res) {

    console.log('in gotoprofile');
    res.send({'check': true});
};
exports.signout = function (req, res) {

    req.session.destroy();
    res.redirect('index');
};


exports.dashboardredirection = function (req, res) {

    console.log('in dashboard');
    res.send({'check': true});
};

exports.getsessionfromdashboardtoprofile = function (req, res) {

    console.log('in get sess profile');
    /* console.log(req.session.user);
     console.log(req.session.fname);*/
    res.render('profile', {
        'username1': req.session.user, 'firstname1': req.session.fname, 'lastname1': req.session.lname,
        'location1': req.session.location, 'email1': req.session.email
    });

};