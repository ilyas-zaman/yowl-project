import { Category } from "@material-ui/icons";
import axios from "axios";
async function fetchAll() {
  return await {
    data: [
      { title: "toto", content: "toto", url: "toto" },
      { title: "antoine", content: "antoine", url: "antoine" },
      { title: "paul", content: "paul", url: "paul" },
      { title: "abdelkarim", content: "abdelkarim", url: "abdelkarim" },
      { title: "gokhan", content: "gokhan", url: "gokhan" },
      { title: "hugo", content: "hugo", url: "hugo" },
      { title: "ilyas", content: "ilyas", url: "ilyas" },
      { title: "francisco", content: "francisco", url: "francisco" },
    ],
  };
}

var jwt = require("jsonwebtoken");
async function getSelf() {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTYzODk3OTExOSwiZXhwIjoxNjM4OTgyNzE5fQ.gE91ePItJW_Eaw50VJXvXcmcDVbLg-jJJ_GRlr2-Li4";
  var decoded = jwt.verify(token, "SECRET");
  return console.log(
    decoded
  ); /*axios.get(`http://localhost:8000/users/:id`).then((res) => {
    const persons = res.data;
    this.setState({ persons });
  });*/
}

export { fetchAll };
export { getSelf };
