/*** FORM VALIDATION ***/

let formInputs = document.querySelectorAll('.formInputs');
let submit = document.querySelector('#submit');
let errMsg = document.querySelectorAll('.errMsg');
let inputs = Array.from(formInputs);
let valid = false;

// get placeholders
let placeholders = [];
inputs.forEach(e => {
    placeholders.push(e.placeholder);
})


function valdiateForm(inputs) {

    // validate all inputs
    inputs.forEach((e, index) => {
        if (e.value == "") {
            e.classList.add('error');
            if (e.placeholder == "Email") {
                e.value = "email@example/com";
                e.style.color = "hsl(0,100%,74%)";
            }
            errMsg[index].textContent = `${placeholders[index]} cannot be empty`;
            e.placeholder = "";
            valid = false;
        } else {
            valid = true;
        }
    })

    // reset on focus
    inputs.forEach((e, index) => {
        e.addEventListener('focus', e => {
            e.preventDefault();
            e.stopPropagation();
            valid = false;
            e.target.classList.remove('error');
            e.target.placeholder = placeholders[index];
            errMsg[index].textContent = ``;
            e.target.value = "";
            if (e.target.placeholder == "Email") {
                e.target.style.color = "hsl(249,10%,26%)";
            }
        })
    })

    // vlaidate emali
    inputs.forEach((e, index) => {
        if (e.placeholder === "Email") {
            let emailTest = function (e) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(e);
            }
            if (!emailTest(e.value)) {
                e.value = "email@example/com";
                e.style.color = "hsl(0,100%,74%)";
                e.classList.add('error');
                errMsg[index].textContent = `${placeholders[index]} format is not good`;
                e.placeholder = "";
                valid = false;
            } else {
                valid = true;
            }
        }
    })
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (valid) {
        alert("Your form has been submited");
    } else {
        valdiateForm(inputs);
    }
})
