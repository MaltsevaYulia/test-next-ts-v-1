import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  Button,
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatDate from "../helpers/formatDate";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostItem({ post, user=null }) {
  const [expanded, setExpanded] = React.useState(false);
    const date = formatDate(post.created_at);
      const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    };
    
    const goToAuthorPage = () => {
    router.push({
      pathname: "/author",
      query: { authorId: post.owner.id }, 
    });
}

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.owner.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <CardActions>
          {user && user.user_metadata.profileType === "Author" && (
            <Button size="small" onClick={goToAuthorPage}>
              All author posts
            </Button>
          ) }

          {user && user.user_metadata.profileType === "Commentator" && (
            <Button size="small" onClick={goToAuthorPage}>
              Comments
            </Button>
          )}
        </CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <Typography paragraph>In developing.....</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
