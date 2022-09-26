import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components//Login";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import SearchBar from "./components/SearchBar";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
