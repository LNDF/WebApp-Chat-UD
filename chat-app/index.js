const WebSocket = require("ws");
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("WebSocket server\n");
});

const wss = new WebSocket.Server({server});
const connections = {}

async function configureWS(ws, token) {
    //Don't allow the user to log multiple times
    if (connections.hasOwnProperty(token)) {
        ws.close();
        return;
    }

    // Validate the token
    const response = await fetch("http://login-app:4000/api/user/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    if (response.status != 200) {
        console.log("Connection rejected: Invalid token");
        ws.close();
        return;
    }
    const data = await response.json();
    const username = data.username;

    ws.on("message", message => {
        const str = message.toString();
        for (const t in connections) {
            connections[t].send(JSON.stringify({type: "message", username: username, message: str}));
        }
    });

    ws.on('close', () => {
        console.log(username + " left the chat.");
        delete connections[token];
    });

    ws.send(JSON.stringify({type: "connect", username: username}));
    console.log(username + " joined the chat.");

    connections[token] = ws;
}

wss.on("connection", (ws, request) => {
    // Check if the request URL is correct
    const urlParts = request.url.split("?");
    if (urlParts[0] === "/chat") {
        const token = new URLSearchParams(urlParts[1]).get("token");

        configureWS(ws, token);
    } else {
        console.log("Connection rejected: Invalid endpoint");
        ws.close();
    }
});

server.listen(3000, () => {
    console.log("WebSocket server is listening on port 3000");
});
