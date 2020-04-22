const controller = {}

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