$(document).ready(function () {
    GetProducts();
});

/* Read Data */
function GetProducts() {
    $.ajax({
        url:'/product/GetProducts',
        type:'GET',
        dataType:'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="5">' + 'Products not available' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);
            }
            else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.productName + '</td>';
                    object += '<td>' + item.price + '</td>';
                    object += '<td>' + item.quantity + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')" > Edit</a > <a href="#" class = "btn btn-danger btn-sm" onclick = "Delete(' + item.id + ')" > Delete</a></td>';
                });
                $('#tblBody').html(object);
            }
        },
        error: function() {
           alert('Unable to read the data');
        }
        
    });
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
                GetProducts();
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

    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'Green');
    }

    if ($('#Quantity').val().trim() == "") {
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
        type:'get',
        contentType:'application/json;charset=utf-8',
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
                GetProducts();
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