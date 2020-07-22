const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small")
    small.innerText = message
}
// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

// Check email Validity
function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email.value.trim())) {
        showSuccess(email)
    } else {
        showError(email, "Invalid Email Address")
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(
        function (input) {
            if (input.value.trim() === "") {
                showError(input, `${getFieldName(input)} is required`)
            } else {
                showSuccess(input)
            }
        }
    );
}
// To Capitalize the input Value
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
// To chekc Length 
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} maximum ${max} characters are allowed`)
    } else {
        showSuccess(input)
    }
}

// Passwords Match checking

function validatePassword(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess(input2)
    }
    else {
        showError(input2, "Passwords Don't Match")
    }
}

// Event Listeners

form.addEventListener("submit", (event) => {
    event.preventDefault()

    checkRequired(
        [
            username,
            email,
            password,
            password2
        ]
    )
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    validateEmail(email);
    validatePassword(password, password2)
})