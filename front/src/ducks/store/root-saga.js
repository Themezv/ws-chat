import { fork, all } from 'redux-saga/effects';

import websocketSagas from '../app/sagas';

export default function* rootSaga() {
    yield all([
        fork(websocketSagas),
    ]);
}
