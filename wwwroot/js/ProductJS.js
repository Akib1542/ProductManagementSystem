let sortOrder = 'asc';
let sortColumn = 'price';
let products = [];

$(document).ready(function () {
    GetProducts();

    // Sort by Price
    $('#priceHeader').on('click', function () {
        sortColumn = 'price';
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
        RenderProducts();
    });

    // Sort by Quantity
    $('#quantityHeader').on('click', function () {
        sortColumn = 'quantity';
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
        RenderProducts();
    });

    // Trigger search on button click & Filter and display based on search query
    $('#searchButton').on('click', function () {
        RenderProducts(); 
    });

    // Trigger search on keyup (e.g., Enter key press)
    $('#searchInput').on('keyup', function () {
        RenderProducts(); 
    });
});

/* Read Data */
function GetProducts() {
    $.ajax({
        url: '/product/GetProducts',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            products = response || []; // Store all the products
            RenderProducts(); // Initial render
        },
        error: function () {
            alert('Unable to read the data');
        }
    });
}

/* Render Products with Sorting and Filtering */
function RenderProducts() {
    let searchQuery = $('#searchInput').val().toLowerCase();

    // Filter the products based on the search query
    let filteredProducts = products.filter(function (item) {
        return item.productName.toLowerCase().includes(searchQuery) ||
            item.price.toString().includes(searchQuery) ||
            item.quantity.toString().includes(searchQuery);
    });

    // Sort the filtered products
    filteredProducts.sort(function (a, b) {
        if (sortColumn === 'price') {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortColumn === 'quantity') {
            return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
        }
        return 0;
    });

    // Render the products
    var object = '';
    if (filteredProducts.length === 0) {
        object += '<tr>';
        object += '<td colspan="6">No products found</td>';
        object += '</tr>';
    } else {
        $.each(filteredProducts, function (index, item) {
            object += '<tr>';
            object += '<td>' + (index + 1) + '</td>';  
            object += '<td>' + item.id + '</td>';   
            object += '<td>' + item.productName + '</td>';
            object += '<td>' + item.price + '</td>';
            object += '<td>' + item.quantity + '</td>';
            object += '<td><a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</a> ' +
                '<a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.id + ')">Delete</a></td>';
            object += '</tr>';
        });
    }
    $('#tblBody').html(object);
}


$('#btnAdd').click(function () {
    $('#ProductModal').modal('show');
    $('#modalTitle').text('Add Product');
});
/*Insert Data*/
function Insert() {

    var result = Validate();
    if (!result) {
        return false;
    }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.quantity = $('#Quantity').val();


    $.ajax({
        url: '/product/Insert',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save data!');
            }
            else {
                HideModal()
                RenderProducts();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save data!');
        }
    });
}

function HideModal() {
    ClearData();
    $('#ProductModal').modal('hide');
}

function ClearData() {
    $('#ProductName').val('');
    $('#Price').val('');
    $('#Quantity').val('');
    $('#ProductName').css('border-color', 'Green');
    $('#Price').css('border-color', 'Green');
    $('#Quantity').css('border-color', 'Green');
}

function Validate() {
    var isValid = true;
    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'Green');
    }

    if ($('#Price').val().trim() == "" || $('#Price').val()<1) {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'Green');
    }

    if ($('#Quantity').val().trim() == "" || $('#Quantity').val()<1) {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'Green');
    }

    return isValid;
}


$('#ProductName').change(function () {
    Validate();
});

$('#Price').change(function () {
    Validate();
});

$('#Quantity').change(function () {
    Validate();
});

/*Edit*/
function Edit(id) {
    $.ajax({
        url: 'product/Edit?id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data!');
            }
            else if (response.length == 0) {
                alert('data not avalilable with the id ' + id);
            }
            else {
                $('#ProductModal').modal('show');
                $('#modalTitle').text('Update Product');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#ProductName').val(response.productName);
                $('#Price').val(response.price);
                $('#Quantity').val(response.quantity);
            }
        },
        error: function () {
            alert('Unable to read the data!');
        }
    });
}

/*Update Data*/
function Update() {
    var result = Validate();
    if (!result) {
        return false;
    }
    var formData = new Object();

    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.quantity = $('#Quantity').val();


    $.ajax({
        url: '/product/Update',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save data!');
            }
            else {
                HideModal()
                RenderProducts();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save data!');
        }
    });
}

/*Delete*/

function Delete(id) {
    if (confirm('Are you sure to delete this?')) {
        $.ajax({
            url: 'product/Delete?id=' + id,
            type: 'post',
            success: function (response) {
                if (response == null || response == undefined) {
                    alert('Unable to Delete the data!');
                }
                else {
                    GetProducts();
                    alert(response);
                }
            },
            error: function () {
                alert('Unable to Delete the data!');
            }
        });
    }
}