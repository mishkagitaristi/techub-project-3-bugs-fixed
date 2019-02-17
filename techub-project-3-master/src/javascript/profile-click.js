let reg = document.getElementById('loginOrRegister');
let login = document.getElementById('login');
let fisical = document.getElementById('registerFisical');
let company = document.getElementById('registerCompany');
let exit = document.getElementsByClassName('exit');

function myProfile(){
    reg.style.display = 'flex';
    login.style.display = 'none';
    fisical.style.display = 'none';
    company.style.display = 'none';
}

function loginPopup(){
    reg.style.display = 'none';
    login.style.display = 'flex';
}

function regFis() {
    reg.style.display = "none";
    fisical.style.display = 'flex';
}
function regCom() {
    reg.style.display = "none";
    company.style.display = 'flex';
}

function popupClose(){
    reg.style.display ='none';
    login.style.display ='none';
    fisical.style.display ='none';
    company.style.display ='none';
}

//gasatishad mazi damexmareba

regBtn.addEventListener('click', (event) => {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    fetch(`${location.href}api/user`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userDetails:{ email, password} })
    })
        .then(res => res.json())
        .then(userApiResult => {
            console.log(userApiResult);
        })
        .catch(err => {
            console.error(err);
        })

})

window.onerror = (event) => {
    console.info(event, "ERROR")
}