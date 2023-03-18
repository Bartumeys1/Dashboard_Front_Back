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
import { useActions } from "../../hooks/useActions";


export interface blogEntitie {
  id: number;
  title: string;
  imageName: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  addedDate: string;
  lastModified: string;
}
//замінити на блог

const BlogInformation: React.FC<any> = ({ entitie }) => {
  const post: blogEntitie = entitie;
  const { SetReadPost } = useActions();
  return (
    <Grid item xs={12} sx={{  mb: "10px" }}>
      <Card >

<Typography sx={{textAlign:"center", maxWidth: "100%" }}>

<CardMedia
          component="img"
          alt={entitie.imageName}
          height="300px"
          image={entitie.imageUrl}
          sx={{backgroundSize:"contain"}}
          />
</Typography>
       

        <CardContent >
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.shortDescription}
          </Typography>
        </CardContent>
        <CardActions sx={{display:"flex" , justifyContent:"end"}}>
        <Button variant="outlined" onClick={()=>{SetReadPost(post)}}>
            <Link to={`/post/${post.title}`} style={{textDecoration:"none", color: "black", fontWeight:600}} >Learn More</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BlogInformation;
