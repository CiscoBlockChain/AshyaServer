import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { withRouter } from 'react-router-dom'
import * as deviceContract from '../device-contract'
import Loading from '../components/Loading'
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
      accounts : [],
      provider: "",
      loading : false,
      working: false,
      workingMessage: ""
    }
  }

  // when the window loads, see if Metamask is there. 
  componentDidMount() {
    var t = this;
    window.addEventListener('load', async () =>  {
      // support november 2nd update:
      // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          t.validate(t)
          t.getSubscribers()
        } catch (error) {
          t.setState({merror: "Metamask not enabled."})
        }
      }
      else if (typeof window.web3 !== 'undefined') {
        t.validate(t)
      }else {
        console.log("no web3 provided.")
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
    var input = this.state.subscriberURL;
    if(validator.isURL(input.toString())){ 
      return true;
    }
    return false;
  }

   
  subscribe = () => {
    let t = this
    this.setState({working: true})
    let account = this.state.accounts[0];
    t.setState({workingMessage: "Use Metamask to complete transaction"})
    const addr = this.props.match.params.contractAddress;
    //an object has the same properties of the deployed address
    var newContract = new this.state.provider.eth.Contract(deviceContract.abiArray, addr); // default gas price in wei, 20 gwei in this case
    var eth = Web3.utils.toWei("0.040")
    newContract.methods.addURL(this.state.subscriberURL).estimateGas({
        from: account,
        value: eth
    })
    .then(function(gasEstimate) {
      t.setState({workingMessage: "Gas estimate" + gasEstimate.toString()})
      t.setState({gasLimit: gasEstimate})
      t.state.provider.eth.getGasPrice()
      .then(function(gasPrice) {
        t.setState({gasPrice: gasPrice});
        t.setState({workingMessage: "Adding URL to Contract"})
        newContract.methods.addURL(t.state.subscriberURL).send({
          from: account,
          gas: t.state.gasLimit + 800000,
          gasPrice: t.state.gasPrice,
          value: eth
        }, function(error, transactionHash){
          t.setState({workingMessage: "Submitted contract with Transaction Hash: ", transactionHash})
        })
        .on('error', function(error) {
          t.setState({working : false})
          t.setState({error: "Error submitting contract: "+ error.toString()})
        })
        .on('transactionHash', function(transactionHash) {
          t.setState({workingMessage: "Successfully submitted transaction hash: " +  transactionHash})
        })
        .on('receipt', function(receipt) {
          t.setState({workingMessage: "Contract Address: " + receipt.contractAddress})
          t.setState({working : false})
          //get subscribers after receipt is given
          t.getSubscribers()
        })
        .on('confirmation', function(confirmationNumber, receipt) {
          t.setState({workingMessage: "Contract Address: "+ receipt.contractAddress + " Confirmation: " + confirmationNumber})
          t.setState({working : false})
        })
      })
    })
    .catch(function(error) {
      t.setState({working: false})
      t.setState({error: error.toString()})
    })
  }

  // get the current subscriber URLS from the contract. 
  getSubscribers = () => {
    const addr = this.props.match.params.contractAddress;
    //an object has the same properties of the deployed address
    var thisContract = new this.state.provider.eth.Contract(deviceContract.abiArray, addr); // default gas price in wei, 20 gwei in this case
    let t = this
    thisContract.methods.getURLCount().call(function(error, count) {
      t.setState({subscribers : []})
      for (let i = 0; i < count; i++) {
        thisContract.methods.urls(i).call(function(error, url) {
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
      <Loading working={this.state.working} workingMessage={this.state.workingMessage} />
      <Detail address={this.props.match.params.contractAddress} 
              subscriberURL={this.state.subscriberURL} 
              error={this.state.error}
              submitFunc={this.submitFunc}
              subscribers={this.state.subscribers}
              loading={this.state.loading}
              handleChange={this.handleChange} />
              
    </div>
    )
  }
}

export default withRouter(connect()(ContractDetails))
