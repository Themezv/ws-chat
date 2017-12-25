import {put, call, take} from 'redux-saga/effects';
import types from './types';
import {eventChannel} from 'redux-saga';

function dispatcher(emitter, msg) {
    console.log('channel:', msg);
    emitter({type: msg.type, msg: msg.msg, message: msg.message})
}
const ws = new WebSocket('ws://localhost:3000/chat');
function websocketInitChannel() {
    return eventChannel(emitter => {
            // init the connection here
            ws.onopen = () => {
                console.log('opening...');
                ws.send(JSON.stringify({type: types.ADD_CLIENT_START, msg: 'newClient'}));
            };
            ws.onerror = (error) => {
                console.log('WebSocket error ' + error);
                console.dir(error)
            };
            ws.onmessage = e => {
                let msg = null;
                try {
                    msg = JSON.parse(e.data)
                } catch (e) {
                    console.error(`Error parsing : ${e.data}`)
                }
                if (msg) {
                    return dispatcher(emitter, msg)
                }
            };
            return () => {
                emitter({type: types.REMOVE_CLIENT});
                console.log('Socket off');
            };
        }
    );
}

export default function* websocketSagas() {
    const channel = yield call(websocketInitChannel);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

export {
    ws,
}

