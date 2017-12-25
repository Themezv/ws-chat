export default {
    selectClientsCount(state) {
        return state.app.clients;
    },
    selectMessages(state){
        return state.app.messages;
    }
};
