pragma solidity ^0.4.19;

contract AshyaRegistry {
    
    struct item {
        string iname;
        string url;
        string location;
        address owner;
    }
    
    uint16 itemCount;
    mapping(uint16 => item)public itemList;

    function AshyaRegistry() public {
        item memory newItem = item({iname:"", url:"", location:"",owner: msg.sender});
        itemCount = 0;
    }

    function addItem(string name, string url, string val,address owner) public {        
        var itemnew = itemList[itemCount];
        require(msg.sender == owner);
        itemnew.iname = name;
        itemnew.url = url;
        itemnew.location = val;
        itemnew.owner = owner;
        itemCount++;  
    }

    function countItemList()public constant returns (uint count) {     
        return itemCount;
    }

    function removeItem(uint16 id) public {
        if(itemList[id].owner != msg.sender)
            return;
        
        delete itemList[id];
        itemCount--;  
    }
    
    function getItem(uint16 id)public constant returns (string name, string url, string location, address add) {   
        return (itemList[id].iname, itemList[id].url, itemList[id].location, itemList[id].owner);
    }    
}
