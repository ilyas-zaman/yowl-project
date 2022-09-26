import * as React from "react";
import { useState } from "react";
import { addPost } from "../services/post.service";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { FormGroup } from "@mui/material";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [category_id, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    addPost(title, content, url, category_id);
    console.log(title);
    console.log(content);
    console.log(url);
    console.log(category_id);
  };
  return (
    <FormGroup>
      <Card
        sx={{
          width: "73%",
          marginLeft: "14%",
          marginRight: "12%",
          marginTop: 20,
          bgcolor: "#EAF1F0",
          boxShadow: 20,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, marginBottom: 3 }}
            color="text.secondary"
            gutterBottom
          >
            Create a post :
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <TextField
              sx={{ fontSize: 14, marginBottom: 3 }}
              fullWidth
              placeholder="Title"
              id="fullWidth"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ fontSize: 14 }}
              fullWidth
              placeholder="Content"
              id="fullWidth"
              variant="standard"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <TextField
              sx={{ fontSize: 14, marginTop: 3 }}
              fullWidth
              placeholder="Url"
              id="fullWidth"
              variant="standard"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel
              style={{
                marginTop: 22,
                fontSize: 11,
              }}
              id="demo-simple-select-label"
            >
              Category
            </InputLabel>
            <Select
              sx={{ marginTop: 3 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category_id}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={1}>Annuaire web</MenuItem>
              <MenuItem value={2}>Blog</MenuItem>
              <MenuItem value={3}>Comparateur</MenuItem>
              <MenuItem value={4}>Editeur de sites Web</MenuItem>
              <MenuItem value={5}>Forum</MenuItem>
              <MenuItem value={6}>Site de jeux</MenuItem>
              <MenuItem value={7}>Média</MenuItem>
              <MenuItem value={8}>E-commerce</MenuItem>
              <MenuItem value={9}>Grandes groupes</MenuItem>
              <MenuItem value={10}>Other...</MenuItem>
            </Select>
          </FormControl>

          <Button
            style={{
              background: "#343636",
              fontFamily: "Arial",
              marginTop: 50,
            }}
            size="small"
            variant="contained"
            onClick={handelSubmit}
          >
            Create
          </Button>
        </CardContent>
      </Card>
    </FormGroup>
  );
}
