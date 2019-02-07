import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddresses } from '../actions'
import Docs from '../components/Docs'

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc : this.props.doc || "",
    }
  }

  // get more examples: https://github.com/katopz/web3-react-example/blob/master/src/App.js
  componentWillReceiveProps(nextProps) {
    this.setState({
      doc: nextProps.doc || [],
    })
  }

  render() {
    return (
    <div>
      <Docs addresses={this.state.doc}/>
    </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  //doc: state.documents.doc,
  
})

const mapDispatchToProps = (dispatch) => ({
  getAddresses: () => dispatch(getAddresses()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Documents)
