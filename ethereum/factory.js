import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x723aE70e69544A74Ee9F3Fe882619BC515Da9FA8'
);

export default instance;