import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddresses } from '../actions'
import Body from '../components/Body'

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses : this.props.addresses || [],
    }
  }

  componentDidMount() {
    this.props.getAddresses()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      addresses: nextProps.addresses || [],
    })
  }

  render() {
    return (
    <div>
      <Body addresses={this.state.addresses}/>
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
  mapDispatchToProps)(Contract)
