pragma solidity ^0.4.19;

contract Registry {
  struct item {
    string iname;
    uint16 itemid;
    string url;
    string location;
  }

  uint itemCount;
  mapping(uint16 => item) itemList;
  item[] itemArray;

  function Registry() public {
      log0('hi');
  }

  function addItem(string name, uint16 iid, string url, string val) public {        
      var itemnew = item(name, iid ,url, val);
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

  function getItem(uint16 id)public constant returns (string iname, string val) {   
      return (itemArray[id].iname, itemArray[id].location);
  }
      
}
