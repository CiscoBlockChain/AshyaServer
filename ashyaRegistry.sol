pragma solidity ^0.4.19;

contract AshyaRegistry {
    struct item {
        
        string iname;
        string url;
        string location;
        address Address;
    }

    uint16 itemCount;
    mapping(uint16 => item) itemList;
    item[] itemArray;

    function AshyaRegistry() public {
        log0('hi');
        itemCount = 0;
    }

    function addItem(string name, string url, string val,address Add) public {        
        var itemnew = item(name ,url, val,Add);
        itemList[itemCount++] = itemnew;
        itemArray.push(itemnew);
    }

    function countItemList()public constant returns (uint count) {     
        return itemCount;
    }

    function removeItem(uint16 id) public {
        delete itemArray[id];
        itemCount--;
    }
    
    function getItem(uint16 id)public constant returns (string iname, string loc, string Url, address add) {   
        return (itemArray[id].iname, itemArray[id].location, itemArray[id].url,itemArray[id].Address);
    }

}
