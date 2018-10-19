import React, {Component} from 'react'
import NavBar from './NavBar'
import * as contract from '../contract'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar contract={contract.address}/>
      </div>
    )
  }
}

export default App
