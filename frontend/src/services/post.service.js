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

async function addPost(title, content, url, category_id) {
  var data = new URLSearchParams();

  data.append("title", title);
  data.append("content", content);
  data.append("url", url);
  data.append("category_id", category_id);

  /*var data = {
    title: title,
    content: content,
    url: url,
    category_id: "4",
  };
  */

  console.log(data);

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTYzODk3NjQ0NywiZXhwIjoxNjM4OTgwMDQ3fQ.0CRO6126_AP4vHw1smZ2B1iLt-_8Brh3XHas3WoF92s";
  return axios
    .post("http://localhost:8000/posts", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res));
}

export { fetchAll };
export { addPost };
