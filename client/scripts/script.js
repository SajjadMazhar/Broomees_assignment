const signUpBtn = document.getElementById("btn-signup");
const inputRefs = [];

// validate each field if it is empty or not
function validate(formData) {
    let isValid = true;
    if (!formData.fName.value) {
        formData.fName.style.border = "1px solid red";
        isValid = false;
    }
    if (!formData.lName.value) {
        formData.lName.style.border = "1px solid red";
        isValid = false;
    }
    if (!formData.email.value) {
        formData.email.style.border = "1px solid red";
        isValid = false;
    }
    if (!formData.username.value) {
        formData.username.style.border = "1px solid red";
        isValid = false;
    }
    if (!formData.pwd.value) {
        formData.pwd.style.border = "1px solid red";
        isValid = false;
    }
    if (!formData.cPwd.value) {
        formData.cPwd.style.border = "1px solid red";
        isValid = false;
    }
    return isValid;
}

// empty each field on successful database insertion
function emptyFields(){
    const inputRefs = document.getElementsByTagName('input')
    Array.from(inputRefs).forEach(el=>{
        el.value = '';
    })
}

// takes values from form fields and send it to backend express server after validation
signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const fName = document.getElementById("fname");
    const lName = document.getElementById("lname");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const pwd = document.getElementById("password");
    const cPwd = document.getElementById("cpassword");

    if (!validate({ fName, lName, email, username, pwd, cPwd })) {
        return alert("Please fill all the form fields!");
    }

    fetch("http://localhost:3000/api/user-signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: fName.value,
            lastName: lName.value,
            username: username.value,
            email: email.value,
            password: pwd.value,
            cPassword: cPwd.value,
        }),
    })
        .then((resp) => resp.json())
        .then((data) => {
            alert(data.msg)
            emptyFields()
        })
        .catch((err) => alert(`Error:${err.message}`));
});
