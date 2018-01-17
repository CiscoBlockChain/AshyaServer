import {put, all, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import * as actions from '../actions'
//import blockchainAPI from '../services/blockchain'


export function* get_addresses() {
  var w3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  if(!w3.isConnected()) {
    return yield put(actions.gotError("not connected to blockchain"))
  } else {
    return yield put(actions.gotAddresses(w3.eth.accounts))
  }
} 

export function* watchBlockchainRequest() {
  yield takeEvery(actions.GET_ADDRESSES, get_addresses)
}

export default function* rootSaga() {
  yield all([
    watchBlockchainRequest(),
  ])
}
