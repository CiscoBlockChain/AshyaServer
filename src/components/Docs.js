import React from 'react'

const Docs = ({doc}) => (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/Introduction">
                  <span data-feather="home"></span>
                  Introduction <span className="sr-only">(current)</span>
                </a>
              </li> 
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>
        </main>
      </div>
    </div>
  
);

export default Docs
