import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { withRouter } from 'react-router-dom'

// yikes... 
//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
class ContractDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return (
    <div>
      <Detail address={this.props.match.params.contractAddress}/>
    </div>
    )
  }
}

export default withRouter(connect()(ContractDetails))
