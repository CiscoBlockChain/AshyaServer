pragma solidity ^0.4.19;

contract AshyaRegistry {
    struct item {
        
        string iname;
        string location;
        string url;
        address ownerAddress;
        uint index;
    }

    mapping(address => item) itemList;
    address[] itemIndex;
    
    event LogNewItem (address indexed itemAddress, uint index, string iname, string location, string url, address ownerAddress);
    event LogDeleteItem(address indexed itemAddress, uint index);
    
    function AshyaRegistry() public {
        itemIndex.length = 0;
    }

    function addItem(string name, string location, string url,address itemAddress, address ownerAddress) public  {        
        //var itemnew = item(name ,url, location, itemAddress);
        itemList[itemAddress].iname = name;
        itemList[itemAddress].location = location;
        itemList[itemAddress].url = url;
        itemList[itemAddress].ownerAddress = ownerAddress; 
        itemList[itemAddress].index = itemIndex.push(itemAddress)-1;
        
        LogNewItem(
            itemAddress,
            itemList[itemAddress].index,
            name,
            location,
            url,
            ownerAddress);
    }

    function getItemCount()public constant returns (uint count) {     
        return itemIndex.length;
    }
    
    function checkOwnership(address itemAddress) public{
        require(msg.sender == itemList[itemAddress].ownerAddress || msg.sender == address(this));
    } 

    function removeItem(address itemAddress) public {
        checkOwnership(itemAddress);
        uint rowToDelete = itemList[itemAddress].index;
        address keyToMove = itemIndex[itemIndex.length-1];
        itemIndex[rowToDelete] = keyToMove;
        itemList[keyToMove].index = rowToDelete;
        itemIndex.length--;
        LogDeleteItem(
            itemAddress,
            rowToDelete);
        
    }
    
    function getItem(address itemAddress)public constant returns (string name, string url, string location, uint index, address ownerAddress) {   
        return (itemList[itemAddress].iname, itemList[itemAddress].url, itemList[itemAddress].location, itemList[itemAddress].index, itemList[itemAddress].ownerAddress);
    }
    
    function getItemAtIndex(uint index) public constant returns(address itemAddress) {
        return itemIndex[index];
    }
}

