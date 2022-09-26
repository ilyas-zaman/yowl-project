import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Icon from "@mui/material/Icon";
import { getCommentByPostId } from "../services/comment.service";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isToggleOn: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getCommentByPostId(this.props.post.id).then((res) => {
      const comments = res.data;
      this.setState({ comments });
    });
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <Grid container sx={{ marginTop: "5%" }} item xs={12}>
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {this.props.post.user.username}
              </Typography>
              <Typography variant="h5" component="div">
                {this.props.post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.props.post.category.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                {this.props.post.content}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button onClick={this.handleClick}>
                <Icon>comment</Icon>
              </Button> */}
              {/* {this.state.isToggleOn ? "ON" : "OFF"} */}
            </CardActions>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Icon>comment</Icon>
              </AccordionSummary>
              <AccordionDetails>
                {this.state.comments.map((comment) => (
                  <Box>
                    <Typography sx={{ mb: 1.5 }}>{comment.content}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
