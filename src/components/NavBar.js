import React from 'react'

const NavBar = ({contract}) => (
  <nav className="navbar navbar-expand-lg navbar-inverse bg-inverse">
    <div className="container">
    <a className="navbar-brand" href="">
      <img className="d-inline-block " alt="cisco" src="/images/logo-white.png" height="20px" />
    </a>
    <span className="navbar-text">
      Ashya
    </span>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="https://github.com/CiscoBlockChain/EthExperiments/blob/master/KlugeAshay.md">
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        <a className="nav-item nav-link" href="https://github.com/CiscoBlockChain/AshyaServer">
          <i className="fa fa-file-text-o" aria-hidden="true"></i>
        </a>
        <a className="nav-item nav-link" href={ "https://kovan.etherscan.io/address/" + contract +"#code"}>
          <i className="fa fa-code" aria-hidden="true"></i> { contract }
        </a>
      </div>
    </div>
    </div>
  </nav>
);

export default NavBar
