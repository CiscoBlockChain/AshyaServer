pragma solidity ^0.4.0;

contract ItemListContract {
    struct item {
        
        string iname;
        uint16 itemid;
        string url;
        string location;
        address Address;
    }

    uint itemCount;
    mapping(uint16 => item) itemList;
    item[] itemArray;

    function ItemListContract() public {
        log0('hi');
    }

    function addItem(string name, uint16 iid, string url, string val,address Add) public {        
        var itemnew = item(name, iid ,url, val,Add);
        itemList[iid] = itemnew;
        itemArray.push(itemnew);
        itemCount++;
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
