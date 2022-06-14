const ws = require("ws");

const wss = new ws.Server({
    port: 5000,
}, () => console.log("start"));

wss.on("connection", function connection (ws) {
    ws.on("message", function (message) {
        message = JSON.parse(message);

        switch (message.event) {
            case "message":
                broadcasetMessage(message);
                break;
            case "connection":
                broadcasetMessage(message);
                break;
        }
    });
});

function broadcasetMessage (message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}
