import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Link from "next/link";

function CampaignIndex({ campaigns }) {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a class="item">View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <button class="ui right floated labeled icon button">
            <i class="add circle icon"></i>
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

  return { props: { campaigns } };
}

export default CampaignIndex;
