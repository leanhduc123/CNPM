const view = {}

view.showComponent = function(name) {
    switch(name) {
        case "register": {
            let app = document.getElementById('app')
            app.innerHTML = component.register

            let formLink = document.getElementById("form-link")
            formLink.onclick = linkClickHandler

            let form = document.getElementById("register-form")
            form.onsubmit = formSubmitHandler

            function linkClickHandler() {
                view.showComponent("logIn")
            }

            function formSubmitHandler(event){
                event.preventDefault() //chan su kien mac dinh

                //thong tin nguoi dung
                let registerInfo = {
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value
                }
                let validateResult = [
                    view.validate(registerInfo.firstname, "firstname-error", "Invalid firstname!"),
                    view.validate(registerInfo.lastname, "lastname-error", "Invalid lastname!"),
                    view.validate(registerInfo.email, "email-error", "Invalid email!"),
                    view.validate(registerInfo.password && registerInfo.password.length >= 6,
                        "password-error",
                        "Invalid password!"),
                    view.validate(registerInfo.confirmPassword && registerInfo.confirmPassword == registerInfo.password,
                        "confirmPassword-error",
                        "Invalid confirm password!")
                ]
                if (allPassed(validateResult)) {
                    //submit thong tin
                    controller.register(registerInfo)
                }
            }

            break
        }
        case "logIn": {
            let app = document.getElementById('app')
            app.innerHTML = component.logIn

            let formLink = document.getElementById("form-link")
            formLink.onclick = linkClickHandler

            let form = document.getElementById("login-form")
            form.onsubmit = formSubmitHandler

            function linkClickHandler() {
                view.showComponent("register")
            }

            function formSubmitHandler(event){
                event.preventDefault() //chan su kien mac dinh

                let logInInfo = {
                    email: form.email.value,
                    password: form.password.value
                }
                let validateResult = [
                    view.validate(logInInfo.email, "email-error", "Invalid email!"),
                    view.validate(logInInfo.password && logInInfo.password.length >= 6,
                        "password-error",
                        "Invalid password")
                ]
                if (allPassed(validateResult)) {
                    controller.logIn(logInInfo)
                }
            }
            
            break
        }
    }
}

view.setText = function (id, text) {
    document.getElementById(id).innerText = text
}

view.validate = function (condition, idErrortag, messageError) {
    if (condition) {
        view.setText(idErrortag, "")
        return true
    } else {
        view.setText(idErrortag, messageError)
        return false
    }
}

function allPassed(validateResult) {
    for (let result of validateResult) {
        if (!result) {
            return false
        }
    }
    return true
}