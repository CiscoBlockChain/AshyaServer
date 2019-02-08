import { combineReducers } from 'redux'
import blockchain from './blockchain'
import docs from './docs'

const ashyaApp = combineReducers({
  blockchain,
  docs,
})

export default ashyaApp
