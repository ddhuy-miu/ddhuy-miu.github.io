function updateSubTotal(cartItemId, price) {
    let quantityDOM = document.getElementById('cart-item-quantity-' + cartItemId);
    let subTotalDOM = document.getElementById('cart-item-total-' + cartItemId);
    let totalDOM = document.getElementById('total_price');

    let oldSubTotal = parseInt(subTotalDOM.innerText.replace('$', ''));
    let oldTotal = parseInt(totalDOM.innerText.replace('$', ''));

    subTotalDOM.innerText = `$${quantityDOM.value * price}`;

    totalDOM.innerText = `$${oldTotal - oldSubTotal + quantityDOM.value * price}`;
}

function hideProductTable() {
    console.log('Hide product list');
    document.getElementById('product_list').innerHTML = '';
    document.getElementById('table_product').classList.add('d-none');
}

function showProductTable() {
    console.log('Show product list');

    function getProductListApi() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
                'Authorization': userInfo['token'],
                "Content-Type": "application/json"
            }
        });
    }

    getProductListApi().then(function (response) {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then(function (resp_data) {
        document.getElementById('table_product').classList.remove('d-none');
        document.getElementById('product_list').innerHTML = '';
        resp_data.forEach(function (product, i) {
            document.getElementById('product_list').innerHTML += `<tr> \
                <td>${i + 1}</td> \
                <td>${product._name}</td> \
                <td>$${product._price}</td> \
                <td> \
                <img src="http://localhost:3000/images/${product._image}" style="max-height: 100px; max-width: 100px;"> \
                </td> \
                <td>${product._stock}</td> \
                <td> \
                    <button class="btn btn-outline-warning" id="${product._id}" onclick='addCart("${product._id}");'> \
                        <i class="fa fa-cart-shopping fa-lg"></i> \
                    </button> \
                </td> \
            </tr>`;
        });

    }).catch(function (error) {
        console.error(`Could not logout: ${error}`);
    });
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

    function getCartAPI() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return fetch('http://localhost:3000/carts/', {
            method: 'GET',
            headers: {
                'Authorization': userInfo['token'],
                'Content-Type': 'application/json'
            },
        });
    }

    getCartAPI().then((response) => {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then((cartItems) => {
        let total = 0;

        cartItems.forEach(function (item, i) {
            let sub_total = item.product._price * item.count;
            total += sub_total;
            document.getElementById('cart_list').innerHTML += `<tr class="cart-item" id="cart-item-${item.product._id}">\
                <td>${i + 1}</td>\
                <td>${item.product._name}</td>\
                <td><div class="form-group input-group-xs">\
                <input type="number" min="0" max="${item.product._stock}" value="${item.count}" \
                        id="cart-item-quantity-${item.product._id}"\
                        onchange='updateSubTotal("${item.product._id}", ${item.product._price})'\
                        class="form-control form-control-sm">\
                </div></td>\
                <td>$${item.product._price}</td>\
                <td id="cart-item-total-${item.product._id}">$${sub_total}</td>\
            </tr>`
        });

        document.getElementById('total_price').innerText = `$${total}`;
    }).catch((error) => {
        console.error(`Could not login: ${error}`);
    });
}

function addCart(productId) {
    console.log(productId);

    function addCartAPI() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return fetch('http://localhost:3000/carts/', {
            method: 'POST',
            headers: {
                'Authorization': userInfo['token'],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'product_id': productId}),
        });
    }

    addCartAPI().then((response) => {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then((resp_data) => {
        showShoppingCart(resp_data);
    }).catch((error) => {
        console.error(`Could not login: ${error}`);
    });
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
        showProductTable();
        showShoppingCart();
    } else {
        toggleUserAuth();
        hideShoppingCart();
        hideProductTable();
    }
});

document.getElementById('btnLogin').addEventListener('click', function (evt) {
    console.log('Login');

    function loginAPI() {
        let login_info = {
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        };

        return fetch('http://localhost:3000/users/login', {
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
        console.log('Login Successfully', resp_data);
        toggleUserAuth(resp_data);

        console.log('Get product list');
        showProductTable();

        console.log('Get cart');
        showShoppingCart();
    }).catch((error) => {
        console.error(`Could not login: ${error}`);
    });
});

document.getElementById('btnLogout').addEventListener('click', function (evt) {
    console.log('Logout');

    function logoutAPI() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

        let login_info = {
            username: userInfo['_username'],
            token: userInfo['token']
        };

        return fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            headers: {
                'Authorization': userInfo['token'],
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

    let items = [];
    for (let tr of document.getElementsByClassName('cart-item')) {
        let tds = tr.getElementsByTagName('td');
        let product_id = tr.getAttribute('id').split('-')[2];
        let product_name = tds[1].innerText;

        let inputs = tds[2].getElementsByTagName('input');
        let count = inputs[0].value;

        console.log(product_id, product_name, count);
        items.push({id: product_id, name: product_name, count: count});
    }

    function checkoutCartAPI() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return fetch('http://localhost:3000/carts/checkout', {
            method: 'POST',
            headers: {
                'Authorization': userInfo['token'],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'items': items}),
        });
    }

    checkoutCartAPI().then((response) => {
        if (!response.ok)
            throw new Error(`HTTP[${response.status}]: ${response.status}`);
        return response.json();
    }).then((resp_data) => {
        showShoppingCart(resp_data);
        showProductTable()
    }).catch((error) => {
        console.error(`Could not login: ${error}`);
    });
});