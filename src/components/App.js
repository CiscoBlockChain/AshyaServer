import React from 'react'
import NavBar from './NavBar'
import Contract from '../containers/Contract'
import Footer from './Footer'
import * as contract from '../contract'

const App = () => (
  <div>
    <NavBar contract={contract.address}/>
    <Contract />
    <Footer />
  </div>
)

export default App
