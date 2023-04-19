"use strict";

let LIST_PATIENTS = {
    "EP-001-000001": {
        patientIdNumber: "EP-001-000001",
        firstName: "Ana",
        middleInitials: "J",
        lastName: "Smith",
        dateOfBirth: "1945-01-05",
        department: "Ear, Nose and Throat",
        isOutPatient: "No"
    },
    "EP-001-000002": {
        patientIdNumber: "EP-001-000002",
        firstName: "Bob",
        middleInitials: "K",
        lastName: "John",
        dateOfBirth: "1945-05-04",
        department: "Cardiology",
        isOutPatient: "Yes"
    },
    "EP-001-000003": {
        patientIdNumber: "EP-001-000003",
        firstName: "Carlos",
        middleInitials: "A",
        lastName: "Hernandez",
        dateOfBirth: "1957-03-13",
        department: "Cardiology",
        isOutPatient: "Yes"
    },
    "EP-001-000004": {
        patientIdNumber: "EP-001-000004",
        firstName: "Huy",
        middleInitials: "D",
        lastName: "Dang",
        dateOfBirth: "1989-07-13",
        department: "Primary Care",
        isOutPatient: "Yes"
    },
    "EP-001-000005": {
        patientIdNumber: "EP-001-000005",
        firstName: "Mai",
        middleInitials: "H",
        lastName: "Nguyen",
        dateOfBirth: "1988-07-21",
        department: "[Unassigned]",
        isOutPatient: "No"
    },
};

/**
 * Collect all DOM elements
 */
const domPatientIdNumber = document.getElementById("patientIdNumber");
const domFirstName = document.getElementById("firstName");
const domMiddleInitials = document.getElementById("middleInitials");
const domLastName = document.getElementById("lastName");
const domDateOfBirth = document.getElementById("dateOfBirth");
const domDdlDepartment = document.getElementById("ddlDepartment");
const domRadioIsOutPatientYes = document.getElementById("radioIsOutPatientYes");
const domRadioIsOutPatientNo = document.getElementById("radioIsOutPatientNo");
const domChkElderlyPatients = document.getElementById("chkElderlyPatients");
const domChkShowOutPatients = document.getElementById("chkShowOutPatients");
const domBtnReset = document.getElementById("btnReset");
const domBtnRegisterPatient = document.getElementById("btnRegisterPatient");
const domTbodyPatientsList = document.getElementById("tbodyPatientsList");


function clearInputFields() {
    domPatientIdNumber.value = "";
    domFirstName.value = "";
    domMiddleInitials.value = "";
    domLastName.value = "";
    domDateOfBirth.value = "";
    domDdlDepartment.value = "";
    domRadioIsOutPatientYes.value = null;
    domRadioIsOutPatientNo.value = null;
}

function getPatient() {
    let isOutPatient = document.querySelector('input[name="radioIsOutPatient"]:checked').value;
    return {
        patientIdNumber: domPatientIdNumber.value,
        firstName: domFirstName.value,
        middleInitials: domMiddleInitials.value,
        lastName: domLastName.value,
        dateOfBirth: domDateOfBirth.value,
        department: domDdlDepartment.value,
        isOutPatient: isOutPatient
    };
}

function isElderPatient(patient, age) {
    if (age === undefined)
        age = 65;

    let patient_dob = new Date(patient.dateOfBirth);
    let diff_ms = Date.now() - patient_dob.getTime();
    let age_dt = new Date(diff_ms);

    let patient_age = Math.abs(age_dt.getUTCFullYear() - 1970);
    return patient_age >= age
}

function isOutPatient(patient) {
    return patient.isOutPatient === "Yes";
}

function addPatientRow(patient) {
    let tr = document.createElement("tr");
    tr.setAttribute('id', patient.patientIdNumber);
    tr.classList.add("patient-all");
    if (isElderPatient(patient))
        tr.classList.add("patient-elder");
    if (isOutPatient(patient))
        tr.classList.add("patient-out");

    let tdPatientIdNumber = document.createElement("td");
    tdPatientIdNumber.innerText = patient.patientIdNumber;
    tr.appendChild(tdPatientIdNumber);

    let tdFirstName = document.createElement("td");
    tdFirstName.innerText = patient.firstName;
    tr.appendChild(tdFirstName);

    let tdMiddleInitials = document.createElement("td");
    tdMiddleInitials.innerText = patient.middleInitials;
    tr.appendChild(tdMiddleInitials);

    let tdLastName = document.createElement("td");
    tdLastName.innerText = patient.lastName;
    tr.appendChild(tdLastName);

    let tdDOB = document.createElement("td");
    tdDOB.innerText = patient.dateOfBirth;
    tr.appendChild(tdDOB);

    let tdDepartment = document.createElement("td");
    tdDepartment.innerText = patient.department;
    tr.appendChild(tdDepartment);

    let tdIsOutPatient = document.createElement("td");
    tdIsOutPatient.innerText = patient.isOutPatient;
    tr.appendChild(tdIsOutPatient);

    domTbodyPatientsList.appendChild(tr);
}

function showAllPatients(checkingFn) {
    for (let patient of Object.values(LIST_PATIENTS)) {
        addPatientRow(patient);
    }
}


/**
 * Register event listener: reset all fields when user clicks Reset
 */
domBtnReset.addEventListener("click", (e) => {
    clearInputFields();
});


/**
 * Register event listener: register patient
 */
function submitPatient() {
    let patient = getPatient();
    if (Object.keys(LIST_PATIENTS).includes(patient.patientIdNumber)) {
        alert("Patient ID is already existed! Please choose a new one!");
    } else {
        LIST_PATIENTS[patient.patientIdNumber] = patient;
        addPatientRow(patient);
        // clearInputFields();
    }
    return false;
}


/**
 * Register event: show/hide list of elder patients
 */
domChkElderlyPatients.addEventListener("change", () => {
    let not_elder_patients = document.querySelectorAll('tr.patient-all:not(.patient-elder)');
    console.log(not_elder_patients);
    if (domChkElderlyPatients.checked) {
        for (let patient of not_elder_patients)
            patient.classList.add("d-none");
    } else {
        for (let patient of not_elder_patients)
            patient.classList.remove("d-none");
    }
});


/**
 * Register event: show/hide list of Out-patients
 */
domChkShowOutPatients.addEventListener("change", () => {
    let not_out_patients = document.querySelectorAll('tr.patient-all:not(.patient-out)');
    console.log(not_out_patients);
    if (domChkShowOutPatients.checked) {
        for (let patient of not_out_patients)
            patient.classList.add("d-none");
    } else {
        for (let patient of not_out_patients)
            patient.classList.remove("d-none");
    }
});


/**
 * Register event listener on data change
 */
showAllPatients();