import React from 'react'

const Detail = ({address,subscriberURL,handleChange,submitFunc,error}) => (
    <div className="container">
      { error ? 
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
        :
        <br/>
      }
      <h2>
      <a target="_blank" href={"https://kovan.etherscan.io/address/"+address+"#code"}>{address}</a>
      </h2>
      <div>
        <p>This device allows you to subscribe to data streams by entering into a smart contract with it.</p>
        <p>If you would like to subscribe to the data produced by this contract enter in your callback URL below.
        </p>
        <div>
        <form className="form">
          <div className="form-group row">
            <input type="text" onChange={handleChange} className="form-control" id="subscriberURL" value={subscriberURL} placeholder="https://example.com/mycallback" />
          </div>
        </form>
        <button className="btn btn-primary btn-lg right" onClick={submitFunc}>
          Subscribe
        </button>
        <br/>
        </div>
        <br/>
      </div>
      <div className="alert alert-success">
        <h4 className="alert-heading">Work in Progress</h4>
        <p>We are working on allowing you to call the device contract from our site but we are not there yet!</p>
        <hr/>
        <p>We hope you check back soon to monitor our progress!</p>
      </div>
    </div>
);

export default Detail
