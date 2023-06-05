import React, { useState } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NotAuthenticated from "../NotAuthenticated";

function CampaignNew() {
  const [minContri, setMinContri] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const handleChange = (event) => {
    if(event.target.name==="contri")
    setMinContri(event.target.value);
    else if(event.target.name==="title")
    setTitle(event.target.value);
    else if(event.target.name==="des")
    setDes(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minContri,title,des)
        .send({ from: accounts[0] });

      router.push("/");
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };
  if (session) {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <form
          className={errMsg ? "ui form error" : "ui form"}
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label>Minimum Contribution</label>
            <div className="ui right labeled input" style={{ width: "50vw" }}>
              <input type="text" name="contri" value={minContri} onChange={handleChange} />
              <div className="ui basic label">wei</div>
            </div>
            <label style={{marginTop:"10px"}}>Title</label>
            <div className="ui input" style={{ width: "50vw" }}>
              <input type="text" name="title" value={title} onChange={handleChange} />
            </div>
            <label style={{marginTop:"10px"}}>Description</label>
            <div className="ui input" style={{ width: "50vw" }}>
              <input type="text" name="des" value={des} onChange={handleChange} />
            </div>
          </div>
          <div className="ui error message">
            <i className="close icon" onClick={() => setErrMsg("")}></i>
            <div className="header">Oops!</div>
            <div>{errMsg}</div>
          </div>
          <button
            className={loading ? "ui primary loading button" : "ui primary button"}
            type="submit"
          >
            Create!
          </button>
        </form>
      </Layout>
    );
  } else if (!session) {
    return <NotAuthenticated />;
  }
}
export default CampaignNew;
