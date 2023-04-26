window.onload = function (e) {
    getProducts();
};


async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();

    for (let e of jsonData) {
        addNewProductRowToTable(e.id, e.title, e.description, e.price);
    }
}


function addNewProductRowToTable(id, title, description, price) {
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(id));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(description));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);


    let product = {id: id, title: title, description: description, price: price};

    let btnEdit = document.createElement('button');
    btnEdit.setAttribute('class', 'btn btn-outline-success');
    btnEdit.setAttribute('id', 'edit-product-' + id);
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.setAttribute('data-target', '#exampleModal');
    btnEdit.setAttribute('data-product', JSON.stringify(product));
    btnEdit.appendChild(document.createTextNode('Edit'));

    let btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'btn btn-outline-danger');
    btnDelete.setAttribute('id', 'delete-product-' + id);
    btnDelete.setAttribute('type', 'button');
    btnDelete.addEventListener('click', deleteProduct);
    btnDelete.appendChild(document.createTextNode('Delete'));


    cell = document.createElement('td');
    cell.appendChild(btnEdit);
    cell.appendChild(btnDelete);
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);
}


$('#exampleModal').on('show.bs.modal', function (e) {
    let product = JSON.parse(e.relatedTarget.dataset["product"]);
    $('#editID').val(product.id);
    $('#editTitle').val(product.title);
    $('#editDescription').val(product.description);
    $('#editPrice').val(product.price);
});

async function addProduct() {
    async function postProduct(title, description, price) {
        let b = {"title": title, "description": description, "price": price}
        let setting = {
            method: 'POST',
            body: JSON.stringify(b),
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch("http://localhost:3000/products", setting);
        return await response.json();
    }

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    document.getElementById('title').innerHTML = await postProduct(title, description, price);
    document.getElementById('frmNewProduct').reset();

    return true;
}

async function editProduct() {
    async function putProduct(id, title, description, price) {
        let b = {"id": id, "title": title, "description": description, "price": price}
        let setting = {
            method: 'PUT',
            body: JSON.stringify(b),
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch("http://localhost:3000/products/" + id, setting);
        return await response.json();
    }

    const id = document.getElementById('editID').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const price = document.getElementById('editPrice').value;

    await putProduct(id, title, description, price);

    document.getElementById('frmUpdateProduct').reset();

    return true;
}

async function deleteProduct(e) {
    async function deleteProductApi(id) {
        let setting = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };
        const response = await fetch('http://localhost:3000/products/' + id, setting);
        return await response.json();
    }

    let id = e.target.getAttribute('id').split('-')[2];
    const data = await deleteProductApi(id);
    if (data) {
        window.location.reload();
    }
}
