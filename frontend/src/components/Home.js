import React, { Component } from "react";
import NavBar from "./NavBar";
import PostList from "./PostList";
import { Grid, Box } from "@mui/material";

export default class Home extends Component {
  render() {
    return (
      <Box>
        <NavBar />
        <Grid container rowSpacing={1}>
          <Grid item xs={2}></Grid>
          <PostList />
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
    );
  }
}
