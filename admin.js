/* ================= DATABASE ================= */

let listings =
    JSON.parse(
        localStorage.getItem("vceListings")
    ) || [];


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    renderAdmin
);


/* ================= DYNAMIC FORM ================= */

function loadAdminFields() {

    const role =
        document.getElementById("adminRole").value;


    const box =
        document.getElementById(
            "adminDynamicFields"
        );


    if (!role) {

        box.innerHTML = "";

        return;

    }


    if (role === "transport") {

        box.innerHTML = `

            <div class="dynamic-fields">

                <div class="form-grid">

                    <div>

                        <label>Vehicle</label>

                        <input
                            id="vehicle"
                            placeholder="Tata 407"
                        >

                    </div>

                    <div>

                        <label>Vehicle type</label>

                        <input
                            id="vehicleType"
                            placeholder="Mini truck"
                        >

                    </div>

                    <div>

                        <label>Capacity kg</label>

                        <input
                            id="capacity"
                            type="number"
                        >

                    </div>

                    <div>

                        <label>Charge per trip ₹</label>

                        <input
                            id="charge"
                            type="number"
                        >

                    </div>

                </div>

            </div>

        `;

        return;

    }


    if (
        role === "marketer" ||
        role === "wholesaler" ||
        role === "retailer"
    ) {

        box.innerHTML = `

            <div class="dynamic-fields">

                <label>
                    Crops accepted
                </label>

                <input
                    id="acceptedCrops"
                    placeholder="Coconut, Banana, Tomato"
                >

                <div
                    style="margin-top:12px;"
                >

                    <label>
                        Price range
                    </label>

                    <input
                        id="price"
                        placeholder="₹25 - ₹32/kg"
                    >

                </div>

            </div>

        `;

        return;

    }


    if (role === "farmer") {

        box.innerHTML = `

            <div class="dynamic-fields">

                <div class="form-grid">

                    <div>

                        <label>Crop</label>

                        <input
                            id="crop"
                            placeholder="Coconut"
                        >

                    </div>

                    <div>

                        <label>Quantity kg</label>

                        <input
                            id="quantity"
                            type="number"
                        >

                    </div>

                    <div>

                        <label>Price min ₹</label>

                        <input
                            id="priceMin"
                            type="number"
                        >

                    </div>

                    <div>

                        <label>Price max ₹</label>

                        <input
                            id="priceMax"
                            type="number"
                        >

                    </div>

                </div>

            </div>

        `;

        return;

    }


    box.innerHTML = `

        <div class="dynamic-fields">

            <label>
                Additional information
            </label>

            <input
                id="additional"
                placeholder="Enter details"
            >

        </div>

    `;

}


/* ================= SAVE ================= */

function saveAdminListing() {

    const role =
        document.getElementById("adminRole").value;


    const name =
        document.getElementById("adminName").value;


    const phone =
        document.getElementById("adminPhone").value;


    const state =
        document.getElementById("adminState").value;


    const location =
        document.getElementById("adminLocation").value;


    if (!role || !name || !phone) {

        alert(
            "Please complete role, name and phone."
        );

        return;

    }


    const listing = {

        id:
            "admin_" +
            Date.now(),

        role,

        name,

        phone,

        state,

        location

    };


    if (role === "transport") {

        listing.vehicle =
            value("vehicle");

        listing.vehicleType =
            value("vehicleType");

        listing.capacity =
            Number(value("capacity"));

        listing.charge =
            Number(value("charge"));

    }


    if (role === "farmer") {

        listing.crops = [

            {

                name:
                    value("crop"),

                quantity:
                    Number(value("quantity")),

                priceMin:
                    Number(value("priceMin")),

                priceMax:
                    Number(value("priceMax"))

            }

        ];

    }


    if (
        role === "marketer" ||
        role === "wholesaler" ||
        role === "retailer"
    ) {

        listing.acceptedCrops =
            value("acceptedCrops");

        listing.price =
            value("price");

    }


    listings.push(listing);


    saveDatabase();


    alert(
        "Participant added successfully."
    );


    clearForm();

    renderAdmin();

}


/* ================= DATABASE ================= */

function saveDatabase() {

    localStorage.setItem(
        "vceListings",
        JSON.stringify(listings)
    );

}


/* ================= RENDER ================= */

function renderAdmin() {

    document
        .getElementById("totalListings")
        .textContent =
        listings.length;


    document
        .getElementById("farmerCount")
        .textContent =
        countRole("farmer");


    document
        .getElementById("transportCount")
        .textContent =
        countRole("transport");


    document
        .getElementById("marketerCount")
        .textContent =
        countRole("marketer");


    const box =
        document.getElementById(
            "adminListings"
        );


    if (!listings.length) {

        box.innerHTML =
            "<p>No records yet.</p>";

        return;

    }


    box.innerHTML = "";


    listings.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "admin-record";


        div.innerHTML = `

            <div>

                <small>
                    ${item.role}
                </small>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ${item.location},
                    ${item.state}
                </p>

            </div>


            <button
                class="delete-button"
                onclick="deleteListing('${item.id}')"
            >
                DELETE
            </button>

        `;


        box.appendChild(div);

    });

}


/* ================= DELETE ================= */

function deleteListing(id) {

    if (
        !confirm(
            "Delete this participant?"
        )
    ) {
        return;
    }


    listings =
        listings.filter(
            item => item.id !== id
        );


    saveDatabase();

    renderAdmin();

}


/* ================= HELPERS ================= */

function countRole(role) {

    return listings.filter(
        item => item.role === role
    ).length;

}


function value(id) {

    const el =
        document.getElementById(id);

    return el
        ? el.value.trim()
        : "";

}


function clearForm() {

    document
        .getElementById("adminRole")
        .value = "";

    document
        .getElementById("adminName")
        .value = "";

    document
        .getElementById("adminPhone")
        .value = "";

    document
        .getElementById("adminLocation")
        .value = "";

    document
        .getElementById("adminDynamicFields")
        .innerHTML = "";

}