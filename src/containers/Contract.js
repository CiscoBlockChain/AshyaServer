import React, { Component } from 'react'
import Body from '../components/Body'
import Web3 from 'web3'

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses : [],
    }
  }

  componentDidMount() {
    var w3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    if(!w3.isConnected()) {
      console.log("not connected");
    } else {
      console.log("connected");
      console.log(w3.eth.accounts)
      this.setState({
        addresses: w3.eth.accounts,
      })
    }
  }

  render() {
    return (
    <div>
      <Body addresses={this.state.addresses}/>
    </div>
    )
  }
}

export default Contract
