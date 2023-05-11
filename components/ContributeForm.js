import { useState } from "react";
import CampaignInstance from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
  const [loading, setLoading] = useState(false);
  const [contri, setContri] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (event) => {
    setContri(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    const campaign = await CampaignInstance(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contri, "ether"),
      });
      window.location.reload();
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <form class={errMsg ? "ui form error" : "ui form"} onSubmit={handleSubmit}>
      <div class="field">
        <label>Amount to Contribute</label>
        <div class="ui right labeled input" style={{ width: "30vw" }}>
          <input type="text" value={contri} onChange={handleChange} />
          <div class="ui basic label">ether</div>
        </div>
      </div>
      <div class="ui error message">
        <i class="close icon" onClick={()=>setErrMsg('')}></i>
        <div class="header">Oops!</div>
        <div>{errMsg}</div>
      </div>
      <button
        class={loading ? "ui primary loading button" : "ui primary button"}
        type="submit"
      >
        Contribute!
      </button>
    </form>
  );
};

export default ContributeForm;
