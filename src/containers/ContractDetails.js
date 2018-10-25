import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { withRouter } from 'react-router-dom'
import * as deviceContract from '../device-contract'
import Web3 from 'web3';

// yikes... 
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
class ContractDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriberURL : "",
      error : "",
      accounts : []
    }
  }

  // when the window loads, see if Metamask is there. 
  componentDidMount() {
    var t = this;
    window.addEventListener('load', function() {
      if (typeof window.web3 !== 'undefined') {
        t.validate(t)
      }else {
        t.state.error = "You have no Web3 plugins.  Consider Metamask!"
        t.forceUpdate()
      }
    })
  }

  // validate connection
  validate = (t) => {
    t.setState({isConnected: true})
    var p = new Web3(window.web3.currentProvider)
    t.setState({provider : p})
    console.log('MetaMask is installed')
    p.eth.getAccounts(function(err, acc) {
      if (err) {
        console.error(err)
        t.setState({merror: err})
        return
      }
      if (acc.length === 0) {
        t.setState({error: "Metamask is locked"})
        return
      }
      t.setState({error : ""})
      // set accounts
      t.setState({accounts: acc});
    })
  }

  /* changing form values */
  handleChange = (event) => {
    const s = this.state
    switch(event.target.id) {
      case "subscriberURL":
        s.subscriberURL = event.target.value;
        break;
      default:
    }
    this.forceUpdate();
  }

  urlIsValid = () => {
    //TODO: Sana validate URL
    //  this.state.subscriberURL is valid
    var input = this.state.subscriberURL;
    if(validator.isURL(input.toString())){ 
      return true;
    }
      
    else {
      return false;
    }
}

  subscribe = () => {
    console.log("Subscribe to stuff")
    //TODO: Sana to add subscriber to contract.  
    // get the contract address
    const addr = this.props.match.params.contractAddress;
    // look at registerContract in the AshyaApp Wizard code
    // 1. Make a new contract from the address and bytecode. 
    // 2. data: deviceContract.bytecode
    // 3. estimate gas
    // 4. get gasprice
    // 5. now call add subscriber... addURL(addr)
  }

  submitFunc = (event) => {
    if (this.urlIsValid()) {
      const s = this.state
      s.error = ""
      this.forceUpdate()
      this.subscribe()
    }else {
      console.log("is not valid")
      const s = this.state
      s.error = this.state.subscriberURL + " is not a valid URL"
      this.forceUpdate()
    }
  }

  render() {
    return (
    <div>
      <Detail address={this.props.match.params.contractAddress} 
              subscriberURL={this.state.subscriberURL} 
              error={this.state.error}
              submitFunc={this.submitFunc}
              handleChange={this.handleChange} />
    </div>
    )
  }
}

export default withRouter(connect()(ContractDetails))
