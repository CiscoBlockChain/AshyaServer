pragma solidity ^0.4.19;

contract registration
{
    address[] devices;
    
    function storeAdds(address registerAdd)public 
    {   devices.push(registerAdd);}
    
    
    function getAll() public constant returns (address[])
    { return devices;}
   
    function getValue(uint8 x) public constant returns (address)
    {  return devices[x]; }
    
}
