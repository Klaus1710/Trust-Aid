const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'rebuild young river coil era street asset tackle fuel avocado interest crystal',
    'https://sepolia.infura.io/v3/ba3893c6a6a44e1a9e7109cb964bfc98'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
