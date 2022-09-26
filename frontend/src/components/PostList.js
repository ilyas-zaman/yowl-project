import Post from "./Post";
import React from "react";
import { getPosts } from "../services/post.service";
import { Grid } from "@mui/material";

export default class PostList extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    getPosts().then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  render() {
    return (
      <Grid xs={8}>
        <div className="container">
          <div className="jumbotron-div col s12">
            <ul className="collection">
              {this.state.posts.map((post) => {
                return <Post post={post} />;
              })}
            </ul>
          </div>
        </div>
      </Grid>
    );
  }
}
