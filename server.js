var express = require("express");
var path = require("path");
var fileuploader = require("express-fileupload");
var mysql = require("mysql");
var nodemailer = require("nodemailer");
var fileuploader = require("express-fileupload");
var md5 = require("md5");

var app = express();

//=========making port=============

app.use(express.static("public"));

app.listen(2004, function () {
    console.log("server started")
})

app.get("/", function (req, resp) {

    var path = process.cwd() + "/public/index.html";
    resp.sendFile(path);
})

//===========mysql connectivity===============

var databaseconfobj = {
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
}

var dbRef = mysql.createConnection(databaseconfobj);
dbRef.connect(function (err) {
    if (err == null)
        console.log("database connected ");
    else
        console.log(err);
});

//============middlewares for post==========

app.use(express.urlencoded({ extended: true }));

//=============middlewares for fileuploader=============

app.use(fileuploader());

//========signup=================

app.get("/chkEmail", function (req, resp) {

    var dataAry = [req.query.email];

    dbRef.query("select * from users where email=?", dataAry, function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else if (table.length == 1) {

            resp.send("*   User Already Exists");

        }
        else
            resp.send("");

    })
})

app.get("/signup", function (req, resp) {

    var data = [req.query.email, req.query.password, req.query.service];

    dbRef.query("insert into users values(?,?,?,current_date(),1)", data, function (err) {
        if (err)
            resp.send("  Fill correct details !");
        else
            resp.send("  Signedup Successfully  ");

    })
})



//====================login ================

app.get("/login", function (req, resp) {
    var email = req.query.email;
    var pwd = req.query.password;

    var dataAry = [email, pwd];

    dbRef.query("select * from users where email=? and password=?", dataAry, function (err, table) {
        if (err)
            resp.send(err);
        else if (table.length == 1) {
            if (table[0].status == 1 && table[0].service == "Caretaker")
                resp.send(table[0].service);
            else if (table[0].status == 1 && table[0].service == "client")
                resp.send(table[0].service);

        }
        else
            resp.send("Invalid emailid/password");

    })
});


//==================edit button =================

app.post("/edit-process-post", function (req, resp) {

    var email = req.body.email;
    var username = req.body.username;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var pincode = req.body.pincode;
    var region = req.body.region;
    var state = req.body.State;
    var petdetail = req.body.Pet;
    var id;

    if (req.files != null) {
        id = email + "-" + req.files.Id.name;
        var des = process.cwd() + "/public/upload_proof/" + id;
        req.files.Id.mv(des, function (err) {
            if (err)
                console.log(err.toString());
            else
                console.log("File Uploaded");
        })
    }
    else {
        id = req.body.hdn;
    }
    var data = [username, mobile, address, pincode, state, region, petdetail, id, email];

    dbRef.query("update profile set username=?,mobile=?,address=?,pincode=?,state=?,region=?,Pet=?,proof=? where email=?", data, function (err, result) {

        if (err) {
            resp.send("Fill All Details");
            console.log(err);
        }
        else
            {
                resp.redirect("/dash-client.html");
                
            } 


    })
})



//============================================

app.get("/search-details", function (req, resp) {

    var dataAry = [req.query.email];
    dbRef.query("select * from profile where email=?", dataAry, function (err, table) {
        if (err)
            resp.send(err);
        else
            resp.send(table);

    })
})
//=================================================

app.post("/save-process-post", function (req, resp) {


    var email = req.body.email;
    var username = req.body.username;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var pincode = req.body.pincode;
    var region = req.body.region;
    var state = req.body.State;
    var petdetail = req.body.Pet;
    var id;

    if (req.files != null) {
        id = email + "-" + req.files.Id.name;
        var des = process.cwd() + "/public/upload_proof/" + id;
        req.files.Id.mv(des, function (err) {
            if (err)
                console.log(err.toString());
            else
                console.log("File Uploaded");
        })
    }
    else {
        id = req.body.hdn;
    }
    var data = [email, username, mobile, address, pincode, state, region, petdetail, id];



    dbRef.query("insert into profile values(?,?,?,?,?,?,?,?,?,current_date())", data, function (err) {
        if (err) {
            console.log(err);
            resp.contentType("text/html");
            resp.write(" <center><h1>fill correct details</h1></center>");
            resp.end();
        }
        else
            resp.redirect("/dash-client.html");
    })


})
//==========data fetching for admin==============

//=========client========================

app.get("/fetch-client-data", function (req, resp) {
    dbRef.query("SELECT profile.mobile,users.email,users.status,users.service from profile join users on profile.email=users.email;", function (err, table) {

        if (err)
            resp.send(err.sqlMessage);
        else
            resp.json(table);

    })
})

//===========users==============================

app.get("/fetch-user-data", function (req, resp) {
    dbRef.query("select * from profile", function (err, table) {

        if (err)
            resp.send(err.sqlMessage);
        else
            resp.json(table);

    })
})

//===============blocking user =====================

app.get("/block-client", function (req, resp) {
    var email = req.query.Email;
    dbRef.query("update users set status=0 where email=?", email, function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.json(table);

    })
})

//=====================resuming user===============
app.get("/resume-client", function (req, resp) {
    var email = req.query.Email;
    dbRef.query("update users set status=1 where email=?", email, function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.json(table);

    })
})

//=============data saving for caretaker==============

app.get("/save-caretaker-details", function (req, resp) {

    console.log(req.query);
    var email = req.query.email;
    var username = req.query.User;
    var mobile = req.query.Contact;
    var address = req.query.Address;
    var city = req.query.City;
    var firm = req.query.Firm;
    var state = req.query.State;
    var pet = req.query.Pet.toString();
    var comment = req.query.Comment;



    var data = [username, email, mobile, state, city, firm, address, pet, comment];



    dbRef.query("insert into profile_caretaker values(?,?,?,?,?,?,?,?,?)", data, function (err) {
        if (err) {
            resp.send("Fill All Details");
            console.log(err);
        }
        else
            resp.send("saved successfully");
    })


});


//========================================



app.get("/edit-caretaker-details", function (req, resp) {
    var email = req.query.email;
    var username = req.query.User;
    var mobile = req.query.Contact;
    var address = req.query.Address;
    var city = req.query.City;
    var firm = req.query.Firm;
    var state = req.query.State;
    var pet = req.query.Pet.toString();
    var comment = req.query.Comment;



    var data = [username, mobile, state, city, firm, address, pet, comment, email];


    dbRef.query("update profile_caretaker set username=?,contact=?,state=?,city=?,firm=?,address=?,pet=?,comment=? where email=?", data, function (err, result) {

        if (err) {
            resp.send("Error updating caretaker details");
            console.log(err);
        }
        else {
            resp.send("updated successfully");

        }

    })

})
//============================================================

app.get("/search-caretaker-details", function (req, resp) {

    var dataAry = [req.query.email];

    dbRef.query("select * from profile_caretaker where email=?", dataAry, function (err, table) {
        console.log("table");
        if (err) {
            resp.send("invalid email");
            console.log(err);
        }
        else
            resp.send(table);


    })
})

//=======================================

app.get("/fetch-all-cities", function (req, resp) {
    dbRef.query("select distinct city from profile_caretaker", function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);

    })
})

//===============================================

app.get("/fetch-all-caretakers", function (req, resp) {
    var data = [req.query.City, "%" + req.query.pet + "%"];
    dbRef.query("select * from profile_caretaker where city=? and pet like ?", data, function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);
    });

});

//===================================================

app.get("/moreInfo", function (req, resp) {
    var data = [req.query.email];
    dbRef.query("select * from profile_caretaker where email=?", data, function (err, table) {
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);

    });

});