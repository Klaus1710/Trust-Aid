import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import CampaignInstance from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Link from "next/link";
import {useRouter} from "next/router";

function CampaignNew({ campaignAddress }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (event) => {
    if (event.target.name === "description") setDescription(event.target.value);
    else if (event.target.name === "amount") setAmount(event.target.value);
    else setRecipient(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await CampaignInstance(campaignAddress);
      campaign.options.address = campaignAddress;
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({ from: accounts[0] });
      router.push(`/campaigns/${campaignAddress}/requests`);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Link href={`/campaigns/${campaignAddress}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <form
        class={errMsg ? "ui form error" : "ui form"}
        onSubmit={handleSubmit}
      >
        <div class="field">
          <label>Description</label>
          <div class="ui input" style={{ width: "40vw" }}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <label style={{ marginTop: "20px" }}>Amount in Ether</label>
          <div class="ui input" style={{ width: "40vw" }}>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <label style={{ marginTop: "20px" }}>Recipient</label>
          <div class="ui input" style={{ width: "40vw" }}>
            <input
              type="text"
              name="recipient"
              value={recipient}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="ui error message">
          <i class="close icon"></i>
          <div class="header">Oops!</div>
          <div>{errMsg}</div>
        </div>
        <button
          class={loading ? "ui primary loading button" : "ui primary button"}
          type="submit"
        >
          Create!
        </button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(props) {
  const campaignAddress = props.query.address;
  return {
    props: { campaignAddress },
  };
}

export default CampaignNew;
