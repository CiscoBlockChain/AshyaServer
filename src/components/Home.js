import React from 'react'

const Home = ({addresses}) => (
    <div className="container">
        <p></p>
        <h1 className="header">Addresses</h1>
        <p className="lead">Welcome to the Ashya Registry!  Here we are building a registry of devices connected through the Ethereum blockchain.  Once in production you will be able to subscribe to and perhaps even manage the devices in a decentralized way.  
        </p>
        <table className="table table-striped">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Contract</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            { addresses.map( (a, index) => 
                //string iname, string loc, string Url, address add)
                Array.isArray(a) ?  
                  <tr key={index}>
                    <th scope="row">{ index }</th>
                    <td><a href={"/contracts/" + a[0]}>{ a[0] }</a></td>
                    <td>{ a[1] }</td>
                    <td>{ a[2] }</td>
                    <td><a href={a[3]}>{ a[3] }</a></td>
                  </tr>
                  :
                  <tr key={a}><th scope="row">{ a }</th></tr>
            )}
          </tbody>
        </table>
    </div>
);

export default Home
