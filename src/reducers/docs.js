import {
  PAGE
} from '../actions'

const docs = (state = {
  page: "",
  }, action) => {
  switch (action.type) {
    case PAGE:
      return Object.assign({}, state, {
        page: action.page
      })
    default:
      return state
  }
}
export default docs
