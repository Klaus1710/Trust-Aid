const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'print cinnamon rescue volume soup visit pig regular card unable radio end',
    'https://sepolia.infura.io/v3/7cc9d9a1e9434138b7416d306e91085a'
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
