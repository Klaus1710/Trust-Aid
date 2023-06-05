import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Link from "next/link";
import CampaignInstance from "../ethereum/campaign";

function CampaignIndex({ campaigns, arr }) {
  const items = campaigns.map((address, index) => {
    const title = arr[index].title;
    const description = arr[index].description;
    return {
      header: title,
      description: (
        <div>
          <p>{description}</p>
          <Link href={`/campaigns/${address}`}>
            <a className="item">View Campaign</a>
          </Link>
        </div>
      ),
      fluid: true,
    };
  });

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <button className="ui right floated labeled icon button">
            <i className="add circle icon"></i>
            Create Campaign
          </button>
        </Link>
        <Card.Group items={items} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  const arr = await Promise.all(
    campaigns.map(async (address, index) => {
      const campaign = await CampaignInstance(address);
      const summary = await campaign.methods.getTitleDes().call();
      const serializedRequest = {
        title: summary[0],
        description: summary[1],
      };
      return serializedRequest;
    })
  );
  return { props: { campaigns, arr } };
}

export default CampaignIndex;
