import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { blogEntitie } from "..";
import { useActions } from "../../../hooks/useActions";

const PostMini: React.FC<any> = ({ entitie }) => {
  const _post: blogEntitie = entitie;
  const { SetReadPost } = useActions();

  return (
    <Grid item xs={12} sx={{ mb: "10px" }}>
      <Card>
        <Typography sx={{ textAlign: "center", maxWidth: "100%" }}>
          <CardMedia
            component="img"
            height="150px"
            image={_post.imageUrl}
            alt={_post.imageName}
            sx={{ backgroundSize: "contain" }}
          />
        </Typography>

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {_post.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="outlined" onClick={()=>{SetReadPost(_post)}}>
            <NavLink
              to={`/post/&title=${_post.title}&id=${_post.id}`}
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: 600,
              }}
            >
              Learn More
            </NavLink>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostMini;
