# Ashya Server
A decentralized IOT devices registry  web service, using ethereum Blockchain and Web3.js.

## Development

Be sure to start up parity with: 

```
parity --chain testnet --jsonrpc-cors all
```


## Building

```
docker build -t ashya/ashya-server .
```

## CI/CD

In order to pass the drone file, the following passwords should be set: 

```
drone secret add -repository CiscoBlockChain/AshyaServer -image plugins/docker -name docker_username -value ashya
drone secret add -repository CiscoBlockChain/AshyaServer -image plugins/docker -name docker_password -value mysecret
drone secret add -repository CiscoBlockChain/AshyaServer -image appleboy/drone-ssh -name ssh_password -value mysecret
```