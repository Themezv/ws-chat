let clientsCount = 0;

const types = {
    ADD_CLIENT: '@@app/ADD_CLIENT',
    ADD_CLIENT_START: '@@app/ADD_CLIENT_START',
    REMOVE_CLIENT: '@app/REMOVE_CLIENT',
    SERVER_CLIENTS_COUNT: '@@ws/SERVER_CLIENTS_COUNT',
    CLIENT_MSG: '@app/CLIENT_MSG',
    SERVER_CLIENT_MSG: '@@ws/SERVER_CLIENT_MSG',
};

function broadcast(clients, ws, data) {
    clients.forEach(function each(client) {
        if (client.readyState === 1) {
            client.send(data);
        }
    });
}

function broadcastExlude(clients, ws, data) {
    clients.forEach(function each(client) {
        if (client.readyState === 1 && client !== ws) {
            client.send(data);
        }
    });
}

const dispatcher = (clients, ws) => {
    ws.on('message', message => {
        let msg = null;
        try {
            msg = JSON.parse(message)
        } catch (e) {
            console.error(`Error parsing : ${message}`)
        }
        if(!msg){
            console.error('EMPTY MSG');
            return;
        }
        switch (msg.type) {
            case types.ADD_CLIENT_START:
                clientsCount++;
                console.log('Add Clients', clientsCount);
                broadcast(clients, ws, JSON.stringify({
                    type: types.SERVER_CLIENTS_COUNT,
                    msg: {currentClients: clientsCount}
                }));
                return;
            case types.CLIENT_MSG:
                console.log('DATA', msg.data);
                broadcast(clients, ws, JSON.stringify({
                    type: types.SERVER_CLIENT_MSG,
                    message: msg.data,
                }));
        }
    });

    ws.on('close', () => {
        clientsCount--;
        console.log('WebSocket was closed')
    })
};


module.exports = dispatcher;
