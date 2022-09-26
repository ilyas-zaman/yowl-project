import React, { useState } from "react";
import Button from "@mui/material/Button";
import { getSelf } from "../services/Profile.service";

var jwt = require("jsonwebtoken");
export default function MyProfile() {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTYzODk3OTExOSwiZXhwIjoxNjM4OTgyNzE5fQ.gE91ePItJW_Eaw50VJXvXcmcDVbLg-jJJ_GRlr2-Li4";
  var decoded = jwt.verify(token, "SECRET");
  console.log(decoded);

  getSelf().then((res) => console.log(res.data));
  const [firstname, setFirstName] = useState("Firstname");
  const [lastname, setLastName] = useState("Lastname");
  const [email, setEmail] = useState("Email");
  return (
    <div className="App">
      <div className="Card">
        <div className="upper_container">
          <div className="image_container">
            <img src="" alt="" height="100px" width="100px" />
          </div>
        </div>
        <div className="lower_container">
          <h3>
            {" "}
            {firstname} {lastname}{" "}
          </h3>
          <h4> {email} </h4>
        </div>
        <Button variant="outlined">Create a post</Button>
      </div>
    </div>
  );
}
