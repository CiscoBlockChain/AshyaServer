import React from 'react'

const Introduction = () => (
    <div> <h1 className="h2">Introduction</h1>
      <p>The Ashya Project consists of several components all of which work together 
        to allow IoT services to be produced, advertized, and consumed</p>
      <p>There are several actors in the ecosystem that each have their own set of properties
      and objectives.  We will go through that in this documentation.</p>
      <ul>
        <li><b>Device Owners</b> - Anyone is allowed to download the code freely from the internet and run a contract
        on their own Raspberry Pi.  Device owners create contracts on the blockchain that allow anyone on the blockchain 
        to add their URL as a subscriber to their device.</li>
        <li><b>Subscribers</b> - These are users who wish to consume the services of the devices. In the first use case 
        we have created, the service does a basic image recognition service and sends data to the subscribers consisting of the objects that are
        detected.</li>
        <li><b>The Registry</b> - The third entity in the Ashya ecosystem is the Device Registry.  This is hosted at <a href="https://ashya.io">https://ashya.io</a>.
          Devices are not required to register their device, but can pay a nominal fee to have their device listed.  Through ashya.io subscribers can find
          devices they are interested in and enter into a contract with them. The contracts are between the device and the subscriber.  The Registry does not receive
          any fees as part of the transaction.   
        </li>
      </ul>
      <p>All transactions are done using Ethereum as the methods of payment and exchange.  The contracts and users of the system exist on Ethereum. 
      The system makes use of <a href="https://metamask.io">Metamask</a> as a way to facilitate payments, though other methods could be used to bridge the world wide web with the Ethereum network.  
      Metamask seems to be the most convenient at present. 
      </p>
    </div>
);

export default Introduction
