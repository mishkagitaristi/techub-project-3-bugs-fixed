import bcrypt from 'bcrypt';
import {User} from './user.model';

let messageSuccess = [],
    errorMessage = [];

setInterval( () => {
    messageSuccess = []
    errorMessage = []
}, 1000);

export const index = (req, res) => {
    if( req.originalUrl === '/' ) {
        if(req.cookies.userIsSaved){
            res.redirect(`/user/${req.cookies.User}`);
        }else {
            res.render('index', {
                messageSuccess: messageSuccess,
                errorMessage: errorMessage
            });
        }
    }
    if( req.originalUrl === `/user/${req.cookies.User}` ) {
        res.render('index', {
            messageSuccess: messageSuccess,
            errorMessage: errorMessage,
            cookies: 'true'
        })
    }
}

export const store = (req, res) => {
    if( req.originalUrl === '/fisRegister') {
        if( req.body.mobile.length < 6 || req.body.mobile.length > 9 ){
            errorMessage.push('მობილურის ნომერი უნდა შეიცავდე მინ. 6 და მაქს. 9 სიმბოლოს');
            return res.redirect('/');
        };
        if(req.body.password !== req.body.repeatPassword){
            errorMessage.push('შეყვანილი პაროლები არ ემთხვევა ერთმანეთს');
            return res.redirect('/');
        };
        User.find( {email: req.body.email}, (err, email) => {
            if( email.length === 0 ){
                const userDetails = {
                    userType: 'Person',
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    password: req.body.password
                }
                User.create( userDetails )
                messageSuccess = ['თქვენ წარმატებით გაიარეთ რეგისტრაცია'];
                return res.redirect('/');
            }else {
                errorMessage.push("მომხმარებელი მსგავსი E-Mail -ით უკვე არსებობს");
                return res.redirect("/");
            }
        })
    }
    if( req.originalUrl === '/comRegister') {
        if( req.body.mobile.length < 6 || req.body.mobile.length > 9 ){
            errorMessage.push('მობილურის ნომერი უნდა შეიცავდე მინ. 6 და მაქს. 9 სიმბოლოს');
            return res.redirect('/');
        };
        if(req.body.password !== req.body.repeatPassword){
            errorMessage.push('შეყვანილი პაროლები არ ემთხვევა ერთმანეთს');
            return res.redirect('/');
        };
        User.find( {email: req.body.email}, (err, email) => {
            if( email.length === 0 ){
                User.find( {companyName: req.body.companyName}, (err, company) => {
                    if(company.length > 0){
                        errorMessage.push('კომპანია ასეთი სახელით უკვე არის დარეგისტრირებული');
                        return res.redirect('/');
                    }else {
                        const userDetails = {
                            userType: 'Company',
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            mobile: req.body.mobile,
                            email: req.body.email,
                            companyName: req.body.companyName,
                            companyId: req.body.companyId,
                            password: req.body.password
                        }
                        User.create( userDetails )
                        messageSuccess = ['თქვენ წარმატებით დაარეგისტრირეთ კომპანია'];
                        res.redirect('/');
                    }
                })
            }else {
                errorMessage.push("კომპანია მსგავსი E-Mail -ით უკვე არსებობს");
                return res.redirect("/");
            }
        })
    }
    if( req.originalUrl === '/login') {
        User.find( {email: req.body.email} )
        .then(data => {
            if( data.length < 1 ){
                errorMessage.push('არასწორი E-Mail მისამართი');
                return res.redirect('/');
            }
            let checked = bcrypt.compareSync( req.body.password, data[0].password);
            if( !checked ){
                errorMessage.push("შეყვანილი პაროლი არასწორია");
                return res.redirect("/");
            }
            if( req.body.saveUser ){               
                res.cookie('User', data[0]._id)
                res.cookie('userIsSaved', 'true')
                return res.redirect(`/user/${data[0]._id}`);
            }else {
                res.cookie('User', data[0]._id)
                return res.redirect(`/user/${data[0]._id}`);
            }
        })
        .catch(err => console.error(err));
    }
}