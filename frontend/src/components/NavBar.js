import React from "react";
import { Typography, TextField, Button, Grid, Box } from "@mui/material";

const style = {
  navBar: {
    height: "100px",
  },
};

export default function NavBar() {
  return (
    <Box width="100%" xs={style.navBar}>
      <Grid container item justifyContent="space-around">
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          xs={2}
        >
          <Typography>Logo</Typography>
        </Grid>
        <Grid item container alignItems="center" xs={6}>
          <TextField fullWidth label="search..." id="fullWidth" />
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          alignItems="center"
          xs={2}
        >
          <Button target="_blank" href={"/login"}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
