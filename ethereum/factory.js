import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3B2980205292e7f1C9De1E52eC6e25f991e5753E'
);

export default instance;