// document.getElementById("pizza-form").onsubmit = validateForm;

// function validateForm() {
//     alert("Hello pizza");
// }

//or

document.getElementById("pizza-form").onsubmit = () => {

    let isvalid = true;

    //clear all errors
    clearErrors();

    let fname = document.getElementById("fname").value.trim();
    if(fname === "") {
        document.getElementById("err-fname").style.display = "block";
        isvalid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if(lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isvalid = false;
    }

    let email = document.getElementById("email").value.trim();
    if(email === "") {
        document.getElementById("err-email").style.display = "block";
        isvalid = false;
    }

    if(isvalid == false) {
        return false;
    }
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}

