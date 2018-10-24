import { put, all, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import * as actions from '../actions'
import * as contract from '../contract'
//import blockchainAPI from '../services/blockchain'


export function* get_addresses() {
  var w3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/1r0bIX2eewb5e9m2WAug'));
  var registry = new w3.eth.Contract(contract.abiArray, contract.address)
  var results = []
  const numOfElements = yield registry.methods.getItemCount().call()
  for (let i = 0; i < numOfElements; i++) {
    var addr = yield registry.methods.getItemAtIndex(i).call()
    var attrs = yield registry.methods.getItem(addr).call()
    console.log(attrs)
    results.push([addr, attrs.name, attrs.location, attrs.url]);
  }
  return yield put(actions.gotAddresses(results))
} 

export function* watchBlockchainRequest() {
  yield takeEvery(actions.GET_ADDRESSES, get_addresses)
}

export default function* rootSaga() {
  yield all([
    watchBlockchainRequest(),
  ])
}
