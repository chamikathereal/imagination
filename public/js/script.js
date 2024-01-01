const charts = document.querySelectorAll(".chart");

charts.forEach(function(chart) {
    var ctx = chart.getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            }, ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});

$(document).ready(function() {
    $(".data-table").each(function(_, table) {
        $(table).DataTable();
    });
});

function adminSignIn() {
    var email = document.getElementById("exampleInputEmail1");
    var password = document.getElementById("exampleInputPassword1");

    var form = new FormData();
    form.append("email", email.value);
    form.append("password", password.value);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            if (t == "Success") {
                window.location = "adminPage.php";
            } else {
                alert(t);
            }
        }
    };

    r.open("POST", "adminSigninProcess.php", true);
    r.send(form);
}

function signOut() {
    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            if (t == "Success") {
                window.location.reload();
            } else {
                alert(t);
            }
        }
    };

    r.open("GET", "adminSignOutProcess.php", true);
    r.send();
}

function inputPrices(id) {
    var checkbox = document.getElementById("inlineCheckbox" + id);
    var input = document.getElementById("iphoneprice" + id);

    if (checkbox.checked) {
        input.disabled = false;
    } else {
        input.disabled = true;
    }
}

function uploadPrevImg() {
    var img = document.getElementById("prev_img");
    var selector = document.getElementById("prev_img_selector");

    selector.onchange = function() {
        var file = this.files[0];
        var url = window.URL.createObjectURL(file);
        img.src = url;
    };
}

function uploadItemImg1() {
    var img = document.getElementById("item_img1");
    var selector = document.getElementById("item_img1_selector");

    selector.onchange = function() {
        var file = this.files[0];
        var url = window.URL.createObjectURL(file);
        img.src = url;
    };
}

function uploadItemImg2() {
    var img = document.getElementById("item_img2");
    var selector = document.getElementById("item_img2_selector");

    selector.onchange = function() {
        var file = this.files[0];
        var url = window.URL.createObjectURL(file);
        img.src = url;
    };
}

function uploadBoxImg1() {
    var img = document.getElementById("box_img1");
    var selector = document.getElementById("box_img1_selector");

    selector.onchange = function() {
        var file = this.files[0];
        var url = window.URL.createObjectURL(file);
        img.src = url;
    };
}

function uploadBoxImg2() {
    var img = document.getElementById("box_img2");
    var selector = document.getElementById("box_img2_selector");

    selector.onchange = function() {
        var file = this.files[0];
        var url = window.URL.createObjectURL(file);
        img.src = url;
    };
}

function addColor() {
    var color = document.getElementById("color_selector");
    var color_name = document.getElementById("color_name");

    var form = new FormData();
    form.append("color_name", color_name.value);

    if (color.files.length != 0) {
        form.append("color_img", color.files[0]);

        var r = new XMLHttpRequest();

        r.onreadystatechange = function() {
            if (r.readyState == 4) {
                var t = r.responseText;
                if (t == "Success") {
                    window.location.reload();
                    var modal = document.getElementById("exampleModal");
                    new bootstrap.Modal(modal).show();
                } else {
                    alert(t);
                }
            }
        };

        r.open("POST", "addColorProcess.php", true);
        r.send(form);
    }
}

var selectedColors = [];

function selectColor(id) {
    selectedColors = [];

    var checkboxes = document.querySelectorAll("[data-color-checkbox]");

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var colorId = checkbox.getAttribute("data-color-id");
            selectedColors.push(colorId);
        }
    });

    console.log("Selected Colors:", selectedColors);
}

function addProduct() {

    let btn = document.getElementById("addIphone_btn");
    btn.innerHTML = "Loading...";
    btn.disabled = true;

    var title = document.getElementById("title");
    var free_item = document.getElementById("free_item");
    var short_desc = document.getElementById("short_desc");
    var display_size = document.getElementById("display_size");
    var desc01 = document.getElementById("desc01");
    var desc02 = document.getElementById("desc02");

    var stock;

    if (document.getElementById("exampleRadios1").checked) {
        stock = document.getElementById("exampleRadios1");
    } else if (document.getElementById("exampleRadios2").checked) {
        stock = document.getElementById("exampleRadios2");
    }

    var prev_img = document.getElementById("prev_img_selector");
    var item_img1_selector = document.getElementById("item_img1_selector");
    var item_img2_selector = document.getElementById("item_img2_selector");
    var box_img1_selector = document.getElementById("box_img1_selector");
    var box_img2_selector = document.getElementById("box_img2_selector");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedStorageIds = [];

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            const storageId = parseInt(checkbox.value);

            if (checkbox.checked) {
                selectedStorageIds.push(storageId);
            } else {
                const index = selectedStorageIds.indexOf(storageId);
                if (index !== -1) {
                    selectedStorageIds.splice(index, 1);
                }
            }
        });
    });

    var pricesArray = {};
    var inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach(function(inputElement) {
        var id = inputElement.id.replace("iphoneprice", "");
        var price = parseFloat(inputElement.value);
        if (!isNaN(price)) {
            pricesArray[id] = price;
        }
    });

    var form = new FormData();
    form.append("title", title.value);
    form.append("free_item", free_item.value);
    form.append("short_desc", short_desc.value);
    form.append("display_size", display_size.value);
    form.append("desc01", desc01.value);
    form.append("desc02", desc02.value);
    form.append("stock", stock.value);
    form.append("prev_img", prev_img.files["0"]);
    form.append("item_img1", item_img1_selector.files["0"]);
    form.append("item_img2", item_img2_selector.files["0"]);
    form.append("box_img1", box_img1_selector.files["0"]);
    form.append("box_img2", box_img2_selector.files["0"]);
    form.append("colorArray", JSON.stringify(selectedColors));
    form.append("pricesArray", JSON.stringify(pricesArray));

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {

        if (r.readyState == 4) {

            btn.innerHTML = "Save Your Item Details.";
            btn.disabled = false;

            var t = r.responseText;
            if (t == "Success") {
                alert("Product Added Successfully.");
                window.location = "seeMyproducts.php";
            } else {
                alert(t);
                console.log(t);
            }
        }
    };

    r.open("POST", "addPhoneProcess.php", true);
    r.send(form);
}

var selectedImageId = null;

var colorImages = document.querySelectorAll(".selectable-image");

var selectableImages = document.querySelectorAll(".selectable-image");

selectableImages.forEach(function(image) {
    image.addEventListener("click", function() {
        var imageId = this.id;
        var colorId = imageId.replace("inputColor", "");

        selectedImageId = colorId;

        selectableImages.forEach(function(otherImage) {
            if (otherImage !== image) {
                otherImage.classList.remove("selected");
            }
        });
        image.classList.add("selected");
    });
});

function userDetails(product_id, category_id) {

    if (category_id == 1) {

        var selectedCheckbox = $("input[name='options']:checked");

        if (selectedCheckbox.length > 0) {

            if (selectedImageId == null) {

                alert("Please Select Color You Want.");

            } else {

                var selectedStorageId = selectedCheckbox.val();
                var product_id = product_id;
                var quantity = document.getElementById("qty").value;

                var r = new XMLHttpRequest();

                r.onreadystatechange = function() {
                    if (r.readyState == 4 && r.status == 200) {
                        var t = r.responseText;
                        if (t == "Success") {
                            window.location = "userDetails.php?id=" + product_id;
                        } else {
                            alert(t);
                        }
                    }
                }

                r.open("GET", "buyProductDetails.php?colorId=" + selectedImageId + "&productId=" + product_id + "&quantity=" + quantity + "&storageId=" + selectedStorageId, true);
                r.send();

            }

        } else {

            alert("Please Select Storage You Want.");

        }

    } else if (category_id == 2) {

        if (selectedImageId == null) {

            alert("Please Select Color You Want.");

        } else {

            var product_id = product_id;
            var quantity = document.getElementById("qty").value;

            var r = new XMLHttpRequest();

            r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                    var t = r.responseText;
                    if (t == "Success") {
                        window.location = "userDetails.php?id=" + product_id;
                    } else {
                        alert(t);
                    }
                }
            }

            r.open("GET", "buyProductDetails.php?colorId=" + selectedImageId + "&productId=" + product_id + "&quantity=" + quantity, true);
            r.send();

        }

    }

}

function buyNow() {
    let btn = document.getElementById("user_details_buy_btn");
    btn.innerHTML = "Loading...";
    btn.disabled = true;

    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var address = document.getElementById("address");
    var province = document.getElementById("province");
    var city = document.getElementById("city");
    var postalCode = document.getElementById("postalCode");
    var country = document.getElementById("country");
    var location = document.getElementById("location");
    var note = document.getElementById("note");

    var form = new FormData();
    form.append("fname", fname.value);
    form.append("lname", lname.value);
    form.append("email", email.value);
    form.append("mobile", mobile.value);
    form.append("address", address.value);
    form.append("province", province.value);
    form.append("city", city.value);
    form.append("postalCode", postalCode.value);
    form.append("country", country.value);
    form.append("location", location.value);
    form.append("note", note.value);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var response = JSON.parse(r.responseText);

            if (response.status === "Success") {
                var invoiceNumber = response.invoice_number;
                var stripeProduct = response.stripeProduct;
                var buying_qty = parseInt(response.buying_qty);

                return stripeCheckout(
                    email.value,
                    stripeProduct,
                    buying_qty,
                    invoiceNumber
                );
            } else if (response.status === "Error") {
                btn.innerHTML = "Buy Now";
                btn.disabled = false;
                alert(response.message);
            } else {
                btn.innerHTML = "Buy Now";
                btn.disabled = false;
                alert("Failed to create an invoice.");
            }
        }
    };

    r.open("POST", "buyNowProcess.php", true);
    r.send(form);
}

function buyAgain(invoiceNumber, stripeProduct) {
    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var response = JSON.parse(r.responseText);
            if (response.status == "Success") {
                var invoiceNumber = response.invoice_number;
                var buying_qty = parseInt(response.buying_qty);
                var email = response.email;

                return stripeCheckout(
                    email.value,
                    stripeProduct,
                    buying_qty,
                    invoiceNumber
                );
            } else {
                alert(response);
            }
        }
    };

    r.open("GET", "services/getInvoiceDetails.php?in=" + invoiceNumber, true);
    r.send();
}

function stripeCheckout(email, stripeProduct, qty, invoiceNumber) {
    var stripe = Stripe(
        "pk_live_51NvbVXFAOMQYldR2q5HtkYvMmCmO2q0k8GMgN4YyRszpVmuZ2TnH30SWGHfUB5TZqct0vmIuVeNpfdWCT1JN3dRv00tXCgrLg9"
    );

    try {
        stripe
            .redirectToCheckout({
                lineItems: [{
                    price: stripeProduct,
                    quantity: qty,
                }, ],
                mode: "payment",
                successUrl: "https://popsapple.com/services/payment.php?type=success&in=" +
                    invoiceNumber,
                cancelUrl: "https://popsapple.com/services/payment.php?type=cancel&in=" +
                    invoiceNumber +
                    "&stripeProduct=" +
                    stripeProduct,
                clientReferenceId: toString(invoiceNumber),
                customerEmail: email,
            })
            .then(() => {
                let btn = document.getElementById("user_details_buy_btn");
                btn.innerHTML = "Buy Now";
                btn.disabled = false;
            });
    } catch (error) {
        alert("An error occurred! Please Try Again");
        let btn = document.getElementById("user_details_buy_btn");
        btn.innerHTML = "Buy Now";
        btn.disabled = false;
        console.error(error);
    }
}

function addLaptop() {

    let btn = document.getElementById("addLaptop_btn");
    btn.innerHTML = "Loading...";
    btn.disabled = true;

    var prev_img_selector = document.getElementById("prev_img_selector");
    var title = document.getElementById("title");
    var free_item = document.getElementById("free_item");
    var short_desc = document.getElementById("desc");
    var cpu = document.getElementById("cpu");
    var gpu = document.getElementById("gpu");
    var memo = document.getElementById("memo");
    var storage = document.getElementById("storage");
    var item_img1_selector = document.getElementById("item_img1_selector");
    var item_img2_selector = document.getElementById("item_img2_selector");
    var display_size = document.getElementById("display_size");
    var price = document.getElementById("price");
    var desc01 = document.getElementById("desc01");
    var desc02 = document.getElementById("desc02");
    var stock_id;

    if (document.getElementById("instock").checked) {
        stock_id = document.getElementById("instock");
    } else if (document.getElementById("outofstock").checked) {
        stock_id = document.getElementById("outofstock");
    }

    var form = new FormData();
    form.append("prev_img_selector", prev_img_selector.files["0"]);
    form.append("title", title.value);
    form.append("free_item", free_item.value);
    form.append("short_desc", short_desc.value);
    form.append("cpu", cpu.value);
    form.append("gpu", gpu.value);
    form.append("memo", memo.value);
    form.append("storage", storage.value);
    form.append("item_img1_selector", item_img1_selector.files["0"]);
    form.append("item_img2_selector", item_img2_selector.files["0"]);
    form.append("display_size", display_size.value);
    form.append("price", price.value);
    form.append("desc01", desc01.value);
    form.append("desc02", desc02.value);
    form.append("stock_id", stock_id.value);
    form.append("colors", JSON.stringify(selectedColors));

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            btn.innerHTML = "Save Your Item Details.";
            btn.disabled = false;

            var t = r.responseText;
            if (t == "Success") {
                alert("Product Added Successfully.");
                window.location = "seeMyproducts.php";
            } else {
                alert(t);
            }
        }
    };

    r.open("POST", "addLaptopProcess.php", true);
    r.send(form);
}

function deleteProduct(product_id) {
    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            if (t == "Success") {
                alert("Selected Product Removed Successfully.");
                window.location.reload();
            } else {
                alert(t);
            }
        }
    };

    r.open("GET", "deleteMyProductProdess.php?id=" + product_id, true);
    r.send();
}

function updateProduct(id) {
    var title = document.getElementById("title");
    var free_item = document.getElementById("free_item");
    var short_desc = document.getElementById("short_desc");
    var display_size = document.getElementById("display_size");
    var desc01 = document.getElementById("desc01");
    var desc02 = document.getElementById("desc02");

    var stock;

    if (document.getElementById("exampleRadios1").checked) {
        stock = document.getElementById("exampleRadios1");
    } else if (document.getElementById("exampleRadios2").checked) {
        stock = document.getElementById("exampleRadios2");
    }

    var prev_img = document.getElementById("prev_img_selector");
    var item_img1_selector = document.getElementById("item_img1_selector");
    var item_img2_selector = document.getElementById("item_img2_selector");
    var box_img1_selector = document.getElementById("box_img1_selector");
    var box_img2_selector = document.getElementById("box_img2_selector");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedStorageIds = [];

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            const storageId = parseInt(checkbox.value);

            if (checkbox.checked) {
                selectedStorageIds.push(storageId);
            } else {
                const index = selectedStorageIds.indexOf(storageId);
                if (index !== -1) {
                    selectedStorageIds.splice(index, 1);
                }
            }
        });
    });

    var pricesArray = {};
    var inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach(function(inputElement) {
        var id = inputElement.id.replace("iphoneprice", "");
        var price = parseFloat(inputElement.value);
        if (!isNaN(price)) {
            pricesArray[id] = price;
        }
    });

    var form = new FormData();

    form.append("id", id);
    form.append("title", title.value);
    form.append("free_item", free_item.value);
    form.append("short_desc", short_desc.value);
    form.append("display_size", display_size.value);
    form.append("desc01", desc01.value);
    form.append("desc02", desc02.value);
    form.append("stock", stock.value);
    form.append("colorArray", JSON.stringify(selectedColors));
    form.append("pricesArray", JSON.stringify(pricesArray));

    if (prev_img.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Preview Photo of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("prev_img", prev_img.files["0"]);
    }

    if (item_img1_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Item Image 01 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("item_img1", item_img1_selector.files["0"]);
    }

    if (item_img2_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Item Image 02 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("item_img2", item_img2_selector.files["0"]);
    }

    if (box_img1_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Box Image 01 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("box_img1", box_img1_selector.files["0"]);
    }

    if (box_img2_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Box Image 02 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("box_img2", box_img2_selector.files["0"]);
    }

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var t = r.responseText;
            console.log("t");
            console.log(t);
            if (t == "Success") {
                alert("Product Updated Successfully.");
                window.location = "seeMyproducts.php";
            } else {
                alert(t);
            }
        }
    };

    r.open("POST", "updatePhoneProcess.php", true);
    r.send(form);
}

function viewPrice(storage_id, price) {
    document.getElementById("productPrice").innerHTML = "KWD " + price + " ";
    document.getElementById("productPrice").classList = "p-tags-font-small-card bold-font d-block";
}

function updateLaptop(id) {
    var prev_img_selector = document.getElementById("prev_img_selector");
    var title = document.getElementById("title");
    var free_item = document.getElementById("free_item");
    var short_desc = document.getElementById("desc");
    var cpu = document.getElementById("cpu");
    var gpu = document.getElementById("gpu");
    var memo = document.getElementById("memo");
    var storage = document.getElementById("storage");
    var item_img1_selector = document.getElementById("item_img1_selector");
    var item_img2_selector = document.getElementById("item_img2_selector");
    var display_size = document.getElementById("display_size");
    var price = document.getElementById("price");
    var desc01 = document.getElementById("desc01");
    var desc02 = document.getElementById("desc02");
    var stock_id;

    if (document.getElementById("instock").checked) {
        stock_id = document.getElementById("instock");
    } else if (document.getElementById("outofstock").checked) {
        stock_id = document.getElementById("outofstock");
    }

    var form = new FormData();

    form.append("id", id);
    form.append("title", title.value);
    form.append("free_item", free_item.value);
    form.append("short_desc", short_desc.value);
    form.append("cpu", cpu.value);
    form.append("gpu", gpu.value);
    form.append("memo", memo.value);
    form.append("storage", storage.value);
    form.append("display_size", display_size.value);
    form.append("price", price.value);
    form.append("desc01", desc01.value);
    form.append("desc02", desc02.value);
    form.append("stock_id", stock_id.value);
    form.append("colors", JSON.stringify(selectedColors));

    if (prev_img_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Preview Photo of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("prev_img_selector", prev_img_selector.files["0"]);
    }

    if (item_img1_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Item Image 01 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("item_img1_selector", item_img1_selector.files["0"]);
    }

    if (item_img2_selector.files.length == 0) {
        var confirmation = confirm(
            "Are you sure don't want to update Item Image 02 of Product?"
        );

        if (!confirmation) {
            alert("You haven't select any image yet.");
        }
    } else {
        form.append("item_img2_selector", item_img2_selector.files["0"]);
    }

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            if (t == "Success") {
                alert("Product Updated Successfully.");
                window.location = "seeMyproducts.php";
            } else {
                alert(t);
            }
        }
    };

    r.open("POST", "updateLaptopProcess.php", true);
    r.send(form);
}

function searchProduct(category) {
    var searchBar = document.getElementById("searchBar");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            document.getElementById("search_body").innerHTML = t;
        }
    };

    r.open(
        "GET",
        "searchProductProcess.php?text=" +
        searchBar.value +
        "&category=" +
        category,
        true
    );
    r.send();
}

function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_7umwz4x";
    const templateID = "template_w3aldl5";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message sent successfully!!");
        })
        .catch((err) => console.log(err));
}

function selectCity() {

    var province = document.getElementById("province");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            document.getElementById("city").innerHTML = t;
        }
    }

    r.open("GET", "selectCityprocess.php?province_id=" + province.value, true);
    r.send();

}

function selectProvince() {

    var country = document.getElementById("country");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            document.getElementById("province").innerHTML = t;
        }
    }

    r.open("GET", "selectProvinceProcess.php?country_id=" + country.value, true);
    r.send();

}

function selectCity() {

    var province = document.getElementById("province");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            document.getElementById("city").innerHTML = t;
        }
    }

    r.open("GET", "selectCityprocess.php?province_id=" + province.value, true);
    r.send();

}

function selectProvince() {

    var country = document.getElementById("country");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var t = r.responseText;
            document.getElementById("province").innerHTML = t;
        }
    }

    r.open("GET", "selectProvinceProcess.php?country_id=" + country.value, true);
    r.send();

}

function deleteColor() {

    var form = new FormData();
    form.append("colorArray", JSON.stringify(selectedColors));

    var r = new XMLHttpRequest();

    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var t = r.responseText;
            if (t == "Success") {
                window.location.reload();
                var modal = document.getElementById("exampleModal");
                new bootstrap.Modal(modal).show();
            } else {
                alert(t);
            }
        }
    };

    r.open("POST", "deleteColorProcess.php", true);
    r.send(form);

}