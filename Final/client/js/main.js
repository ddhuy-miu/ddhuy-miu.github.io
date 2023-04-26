const EVT_LOGIN_OK = 'UserLogInOK';
const EVT_LOGIN_FAIL = 'UserLogInFail';
const EVT_LOGOUT_OK = 'UserLogOutOK';
const EVT_LOGOUT_FAIL = 'UserLogOutFail';

const evtLogInFail = new CustomEvent('', {detail: {}, bubbles: true, cancelable: true, composed: false});
const evtLogOutOK = new CustomEvent('', {detail: {}, bubbles: true, cancelable: true, composed: false});
const evtLogOutFail = new CustomEvent('', {detail: {}, bubbles: true, cancelable: true, composed: false});

document.getElementById('user_auth').addEventListener('UserLogInOk', function (evt) {
    const data = evt.detail;

    console.log('Login Successfully', data);
    toggleUserAuth(data);

    console.log('Get product list');
    showProductTable();

    console.log('Get cart');
    showShoppingCart();
});


function hideProductTable() {
    console.log('Hide product list');
    document.getElementById('product_list').innerHTML = '';
    document.getElementById('table_product').classList.add('d-none');
}

function showProductTable() {
    console.log('Show product list');
    document.getElementById('product_list').innerHTML = '';
    document.getElementById('table_product').classList.remove('d-none');
}

function hideShoppingCart() {
    console.log('Hide cart');
    document.getElementById('total_price').textContent = '';
    document.getElementById('cart_list').innerHTML = '';
    document.getElementById('table_cart').classList.add('d-none');
}

function showShoppingCart() {
    console.log('Show cart');
    document.getElementById('total_price').textContent = '';
    document.getElementById('cart_list').innerHTML = '';
    document.getElementById('table_cart').classList.remove('d-none');
}

function toggleUserAuth(userInfo) {
    if (userInfo) {
        // save user info
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        // hide user login
        document.getElementById('user_auth').classList.add('d-none');
        // show user info
        document.getElementById('userFullName').textContent = `${userInfo['_firstName']} ${userInfo['_lastName']}`;
        document.getElementById('user_info').classList.remove('d-none');
    } else {
        // delete user info
        sessionStorage.removeItem('userInfo');
        // show user login
        document.getElementById('user_auth').classList.remove('d-none');
        // hide user info
        document.getElementById('userFullName').textContent = '';
        document.getElementById('user_info').classList.add('d-none');
    }
}

document.addEventListener("DOMContentLoaded", function (evt) {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo) {
        toggleUserAuth(userInfo);
    }
});

document.getElementById('btnLogin').addEventListener('click', function (evt) {
    console.log('Login');

    async function loginAPI() {
        let login_info = {
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        };

        return await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login_info),
        });
    }

    loginAPI().then((response) => {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then((resp_data) => {
        document.dispatchEvent(new CustomEvent(EVT_LOGIN_OK, {
            detail: resp_data,
            bubbles: true,
            cancelable: true,
            composed: false
        }));
    }).catch((error) => {
        document.dispatchEvent(new CustomEvent(EVT_LOGIN_FAIL, {
            detail: error,
            bubbles: true,
            cancelable: true,
            composed: false
        }));
        console.error(`Could not login: ${error}`);
    });
});

document.getElementById('btnLogout').addEventListener('click', function (evt) {
    console.log('Logout');

    async function logoutAPI() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

        let login_info = {
            username: userInfo['_username'],
            token: userInfo['token']
        };

        return await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login_info),
        });
    }

    logoutAPI().then(function (response) {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then(function (resp_data) {
        hideProductTable();
        hideShoppingCart();
        toggleUserAuth();
    }).catch(function (error) {
        console.error(`Could not logout: ${error}`);
    });

});

document.getElementById('btnCheckout').addEventListener('click', function (ev) {
    console.log('Click Checkout');
});