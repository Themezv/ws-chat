import types from './types';

const initialState = {
    clients: 0,
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SERVER_CLIENTS_COUNT:
            return { ...state, clients: action.msg.currentClients };
        case types.REMOVE_CLIENT:
            return { ...state, clients: state.clients - 1};
        case types.SERVER_CLIENT_MSG:
            let messages = state.messages;
            messages.push(action.message);
            return {...state, messages: messages.slice(0)};
        default:
            return state;
    }
};
