const component = {}

component.register = `
<section class="register-container">
<form id = "register-form" class="register-form">
  <div class="form-header">
    <h3>WibuChat</h3>
  </div>
  <div class="form-content">
    <div class="name-wrapper">
      <div class="input-wrapper">
        <input type="text" name="firstname" placeholder="Firstname">
        <div id="firstname-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="text" name="lastname" placeholder="Lastname">
        <div id="lastname-error" class="message-error"></div>
      </div>
    </div>
    <div class="input-wrapper">
      <input type="email" name="email" placeholder="Email">
      <div id="email-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password">
      <div id="password-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" name="confirmPassword" placeholder="Confirm password">
      <div id="confirmPassword-error" class="message-error"></div>
    </div>
  </div>
  <div id="register-error" class="message-error"></div>
  <div id="register-success" class="message-success"></div>
  <div class="form-footer">
    <a id="form-link" href="#">Already have an account? Login</a>
    <button id="register-btn" type="submit">Register</button>
  </div>
</form>
</section>
`

component.logIn = `
<section class="login-container">
<form id = "login-form" class="login-form">
  <div class="form-header">
    <h3>WibuChat</h3>
  </div>
  <div id="form-content" class="form-content">
    <div class="input-wrapper">
      <input type="email" name="email" placeholder="Email">
      <div id="email-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password">
      <div id="password-error" class="message-error"></div>
    </div>
  </div>
  <div id="logIn-error" class="message-error"></div>
  <div id="logIn-success" class="message-success"></div>
  <div class="form-footer">
    <a id="form-link" href="#">Not yet have an account? Register</a>
    <button id="logIn-btn" type="submit">Log In</button>
  </div>
</form>
</section>
`

component.chat =`
<div class="container">
                <div class="row no-gutters">
                    <div class="col-sm-4">
                        <div class="setting-tray">
                            <img class="profile-image" src="https://www.asiatripdeals.com/wp-content/uploads/2019/03/Anonymous-Avatar.png" alt="Profile image">
                            <span class="user-email">Leeanhducc@gmail.com</span>
                            <i class="fas fa-cog float-right"></i>
                            <i id='btn-sign-out' class="fas fa-sign-out-alt float-right"></i>
                        </div>
                        <div class="search-box">
                            <div class="input-wrapper-chat">
                                <i class="fas fa-search"></i>
                                <input type="email" placeholder="Email">
                            </div>
                        </div>
                        <div id="list-conversation" class="list-conversation">
                        </div>
                        <form id="add-conversation-box" class="add-conversation-box">
                            <div class="text">Add conversation</div>
                            <div class="add-conversation">
                                <button type="submit" class="btn-icon">
                                  <i class="fas fa-plus-square fa-lg"></i>
                                </button>
                                <input id="friend-email-input" type="email" name="friendEmail" placeholder="Email">
                            </div>
                            <div id="wrong-email" class="wrong-email"></div>
                        </form>
                    </div>
                    <div class="col-md-8">
                        <div class="setting-tray no-gutters">
                            <img class="profile-image" src="https://www.asiatripdeals.com/wp-content/uploads/2019/03/Anonymous-Avatar.png" alt="Profile image">
                            <span id="name-title" class="user-email"></span>
                        </div>
                        <div id="chat-panel" class="chat-panel">
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <form id="chat-box-tray" class="chat-box-tray">
                                    <i class="fas fa-paperclip fa-lg"></i>
                                    <input id="message-input" type="text" name="message" placeholder="Type your message here...">
                                    <button id="form-chat-btn" type="submit">
                                    <i class="fas fa-paper-plane fa-lg"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`