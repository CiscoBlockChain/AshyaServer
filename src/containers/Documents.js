import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage } from '../actions'
import Docs from '../components/Docs'

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : this.props.page || "",
    }
  }

  // get more examples: https://github.com/katopz/web3-react-example/blob/master/src/App.js
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page || "", 
    })
  }

  render() {
    return (
    <div>
      <Docs page={this.state.page}/>
    </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  page: state.docs.page
})

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(setPage(page)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Documents)
