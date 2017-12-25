import types from './types';
import {ws} from './sagas';

export default {
    sendMessage(data) {
        ws.send(JSON.stringify({type: types.CLIENT_MSG, data}));
        return {
            type: types.CLIENT_MSG,
            data,
        };
    },
};
