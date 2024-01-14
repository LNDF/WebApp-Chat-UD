let formsContainer = document.getElementById("forms-container");
let chatContainer = document.getElementById("chat-container");
let shouldScrollChat = true;

function loadFormsContainer() {
    formsContainer.style.display = "flex";
    chatContainer.style.display = "none";
}

function loadChatContainer() {
    formsContainer.style.display = "none";
    chatContainer.style.display = "flex";
}

function clearChatlog() {
    document.getElementById("messages").innerHTML = "";
    shouldScrollChat = true;
}

function appendChatMessage(message, username) {
    const div = document.createElement("div");
    div.classList.add("message");
    if (username == null) {
        div.classList.add("sent");
        div.innerText = message;
    } else {
        div.classList.add("received");
        div.innerText = username + ":\n" + message;
    }
    const messages = document.getElementById("messages");
    messages.appendChild(div);
    if (shouldScrollChat) messages.scrollTop = (messages.scrollHeight - messages.offsetHeight);
}

function uiSendChatMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    if (message !== "") {
        sendChatMessage(message);
        messageInput.value = "";
    }
}

async function uiLogin() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    try {
        const token = await login(usernameInput.value, passwordInput.value);
        cookie.set("token", token, 1);
        joinChat();
        usernameInput.value = "";
        passwordInput.value = "";
    } catch (error) {
        alert(error);
    }
}

async function uiRegister() {
    const newUsernameInput = document.getElementById("new-username");
    const newPasswordInput = document.getElementById("new-password");
    const newPasswordRepeatInput = document.getElementById("new-password-repeat");
    if (newPasswordInput.value != newPasswordRepeatInput.value) {
        alert("Passwords do not match");
        return;
    }
    try {
        await register(newUsernameInput.value, newPasswordInput.value);
        const token = await login(newUsernameInput.value, newPasswordInput.value);
        cookie.set("token", token, 1);
        joinChat();
        newUsernameInput.value = "";
        newPasswordInput.value = "";
        newPasswordRepeatInput.value = "";
    } catch (error) {
        alert(error);
    }
}

document.getElementById("login-button").addEventListener("click", e => {
    e.preventDefault();
    uiLogin();
    return false;
});

document.getElementById("register-button").addEventListener("click", e => {
    e.preventDefault();
    uiRegister();
    return false;
});

document.getElementById("logout-button").addEventListener("click", e => {
    e.preventDefault();
    leaveChat();
    cookie.delete("token");
    return false;
});

document.getElementById("send-button").addEventListener("click", e => {
    e.preventDefault();
    uiSendChatMessage();
    return false;
});

document.getElementById("message-input").addEventListener("keypress", e => {
    if (e.key == "Enter") {
        e.preventDefault();
        uiSendChatMessage();
        return false;
    }
    return true;
});

document.getElementById("messages").addEventListener("scroll", e => {
    shouldScrollChat = e.target.scrollTop === (e.target.scrollHeight - e.target.offsetHeight);
});

loadFormsContainer();
joinChat();
