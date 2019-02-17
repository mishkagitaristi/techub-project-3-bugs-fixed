const cruds = require("../cruds/userCruds");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 15;

let userErrors = [];
let companyErrors = [];
let loginErrors = [];
let display = ["display:flex;", "display:none;", "display: none"];
let persSuccess = [];
let compSuccess = [];

const mainPage = (req,res) => {
    if(req.cookies.save){
        res.redirect("/logedin");
    }
    res.render("index", {
        userErrors: userErrors, 
        companyErrors: companyErrors,
        loginErrors: loginErrors,
        display: display, 
        persSuccess: persSuccess, 
        compSuccess: compSuccess
    });
}

const accountRegistration= (req,res) => {
    switch(req.body.method){
        case "preg":
            display = ["display:none;", "display:flex;", "display: none"]
            persSuccess = []
            if(req.body.mobile.length !== 9){
                userErrors.unshift("Enter correct mobile number");
                return res.redirect("/");
            }
            if(req.body.password !== req.body.repassword){
                userErrors.unshift("Passwords do not match each other");
                return res.redirect("/");
            }
            if(req.body.password.length < 4){
                userErrors.unshift("Password should contain min. 6 symbols");
                return res.redirect("/");
            }
            User.find({email: req.body.email}, (err,data) => {
                if(data.length == 0){
                    let checkList = /@/
                    let validResult = checkList.test(req.body.email);
                    if(!validResult){
                        userErrors.unshift("Please enter valid email");
                        return res.redirect("/");
                    }
                    bcrypt.hashSync(req.body.password, saltRounds).then(async function(hash) {
                        const userDetails = {
                            name: req.body.name,
                            lastname: req.body.lastname,
                            mobile: req.body.mobile,
                            email: req.body.email,
                            password: req.body.password,
                            userType: req.body.type
                        };
                        userDetails.password = hash;
                        const newUser = await cruds.createUser(userDetails);
                    });
                    userErrors = []
                    persSuccess.unshift("Registration went Successfully");
                    res.redirect("/"); 
                }else{
                    userErrors.unshift("User with same email already exists");
                    return res.redirect("/");
                }
            }); 
            break;
        case "creg": 
            display = ["display:none;", "display:none;", "display: flex"]
            compSuccess = []
            if(req.body.mobile.length !== 9){
                companyErrors.unshift("Enter correct mobile number");
                return res.redirect("/");
            }
            if(req.body.password !== req.body.repassword){
                companyErrors.unshift("Passwords do not match each other");
                return res.redirect("/");
            }
            if(req.body.password.length < 6){
                companyErrors.unshift("Password should contain min. 6 symbols");
                return res.redirect("/");
            }
            User.find({email: req.body.email}, (err,data) => {
                if(data.length == 0){
                    let checkList = /@/
                    let validResult = checkList.test(req.body.email);
                    if(!validResult){
                        companyErrors.unshift("Please enter valid email");
                        return res.redirect("/");
                    }
                    User.find({companyName: req.body.company}, (error, company) => {
                        if(company.length > 0){
                            companyErrors.unshift("That company already registred");
                            return res.redirect("/");
                        }else{
                            User.find({IC: req.body.idcode}, (erro, IC) => {
                                if(IC.length > 0){
                                    companyErrors.unshift("Check your company identification code");
                                    return res.redirect("/");
                                }else{
                                    bcrypt.hashSync(req.body.password, saltRounds).then(async function(hash) {
                                        const userDetails = {
                                            name: req.body.name,
                                            lastname: req.body.lastname,
                                            mobile: req.body.mobile,
                                            email: req.body.email,
                                            password: req.body.password,
                                            userType: req.body.type,
                                            companyName: req.body.company,
                                            IC: req.body.idcode
                                        };
                                        userDetails.password = hash;
                                        const newUser = await cruds.createUser(userDetails);
                                    });
                                    companyErrors = [];
                                    compSuccess.unshift("Registration went Successfully");
                                    res.redirect("/"); 
                                }
                            });
                        }
                    });
                }else{
                    companyErrors.unshift("User with same email already exists");
                    return res.redirect("/");
                }
            }); 
            break;
        case "logIn":
            display = ["display:flex;", "display:none;", "display: none"]
            User.find({email: req.body.email})
            .then(data => {
                loginErrors = [];
                if(data.length < 1){
                    loginErrors.push("Wrong email address");
                    return res.redirect("/");
                }
                let checked = bcrypt.compareSync(req.body.password, data[0].password);
                if(!checked){
                    loginErrors.push("Wrong password");
                    return res.redirect("/");
                }
                let storeCookieFile = JSON.stringify(data[0]);
                if(req.body.remember){
                    res.cookie("save", "true")
                    res.cookie("user", storeCookieFile);
                    return res.redirect("/logedin");
                }
                res.cookie("user", storeCookieFile);
                res.redirect("/logedin");
            })
            .catch(err => console.error(err));
            break;
    }
}

// module.exports = {mainPage, accountRegistration}