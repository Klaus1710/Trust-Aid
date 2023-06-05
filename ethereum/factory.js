import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC7D2435886487AB22253839B5339eb8cbCeb6a6B'
);

export default instance;