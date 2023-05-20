import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x19Bc6aBe17d594757cEFEB44857f151f41a21835'
);

export default instance;