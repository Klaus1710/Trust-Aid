import Layout from "../../../../components/Layout";
import Link from "next/link";
import CampaignInstance from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useState } from "react";
const Request = ({ address, requests, requestCount, approversCount }) => {
  const [errMsg, setErrMsg] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const handleApprove = async (i) => {
    setApproveLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = CampaignInstance(address);
      await campaign.methods.approveRequest(i).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrMsg(err.message);
    }
    setApproveLoading(false);
    window.location.reload();
  };
  const handleFinalize = async (i) => {
    setFinalizeLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = CampaignInstance(address);
      await campaign.methods.finalizeRequest(i).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrMsg(err.message);
    }
    setFinalizeLoading(false);
    window.location.reload();
  };
  return (
    <Layout>
      <h3>Pending Requests</h3>
      {errMsg && (
        <div className="ui error message">
          <i className="close icon" onClick={() => setErrMsg("")}></i>
          <div className="header">Oops!</div>
          <div>{errMsg}</div>
        </div>
      )}
      <table className="ui celled table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Recipient</th>
            <th>Approval Count</th>
            <th>Approve</th>
            <th>Finalize</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((ele, i) => {
            console.log("run");
            return (
              <tr >
                <td data-label="ID">{i+1}</td>
                <td data-label="Description">{ele.description}</td>
                <td data-label="Amount">
                  {web3.utils.fromWei(ele.value, "ether")}
                </td>
                <td data-label="Recipient">{ele.recipient}</td>
                <td data-label="Approval Count">
                  {ele.approvalCount}/{approversCount}
                </td>
                <td data-label="Approve">
                  {ele.complete?null:(<button
                    className={
                      approveLoading
                        ? "ui green loading button"
                        : "ui green button"
                    }
                    onClick={() => handleApprove(i)}
                  >
                    Approve
                  </button>)}
                </td>
                <td data-label="Finalize">
                  {ele.complete?null:(<button
                    className={
                      finalizeLoading
                        ? "ui teal loading button"
                        : "ui teal button"
                    }
                    onClick={() => handleFinalize(i)}
                  >
                    Finalize
                  </button>)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link href={`/campaigns/${address}/requests/new`}>
        <button className="ui primary button">Add Requests</button>
      </Link>
    </Layout>
  );
};
export async function getServerSideProps(props) {
  const { address } = props.query;
  const campaign = CampaignInstance(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map(async (element, index) => {
        const request = await campaign.methods.requests(index).call();
        const serializedRequest = {
          description: request.description,
          value: request.value,
          recipient: request.recipient,
          complete: request.complete,
          approvalCount: request.approvalCount,
        };
        return serializedRequest;
      })
  );
  return { props: { address, requests, requestCount, approversCount } };
}
export default Request;
