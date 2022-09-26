import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: "50%",
        marginLeft: "24%",
        marginRight: "12%",
        marginTop: 6,
      }}
    >
      <TextField
        sx={{ fontSize: "20px" }}
        fullWidth
        label="🔎 Search"
        id="fullWidth"
        variant="standard"
      />
    </Box>
  );
}
