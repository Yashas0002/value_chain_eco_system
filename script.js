/* =========================================================
   VALUE CHAIN ENGINE
   USER WEBSITE
   ========================================================= */


/* ================= ROLE CONNECTIONS ================= */

const roleConnections = {

    farmer: [
        ["harvester", "Harvesters", "Find people who can harvest your crops."],
        ["tools", "Tools Distributor", "Find agricultural tools and equipment."],
        ["sorting", "Sorting & Grading", "Find sorting, grading and packing facilities."],
        ["transport", "Transportation", "Find vehicles for your produce."],
        ["marketer", "Marketers", "Find people buying and marketing crops."],
        ["wholesaler", "Wholesalers", "Find wholesale buyers."],
        ["retailer", "Retailers", "Find retailers."]
    ],

    harvester: [
        ["farmer", "Farmers", "Find farmers who need harvesting."],
        ["sorting", "Sorting & Grading", "Find crop processing facilities."],
        ["transport", "Transportation", "Find transport for harvested crops."],
        ["marketer", "Marketers", "Connect with marketers."],
        ["wholesaler", "Wholesalers", "Connect with wholesalers."],
        ["retailer", "Retailers", "Connect with retailers."]
    ],

    tools: [
        ["farmer", "Farmers", "Find farmers looking for equipment."]
    ],

    sorting: [
        ["farmer", "Farmers", "Find farmers supplying crops."],
        ["marketer", "Marketers", "Connect with marketers."],
        ["wholesaler", "Wholesalers", "Find wholesale buyers."],
        ["retailer", "Retailers", "Find retailers."]
    ],

    transport: [
        ["farmer", "Farmers", "Find farmers who need transportation."],
        ["marketer", "Marketers", "Find marketers requiring transport."],
        ["wholesaler", "Wholesalers", "Find wholesalers requiring transport."],
        ["retailer", "Retailers", "Find retailers requiring transport."]
    ],

    marketer: [
        ["farmer", "Farmers", "Find crop suppliers."],
        ["harvester", "Harvesters", "Find harvesting services."],
        ["sorting", "Sorting & Grading", "Find processing services."],
        ["transport", "Transportation", "Find transportation."],
        ["wholesaler", "Wholesalers", "Connect with wholesalers."],
        ["retailer", "Retailers", "Connect with retailers."]
    ],

    wholesaler: [
        ["farmer", "Farmers", "Find crop suppliers."],
        ["harvester", "Harvesters", "Find harvesting services."],
        ["sorting", "Sorting & Grading", "Find processing facilities."],
        ["transport", "Transportation", "Find transport."],
        ["marketer", "Marketers", "Connect with marketers."],
        ["retailer", "Retailers", "Find retailers."]
    ],

    retailer: [
        ["farmer", "Farmers", "Find farmers supplying directly."],
        ["transport", "Transportation", "Find transportation."],
        ["marketer", "Marketers", "Find agricultural marketers."],
        ["wholesaler", "Wholesalers", "Find wholesale suppliers."]
    ]

};


/* ================= SAMPLE DATABASE ================= */

let listings = JSON.parse(
    localStorage.getItem("vceListings")
) || [

    {
        id: "farmer001",

        role: "farmer",

        name: "Ramesh Farm",

        phone: "9876543210",

        state: "Karnataka",

        location: "Bengaluru",

        crops: [
            {
                name: "Coconut",
                quantity: 1500,
                priceMin: 25,
                priceMax: 32
            }
        ]
    },


    {
        id: "transport001",

        role: "transport",

        name: "Green Route Logistics",

        phone: "9988776655",

        state: "Karnataka",

        location: "Yelahanka",

        vehicle: "Tata 407",

        capacity: 2500,

        chargeMin: 3500,

        chargeMax: 5000,

        acceptedCrops: [
            "Coconut",
            "Banana",
            "Tomato"
        ]
    },


    {
        id: "marketer001",

        role: "marketer",

        name: "ABC Agricultural Marketing",

        phone: "9911223344",

        state: "Karnataka",

        location: "Hebbal",

        crops: [
            {
                name: "Coconut",
                priceMin: 25,
                priceMax: 32
            },
            {
                name: "Banana",
                priceMin: 18,
                priceMax: 25
            },
            {
                name: "Tomato",
                priceMin: 20,
                priceMax: 28
            }
        ]
    },


    {
        id: "wholesale001",

        role: "wholesaler",

        name: "Fresh Karnataka Wholesale",

        phone: "9900112233",

        state: "Karnataka",

        location: "Hebbal",

        crops: [
            {
                name: "Coconut",
                priceMin: 27,
                priceMax: 31
            }
        ]
    }

];


let currentUser =
    JSON.parse(localStorage.getItem("vceCurrentUser")) || null;

let selectedRole = null;

let selectedConnection = null;


/* ================= START ================= */

function startEngine() {

    if (currentUser) {

        showDashboard();

        return;

    }

    hideAllPages();

    document
        .getElementById("rolePage")
        .classList.remove("hidden");

}


/* ================= ROLE ================= */

function continueRole() {

    const role =
        document.getElementById("roleSelect").value;

    if (!role) {

        alert("Please select your role.");

        return;

    }

    selectedRole = role;

    document
        .getElementById("profileHeading")
        .textContent =
        `Build your ${role} profile`;

    createJobForm(role);

    hideAllPages();

    document
        .getElementById("profilePage")
        .classList.remove("hidden");

}


/* ================= JOB FORM ================= */

function createJobForm(role) {

    const box =
        document.getElementById("jobDetails");


    let html = "";


    if (role === "farmer") {

        html = `

            <h3>Farm information</h3>

            <div id="cropEntries">

                ${cropEntry()}

            </div>

            <button
                type="button"
                class="continue-button"
                onclick="addCrop()"
            >
                + ADD ANOTHER CROP
            </button>

        `;

    }


    if (role === "harvester") {

        html = `

            <h3>Harvesting information</h3>

            <div class="form-grid">

                <div>
                    <label>Crops you accept</label>
                    <input id="acceptedCrops"
                        placeholder="Coconut, Banana...">
                </div>

                <div>
                    <label>Service charge ₹</label>
                    <input id="charge"
                        type="number"
                        placeholder="500">
                </div>

            </div>

        `;

    }


    if (role === "tools") {

        html = `

            <h3>Business information</h3>

            <div class="form-grid">

                <div>
                    <label>Shop name</label>
                    <input id="shopName">
                </div>

                <div>
                    <label>Products</label>
                    <input id="products"
                        placeholder="Sprayers, tools...">
                </div>

            </div>

        `;

    }


    if (role === "sorting") {

        html = `

            <h3>Facility information</h3>

            <div class="form-grid">

                <div>
                    <label>Crops accepted</label>
                    <input id="acceptedCrops">
                </div>

                <div>
                    <label>Capacity per day (kg)</label>
                    <input id="capacity"
                        type="number">
                </div>

                <div>
                    <label>Services</label>
                    <input id="services"
                        placeholder="Sorting, grading...">
                </div>

            </div>

        `;

    }


    if (role === "transport") {

        html = `

            <h3>Vehicle information</h3>

            <div class="form-grid">

                <div>
                    <label>Vehicle name</label>
                    <input id="vehicle"
                        placeholder="Tata 407">
                </div>

                <div>
                    <label>Vehicle type</label>
                    <input id="vehicleType"
                        placeholder="Mini truck">
                </div>

                <div>
                    <label>Load capacity (kg)</label>
                    <input id="capacity"
                        type="number">
                </div>

                <div>
                    <label>Charge per trip ₹</label>
                    <input id="charge"
                        type="number">
                </div>

            </div>

        `;

    }


    if (
        role === "marketer" ||
        role === "wholesaler" ||
        role === "retailer"
    ) {

        html = `

            <h3>Business requirements</h3>

            <div id="cropEntries">

                ${businessCropEntry()}

            </div>

            <button
                type="button"
                class="continue-button"
                onclick="addBusinessCrop()"
            >
                + ADD ANOTHER CROP
            </button>

        `;

    }


    box.innerHTML = html;

}


/* ================= CROP ENTRY ================= */

function cropEntry() {

    return `

        <div class="form-grid crop-row">

            <div>
                <label>Crop</label>

                <select class="crop-name">

                    <option>Coconut</option>
                    <option>Tomato</option>
                    <option>Rice</option>
                    <option>Coffee</option>
                    <option>Arecanut</option>
                    <option>Banana</option>

                </select>
            </div>

            <div>
                <label>Quantity kg</label>

                <input
                    class="crop-quantity"
                    type="number"
                    placeholder="1000">
            </div>

            <div>
                <label>Expected price min ₹</label>

                <input
                    class="crop-min"
                    type="number"
                    placeholder="25">
            </div>

            <div>
                <label>Expected price max ₹</label>

                <input
                    class="crop-max"
                    type="number"
                    placeholder="32">
            </div>

        </div>

    `;

}


function addCrop() {

    document
        .getElementById("cropEntries")
        .insertAdjacentHTML(
            "beforeend",
            cropEntry()
        );

}


/* ================= BUSINESS CROP ================= */

function businessCropEntry() {

    return `

        <div class="form-grid crop-row">

            <div>

                <label>Crop</label>

                <select class="crop-name">

                    <option>Coconut</option>
                    <option>Tomato</option>
                    <option>Rice</option>
                    <option>Coffee</option>
                    <option>Arecanut</option>
                    <option>Banana</option>

                </select>

            </div>


            <div>

                <label>Minimum price ₹</label>

                <input
                    class="crop-min"
                    type="number"
                >

            </div>


            <div>

                <label>Maximum price ₹</label>

                <input
                    class="crop-max"
                    type="number"
                >

            </div>

        </div>

    `;

}


function addBusinessCrop() {

    document
        .getElementById("cropEntries")
        .insertAdjacentHTML(
            "beforeend",
            businessCropEntry()
        );

}


/* ================= SAVE PROFILE ================= */

function saveProfile() {

    const name =
        document.getElementById("nameInput").value.trim();

    const phone =
        document.getElementById("phoneInput").value.trim();

    const state =
        document.getElementById("stateInput").value;

    const location =
        document.getElementById("locationInput").value.trim();


    if (!name || !phone || !state || !location) {

        alert("Please complete your personal information.");

        return;

    }


    const user = {

        id: "user_" + phone,

        role: selectedRole,

        name,

        phone,

        state,

        location

    };


    /* FARMER */

    if (selectedRole === "farmer") {

        user.crops =
            collectFarmerCrops();

    }


    /* TRANSPORT */

    if (selectedRole === "transport") {

        user.vehicle =
            value("vehicle");

        user.vehicleType =
            value("vehicleType");

        user.capacity =
            Number(value("capacity"));

        user.charge =
            Number(value("charge"));

    }


    /* HARVESTER */

    if (selectedRole === "harvester") {

        user.acceptedCrops =
            value("acceptedCrops");

        user.charge =
            Number(value("charge"));

    }


    /* SORTING */

    if (selectedRole === "sorting") {

        user.acceptedCrops =
            value("acceptedCrops");

        user.capacity =
            Number(value("capacity"));

        user.services =
            value("services");

    }


    /* TOOLS */

    if (selectedRole === "tools") {

        user.shopName =
            value("shopName");

        user.products =
            value("products");

    }


    /* MARKETER / WHOLESALER / RETAILER */

    if (
        selectedRole === "marketer" ||
        selectedRole === "wholesaler" ||
        selectedRole === "retailer"
    ) {

        user.crops =
            collectBusinessCrops();

    }


    /* SAVE */

    listings.push(user);

    saveDatabase();


    currentUser = user;

    localStorage.setItem(
        "vceCurrentUser",
        JSON.stringify(user)
    );


    showDashboard();

}


/* ================= FARMER DATA ================= */

function collectFarmerCrops() {

    const rows =
        document.querySelectorAll(".crop-row");

    const crops = [];


    rows.forEach(row => {

        crops.push({

            name:
                row.querySelector(".crop-name").value,

            quantity:
                Number(
                    row.querySelector(".crop-quantity").value
                ),

            priceMin:
                Number(
                    row.querySelector(".crop-min").value
                ),

            priceMax:
                Number(
                    row.querySelector(".crop-max").value
                )

        });

    });


    return crops;

}


/* ================= BUSINESS DATA ================= */

function collectBusinessCrops() {

    const rows =
        document.querySelectorAll(".crop-row");

    const crops = [];


    rows.forEach(row => {

        crops.push({

            name:
                row.querySelector(".crop-name").value,

            priceMin:
                Number(
                    row.querySelector(".crop-min").value
                ),

            priceMax:
                Number(
                    row.querySelector(".crop-max").value
                )

        });

    });


    return crops;

}


/* ================= DASHBOARD ================= */

function showDashboard() {

    if (!currentUser) return;


    hideAllPages();


    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");


    document
        .getElementById("navProfile")
        .classList.remove("hidden");


    document
        .getElementById("navUserName")
        .textContent =
        currentUser.name;


    document
        .getElementById("welcomeText")
        .textContent =
        `Welcome, ${currentUser.name}`;


    document
        .getElementById("roleText")
        .textContent =
        capitalize(currentUser.role);


    document
        .getElementById("dashLocation")
        .textContent =
        `${currentUser.location}, ${currentUser.state}`;


    document
        .getElementById("dashRole")
        .textContent =
        capitalize(currentUser.role);


    renderNetwork();

    renderCurrentData();

}


/* ================= NETWORK ================= */

function renderNetwork() {

    const list =
        document.getElementById("networkList");


    list.innerHTML = "";


    const connections =
        roleConnections[currentUser.role];


    connections.forEach(item => {

        const [role, name, description] = item;


        const div =
            document.createElement("div");


        div.className =
            "network-item";


        div.innerHTML = `

            <h3>${name}</h3>

            <p>${description}</p>

            <span>
                Explore →
            </span>

        `;


        div.onclick = () => {

            openSearch(role, name);

        };


        list.appendChild(div);

    });

}


/* ================= CURRENT DATA ================= */

function renderCurrentData() {

    const box =
        document.getElementById("currentData");


    let html = "";


    html += dataRow(
        "Name",
        currentUser.name
    );


    html += dataRow(
        "Phone",
        currentUser.phone
    );


    if (currentUser.crops) {

        currentUser.crops.forEach(crop => {

            html += dataRow(
                crop.name,
                crop.quantity
                    ? `${crop.quantity} kg`
                    : `₹${crop.priceMin}–₹${crop.priceMax}/kg`
            );

        });

    }


    if (currentUser.vehicle) {

        html += dataRow(
            "Vehicle",
            `${currentUser.vehicle} · ${currentUser.capacity} kg`
        );

    }


    box.innerHTML = html;

}


function dataRow(label, valueText) {

    return `

        <div class="data-item">

            <span>${label}</span>

            <strong>${valueText}</strong>

        </div>

    `;

}


/* ================= SEARCH ================= */

function openSearch(role, name) {

    selectedConnection = role;


    hideAllPages();


    document
        .getElementById("searchPage")
        .classList.remove("hidden");


    document
        .getElementById("searchHeading")
        .textContent =
        name;


    document
        .getElementById("searchDescription")
        .textContent =
        `Find ${name.toLowerCase()} connected to your requirements.`;


    document
        .getElementById("searchResults")
        .innerHTML = "";

}


function searchNetwork() {

    const crop =
        document.getElementById("searchCrop").value;

    const state =
        document.getElementById("searchState").value;


    let results =
        listings.filter(item => {

            if (
                item.role !== selectedConnection
            ) {
                return false;
            }


            if (
                state &&
                item.state !== state
            ) {
                return false;
            }


            if (crop) {

                if (item.crops) {

                    return item.crops.some(
                        c => c.name === crop
                    );

                }


                if (item.acceptedCrops) {

                    return item.acceptedCrops
                        .toLowerCase()
                        .includes(
                            crop.toLowerCase()
                        );

                }

            }


            return true;

        });


    renderSearchResults(results);

}


/* ================= RESULTS ================= */

function renderSearchResults(results) {

    const box =
        document.getElementById("searchResults");


    if (!results.length) {

        box.innerHTML = `

            <div class="result-card">

                <h3>
                    No matching connections found.
                </h3>

                <p style="margin-top:10px;color:#718078;">
                    Try changing the crop or location.
                </p>

            </div>

        `;

        return;

    }


    box.innerHTML = "";


    results.forEach(item => {

        const card =
            document.createElement("div");


        card.className =
            "result-card";


        let cropText = "Multiple crops";


        if (item.crops?.length) {

            cropText =
                item.crops
                    .map(c => c.name)
                    .join(", ");

        }


        card.innerHTML = `

            <div class="result-role">
                ${capitalize(item.role)}
            </div>

            <h3>
                ${item.name}
            </h3>


            <div class="result-grid">

                <div>

                    <small>LOCATION</small>

                    <strong>
                        ${item.location}
                    </strong>

                </div>


                <div>

                    <small>STATE</small>

                    <strong>
                        ${item.state}
                    </strong>

                </div>


                <div>

                    <small>CROPS</small>

                    <strong>
                        ${cropText}
                    </strong>

                </div>


                ${
                    item.capacity
                    ?
                    `
                    <div>

                        <small>CAPACITY</small>

                        <strong>
                            ${item.capacity} kg
                        </strong>

                    </div>
                    `
                    :
                    ""
                }

            </div>


            <button
                class="view-button"
                onclick="viewConnection('${item.id}')"
            >
                VIEW CONNECTION
            </button>

        `;


        box.appendChild(card);

    });

}


/* ================= CONNECTION ================= */

function viewConnection(id) {

    const item =
        listings.find(
            x => x.id === id
        );


    if (!item) return;


    document
        .getElementById("connectionContent")
        .innerHTML = `

            <div class="eyebrow">
                POSSIBLE CONNECTION
            </div>

            <h2 style="
                font-family:Manrope;
                font-size:32px;
                margin-top:8px;
            ">
                ${item.name}
            </h2>

            <p style="
                color:#718078;
                margin-top:6px;
            ">
                ${capitalize(item.role)}
            </p>


            <div style="
                margin-top:25px;
                line-height:2;
            ">

                <strong>Location:</strong>
                ${item.location}

                <br>

                <strong>State:</strong>
                ${item.state}

                <br>

                ${
                    item.vehicle
                    ?
                    `
                    <strong>Vehicle:</strong>
                    ${item.vehicle}
                    <br>
                    `
                    :
                    ""
                }

                ${
                    item.capacity
                    ?
                    `
                    <strong>Capacity:</strong>
                    ${item.capacity} kg
                    <br>
                    `
                    :
                    ""
                }

            </div>


            <p style="
                margin-top:25px;
                font-weight:700;
            ">
                Do you want to connect with this person?
            </p>


            <div class="connection-actions">

                <button
                    class="no-button"
                    onclick="closeConnection()"
                >
                    NO
                </button>

                <button
                    class="yes-button"
                    onclick="confirmConnection('${item.id}')"
                >
                    YES — CONNECT
                </button>

            </div>

        `;


    document
        .getElementById("connectionModal")
        .classList.remove("hidden");

}


/* ================= CONFIRM ================= */

function confirmConnection(id) {

    const item =
        listings.find(
            x => x.id === id
        );


    if (!item) return;


    document
        .getElementById("connectionContent")
        .innerHTML = `

            <div class="eyebrow">
                CONNECTION CONFIRMED
            </div>

            <h2 style="
                font-family:Manrope;
                font-size:32px;
                margin-top:10px;
            ">
                You're connected.
            </h2>

            <p style="
                color:#718078;
                margin-top:10px;
            ">
                You can now contact ${item.name}.
            </p>


            <div style="
                margin-top:25px;
                padding:20px;
                background:#e7f1e9;
                border-radius:12px;
            ">

                <strong>
                    ${item.name}
                </strong>

                <br>

                ${item.phone}

            </div>


            <div class="connection-actions">

                <button
                    class="yes-button"
                    onclick="window.location.href='tel:${item.phone}'"
                >
                    CALL
                </button>

                <button
                    class="yes-button"
                    onclick="window.location.href='https://wa.me/91${item.phone}'"
                >
                    WHATSAPP
                </button>

            </div>

        `;

}


/* ================= EDIT PROFILE ================= */

function openEditProfile() {

    if (!currentUser) return;


    document
        .getElementById("editContent")
        .innerHTML = `

            <div class="eyebrow">
                YOUR PROFILE
            </div>

            <h2 style="
                font-family:Manrope;
                font-size:30px;
                margin-top:8px;
            ">
                Update your information
            </h2>


            <div style="
                margin-top:25px;
                display:grid;
                gap:15px;
            ">

                <div>

                    <label>Name</label>

                    <input
                        id="editName"
                        value="${currentUser.name}"
                    >

                </div>


                <div>

                    <label>Location</label>

                    <input
                        id="editLocation"
                        value="${currentUser.location}"
                    >

                </div>

            </div>


            <button
                class="continue-button"
                style="width:100%;"
                onclick="saveEditProfile()"
            >
                SAVE CHANGES
            </button>

        `;


    document
        .getElementById("editModal")
        .classList.remove("hidden");

}


function saveEditProfile() {

    currentUser.name =
        document.getElementById("editName").value;

    currentUser.location =
        document.getElementById("editLocation").value;


    const index =
        listings.findIndex(
            x => x.id === currentUser.id
        );


    if (index !== -1) {

        listings[index] =
            currentUser;

    }


    saveDatabase();


    localStorage.setItem(
        "vceCurrentUser",
        JSON.stringify(currentUser)
    );


    closeEditProfile();

    showDashboard();

}


function closeEditProfile() {

    document
        .getElementById("editModal")
        .classList.add("hidden");

}


/* ================= NAVIGATION ================= */

function backToDashboard() {

    showDashboard();

}


function showLanding() {

    hideAllPages();

    document
        .getElementById("landingPage")
        .classList.remove("hidden");

}


function hideAllPages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.add("hidden");

        });

}


/* ================= DATABASE ================= */

function saveDatabase() {

    localStorage.setItem(
        "vceListings",
        JSON.stringify(listings)
    );

}


/* ================= HELPERS ================= */

function value(id) {

    const el =
        document.getElementById(id);

    return el
        ? el.value.trim()
        : "";

}


function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


function closeConnection() {

    document
        .getElementById("connectionModal")
        .classList.add("hidden");

}