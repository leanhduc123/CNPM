const controller = {}

controller.initAuth = function () {
    firebase.auth().onAuthStateChanged(authStateChangedHandler)

    function authStateChangedHandler(user) {
        if (user && user.emailVerified) {
            view.showComponent("chat")
        } else {
            view.showComponent("logIn")
        }
    }
}

controller.register = async function(registerInfo){
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.firtname + " " + registerInfo.lastname
    view.setText("register-error", "")
    view.setText("register-success", "")
    //disable button
    view.disable("register-btn")

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText("register-success", "An verification email has been sent to your email address!")
    } catch (err) {
        view.setText("register-error", err.message)
    }
    //enable button
    view.enable("register-btn")
}

controller.logIn = async function (logInInfo) {
    let email = logInInfo.email
    let password = logInInfo.password
    view.setText("logIn-error", "")
    view.setText("logIn-success", "")
    view.disable("logIn-btn")
    try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!result.user || !result.user.emailVerified) {
            throw new Error("Must verify email!")
        }
    } catch (err) {
        view.enable("logIn-btn")
        view.setText("logIn-error", err.message)
    }
}

controller.loadConversation = async function () {
    let result = await firebase
        .firestore()
        .collection("conversation")
        .where("user", "array-contains", firebase.auth().currentUser.email)
        .get()
    //add update delete
    let conversations = []
    for (let doc of result.docs) {
        conversations.push(transformDoc(doc))
    }
    model.saveConversations(conversations)
    if (conversations.length) {
        model.saveCurrentConversation(conversations[0])
    }
    view.showCurrentConversation()  //model.curentConversation
    view.showListConversation()  //model.conversation
}

function transformDoc(doc) {
    let data = doc.data()
    data.id = doc.id
    return data
}

controller.setupOnSnapShot = function(){
    let isFirstTimeRun = true
    firebase
      .firestore()
      .collection('conversation')
      .where("user", "array-contains", firebase.auth().currentUser.email)
      .onSnapshot(snapshotHandler)
       
    function snapshotHandler(snapshot) {
        //kiem tra thay doi tu database
        if (isFirstTimeRun) {
            isFirstTimeRun = false
            return
        }
        for (let docChange of snapshot.docChanges()) {
            if (docChange.type == "modified") {
                let conversation = transformDoc(docChange.doc)
                //1. update: conversation vao model
                model.updateConversation(conversation)
                //2. update: conversation len view
                if (model.currentConversation && model.currentConversation.id == conversation.id) {
                    view.showCurrentConversation()
                }
            }
            if(docChange.type == "added") {
                let conversation = transformDoc(docChange.doc)
                model.updateConversation(conversation)
            }
            if(docChange.type == "removed") {
                let conversation = transformDoc(docChange.doc)
                model.removeConversation(conversation)
                if(model.currentConversation && model.currentConversation.id == conversation.id){
                    // view.clearCurrentConversation()
                    if(model.conversation && model.conversation.length) {
                        model.saveCurrentConversation(model.conversations[0])
                        view.showCurrentConversation()
                    }
                }
                //1. remove conversation from model.conversation
                //2. if conversation is currentConversation >> set new currentConversation
            }
        }
        view.showListConversation()
    }
}

controller.addMessage = async function (messageContent) {
    if (messageContent && model.currentConversation) {
        let message = {
            content: messageContent,
            owner: firebase.auth().currentUser.email,
            creartedAt: new Date().toISOString()
        }
        await firebase
            .firestore()
            .collection("conversation")
            .doc(model.currentConversation.id)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion(message)
            })
        document.getElementById("message-input").value = ""
        document.getElementById("form-chat-btn").removeAttribute("disabled")
    }
}

controller.addConversation = async function (friendEmail) {
    try {
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
        //nguoi dung co the dang nhap vao he thong => email co ton tai

        if (signInMethods && signInMethods.length) {
            let conversation = {
                createdAt: new Date().toISOString(),
                messages: [],
                user: [
                    firebase.auth().currentUser.email,
                    friendEmail
                ]
            }
        await firebase
            .firestore()
            .collection("conversation")
            .add(conversation)
        document.getElementById("friend-email-input").value = ""
        } else {
            throw new Error("Email do not exist!")
        }
    } catch (err) {
        view.setText("wrong-email",err.message)
    }
}