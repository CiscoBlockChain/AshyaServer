import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddresses } from '../actions'
import Registry from '../components/Registry'

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses : this.props.addresses || [],
    }
  }

  componentDidMount() {
    this.props.getAddresses()
  }

  // get more examples: https://github.com/katopz/web3-react-example/blob/master/src/App.js
  componentWillReceiveProps(nextProps) {
    this.setState({
      addresses: nextProps.addresses || [],
    })
  }

  render() {
    return (
    <div>
      <Registry addresses={this.state.addresses}/>
    </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  addresses: state.blockchain.addresses,
})

const mapDispatchToProps = (dispatch) => ({
  getAddresses: () => dispatch(getAddresses()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Contracts)
