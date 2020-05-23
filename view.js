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

        case 'chat': {
            let app = document.getElementById('app')
            app.innerHTML = component.chat 
            controller.loadConversation()
            controller.setupOnSnapShot()

            let signOut = document.getElementById('btn-sign-out')
            signOut.onclick = signOutHandler

            let formChat = document.getElementById("chat-box-tray")
            formChat.onsubmit = formChatSubmitHandler

            let formAddConversation = document.getElementById("add-conversation-box")
            formAddConversation.onsubmit = formAddSubmitHandler

            function signOutHandler() {
                firebase.auth().signOut()
            }

            function formChatSubmitHandler(e) {
                e.preventDefault()
                document.getElementById("form-chat-btn").setAttribute("disabled", true)

                let messageContent = formChat.message.value.trim()
                if (messageContent) {
                    controller.addMessage(messageContent)
                }
            }

            function formAddSubmitHandler(e) {
                e.preventDefault()
                let friendEmail = formAddConversation.friendEmail.value
                let validateResult = view.validate(friendEmail && friendEmail != firebase.auth().currentUser.email,
                                     "wrong-email",
                                     "Invalid friend email!"
                                    )
                if(validateResult){
                    controller.addConversation(friendEmail)
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

view.showCurrentConversation = function () {
    if (model.currentConversation) {
        //hien thi cac tin nhan
        // let messages = ["hello1","hello2","hello3"]
        let messages = model.currentConversation.messages
        let listMessage = document.getElementById("chat-panel")
        let currentEmail = firebase.auth().currentUser.email
        listMessage.innerHTML = ""


        for (let message of messages) {
            let className = ""
            let position = ""
            if (message.owner == currentEmail) {
                className = "chat-bubble--right"
                position = " offset-md-9"
            } else {
                className = "chat-bubble--left"
                position = ""
            }
            let html = `
            <div class="row no-gutters">
                <div class="col-md-3${position}">
                    <div class="chat-bubble ${className}">
                    <span>${message.content}</span>
                    </div>
                </div>
            </div>
        `

            listMessage.innerHTML += html
        }

        listMessage.scrollTop = listMessage.scrollHeight

        //show detail info
        // let users = model.currentConversation.user
        // let createdAt = model.currentConversation.createdAt
        // let listUsers = document.getElementById("list-users")
        // let createdAtDiv = document.getElementById("created-at")
        // listUsers.innerHTML = ""

        // for(let user of users){
        //     let html = `
        //     <div>${user}</div>
        //     `
        //     listUsers.innerHTML += html
        // }
        // console.log(createdAt)
        // createdAtDiv.innerHTML = new Date(createdAt).toLocaleString()
    }
}

view.showListConversation = function () {
    if (model.conversations) {
        //TODO: show all conversation in model.conversation t div id="list-conversation"
        let conversations = model.conversations
        let listConversation = document.getElementById("list-conversation")
        listConversation.innerHTML = ""
        let nameTitle = document.getElementById(`name-title`)

        for (let conversation of conversations) {
            let id = conversation.id
            let index = conversation.user.findIndex(function(element){
                return element != firebase.auth().currentUser.email
            })
            let title = conversation.user[index]
            let className = ""
            // if (model.currentConversation && model.currentConversation.id == conversation.id) {
            //     className = "conversation current"
            // } else {
            //     className = "conversation"
            // }

            let html = `
                <div id="conversation-${id}" class="friend-tag">
                    <img class="profile-image" src="https://www.asiatripdeals.com/wp-content/uploads/2019/03/Anonymous-Avatar.png" alt="Profile image">
                    <h8 id="title-${id}">${title}</h8>
                    <span class="time small">13:21</span>
                </div>
            `

            listConversation.innerHTML += html
        }

        for (let conversation of conversations) {
            let id = conversation.id
            let conversationDiv = document.getElementById("conversation-" + id)

            conversationDiv.onclick = onClickHandler

            function onClickHandler() {
                let innertext =  document.getElementById(`title-${id}`).innerHTML
                nameTitle.innerHTML = innertext
                model.saveCurrentConversation(conversation)
                view.showCurrentConversation()
                view.showListConversation()
            }
        }
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

view.disable = function (id) {
    document.getElementById(id).setAttribute("disabled", true)
}

view.enable = function (id) {
    document.getElementById(id).removeAttribute("disabled")
}