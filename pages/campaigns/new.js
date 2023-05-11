import React, { useState } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";

function CampaignNew() {
  const [minContri, setMinContri] = useState(0);
  const [errMsg,setErrMsg] = useState('');
  const [loading,setLoading] = useState(false);
  const handleChange = (event) => {
    setMinContri(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg('');
    try{
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(minContri).send({ from: accounts[0] });

        Router.pushRoute('/');
    }catch(err){
        setErrMsg(err.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <form class={errMsg?"ui form error":"ui form"} onSubmit={handleSubmit}>
        <div class="field">
          <label>Minimum Contribution</label>
          <div class="ui right labeled input" style={{ width: "50vw" }}>
            <input type="text" value={minContri} onChange={handleChange} />
            <div class="ui basic label">wei</div>
          </div>
        </div>
        <div class="ui error message">
          <i class="close icon" onClick={()=>setErrMsg('')}></i>
          <div class="header">Oops!</div>
          <div>{errMsg}</div>
        </div>
        <button class={loading?"ui primary loading button":"ui primary button"} type="submit">
          Create!
        </button>
      </form>
    </Layout>
  );
}
export default CampaignNew;
