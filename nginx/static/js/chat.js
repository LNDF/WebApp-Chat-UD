let ws = null;
let username = null;

function joinChat() {
    if (ws != null) return;
    const token = cookie.get("token");
    if (token == null) return;
    const encodedToken = encodeURIComponent(token);
    ws = new WebSocket("ws://" + location.host + "/chat?token=" + encodedToken);
    ws.addEventListener("close", e => {
        if (username == null) {
            alert("There was an error joining the chat.");
        }
        loadFormsContainer();
        clearChatlog();
        ws = null;
        username = null;
    });
    ws.addEventListener("message", e => {
        const data = JSON.parse(e.data);
        switch (data.type) {
            case "connect":
                username = data.username;
                loadChatContainer();
                clearChatlog();
                break;
            case "message":
                appendChatMessage(data.message, data.username === username ? null : data.username);
                break;
                
        }
    });
}

function leaveChat() {
    if (ws == null) return;
    ws.close();
}

function sendChatMessage(message) {
    if (ws != null) ws.send(message);
}
