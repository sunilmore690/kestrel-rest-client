import "./styles.css";
import React from "react";
import Login from "./Login";
import Rest from "./Rest";
import UpdraftClient from "./client";
export default function App() {
  let [loggedin, setLoggedin] = React.useState(false);
  let [client, setClient] = React.useState(null);
  let [error, setError] = React.useState(null);
  async function handleAuthenticate(host, username, password) {
    try {
      client = new UpdraftClient("wss://" + host);
      await client.authenticate();
      setClient(client);
      setLoggedin(true);
    } catch (e) {
      setError(e);
    }
  }
  function handleError(error) {
    setError(error);
  }
  return (
    <div className="container " style={{ marginTop: "20px" }}>
      <div className="col-sm-6 col-sm-offset-3">
        <div>
          <h4>REST Client</h4>
          {loggedin ? (
            <Rest client={client} handleError={handleError} />
          ) : (
            <Login handleCallback={handleAuthenticate} />
          )}
        </div>
        {error ? (
          <div className="bg-danger" style={{ marginTop: "10px" }}>
            <span>{typeof error === "string" ? error : error.message}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
