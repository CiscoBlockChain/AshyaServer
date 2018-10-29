import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { withRouter } from 'react-router-dom'
import * as deviceContract from '../device-contract'
import Web3 from 'web3';
import validator from 'validator';

// yikes... 
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
class ContractDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriberURL : "",
      subscribers : [], // current subscribers
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
        t.getSubscribers()
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
    return false;
}

   
  subscribe = () => {
    console.log("Subscribe to stuff")
     const addr = this.props.match.params.contractAddress;
     console.log(addr)
     //an object has the same properties of the deployed address
     var newContract = new this.state.provider.eth.Contract(deviceContract.abiArray, addr); // default gas price in wei, 20 gwei in this case

    newContract.methods.addURL(this.state.subscriberURL).estimateGas({from: this.state.accounts[0], value: 1000000000000000}, this.rc0)
 }
 
 
 
 rc0 = (error, gasEstimate) => {
    if (error) {
      console.error("Got error with getting gas estimate")
      console.error(error);
      return
    }
    console.log("Got gas Estimate: ", gasEstimate)
    this.setState({gasLimit: gasEstimate})
    this.state.provider.eth.getGasPrice(this.rc1)
  }

  rc1 = (error, gasPrice) => {
    this.setState({gasPrice: gasPrice});
    if (error) {
      console.error(error);
      return
    }
    const addr = this.props.match.params.contractAddress;
    let self = this
    let account = this.state.accounts[0]
    let newContract = new this.state.provider.eth.Contract(deviceContract.abiArray, addr);
    console.log("Adding new url to this device")
    newContract.methods.addURL(this.state.subscriberURL).send({
         from: account,
         gas: this.state.gasLimit + 80000,
         gasPrice: this.state.gasPrice,
         value:  1000000000000000,
    }, function(error, transactionHash){
        self.setState({contractStatus: "Submitted with Transaction Hash: ", transactionHash})
       })
      .on('error', function(error) {
        console.error(error)
        self.setState({contractStatus: "Error submitting contract: ", error})
      })
      .on('transactionHash', function(transactionHash) {
        self.setState({contractStatus: "Successfully submitted transaction hash: " +  transactionHash})
      })
      .on('receipt', function(receipt) {
        self.setState({contractStatus: "Contract Address: " + receipt.contractAddress})
        console.log("got receipt! address: ", receipt.contractAddress)
      })
      .on('confirmation', function(confirmationNumber, receipt) {
        self.setState({contractStatus: "Contract Address: "+ receipt.contractAddress + " Confirmation: " + confirmationNumber})
        //console.log("got confirmation: ", confirmationNumber)
      })
      .then(function(newContractInstance){
        console.log("Created New Contract Instance: ", newContractInstance);
        // store contract in Ashya Device.
       
      })
  }

  // get the current subscriber URLS from the contract. 
  getSubscribers = () => {
      const addr = this.props.match.params.contractAddress;
      //an object has the same properties of the deployed address
      var thisContract = new this.state.provider.eth.Contract(deviceContract.abiArray, addr); // default gas price in wei, 20 gwei in this case
      let t = this
      thisContract.methods.getURLCount().call(function(error, count) {
        console.log("count of subscribers: ", count)
        for (let i = 0; i < count; i++) {
          thisContract.methods.urls(i).call(function(error, url) {
            console.log(url)
            var arr = t.state.subscribers
            arr.push(url)
            t.setState({subscribers : arr})
          })
        }
      })
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
              subscribers={this.state.subscribers}
              handleChange={this.handleChange} />
              
    </div>
    )
  }
}

export default withRouter(connect()(ContractDetails))
