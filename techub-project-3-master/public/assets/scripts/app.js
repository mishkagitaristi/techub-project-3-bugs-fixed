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

function errorPopupClose(){
    let notify = document.getElementById('notification');
    notify.style.display = 'none';
}

const exitUser = () => {
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    document.location = '/';
}

//gasatishad mazi damexmareba

$('a[href*="#"]').on('click', function (e) {
	e.preventDefault();

	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top - 120
	}, 500, 'linear');
});

