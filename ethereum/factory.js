import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x967d070F48bBCc764ecE0044EF0df1b5FcA11FDe'
);

export default instance;