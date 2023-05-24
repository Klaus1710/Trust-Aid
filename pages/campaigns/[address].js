import React from "react";
import Layout from "../../components/Layout";
import CampaignInstance from "../../ethereum/campaign";
import DisplayCard from "../../components/Card";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NotAuthenticated from "../NotAuthenticated";

function showcampaign(props) {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <div>Campaign Show</div>
        <div style={{ display: "flex" }}>
          <div>
            <div className="ui cards ">
              <DisplayCard
                header={props.manager}
                meta="Managers Address"
                description="Manager is the one who has created this campaign!"
              />
              <DisplayCard
                header={props.minimumContribution}
                meta="Minimum Contribution (wei)"
                description="Minimum amount required in order to become a contributor."
              />
              <DisplayCard
                header={props.requestsCount}
                meta="Number of Requests"
                description="A request is made by the manager to withdraw fund and approved by approvers"
              />
              <DisplayCard
                header={props.approversCount}
                meta="Number of Contributors"
                description="A contributor is the approver of the requests made by the manager"
              />
              <DisplayCard
                header={web3.utils.fromWei(props.balance, "ether")}
                meta="Campaign Funds (ethers)"
                description="This shows the amount of funds that campaign is currently having"
              />
            </div>
            <div style={{ display: "flex" }}>
              {props.requestsCount > 0 ? (
                <div style={{ marginTop: "20px" }}>
                  <Link href={`/campaigns/${props.address}/requests`}>
                    <button className="ui primary button">View Requests</button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div style={{ marginTop: "20px" }}>
                <Link href={`/campaigns/${props.address}/requests/new`}>
                  <button className="ui primary button">Create Request</button>
                </Link>
              </div>
            </div>
          </div>
          <ContributeForm address={props.address} />
        </div>
      </Layout>
    );
  }
  else if(!session){
    return <NotAuthenticated/>
  }
}

export async function getServerSideProps(props) {
  const campaignAddress = props.query.address;
  const campaign = await CampaignInstance(campaignAddress);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      address: campaignAddress,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}

export default showcampaign;
