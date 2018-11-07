// The address is the contract that is already deployed.  The ABI should come from the truffle repository whenever the contract is
// updated.  
export const address = "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
export const abiArray =[
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getItemCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_location",
        "type": "string"
      },
      {
        "name": "_url",
        "type": "string"
      }
    ],
    "name": "addItem",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_itemAddress",
        "type": "address"
      }
    ],
    "name": "removeItem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "itemAddress",
        "type": "address"
      }
    ],
    "name": "getItem",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "location",
        "type": "string"
      },
      {
        "name": "url",
        "type": "string"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getItemAtIndex",
    "outputs": [
      {
        "name": "itemAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]