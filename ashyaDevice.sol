pragma solidity ^0.4.19;

contract AshyaDevice {
    
    // The address must match the one of the newly created AshyaRegistry Contract 
    address constant AshyaRegistryAddress=0x158f68b0c4795714dc4389205f84dbb0e0985183;

    function AshyaDevice(string name, string location, string url, address ownerAddress) public payable {
        AshyaRegistry DeviceObj = AshyaRegistry(AshyaRegistryAddress);
        DeviceObj.addItem(name,location,url, address(this), ownerAddress);  }
    }