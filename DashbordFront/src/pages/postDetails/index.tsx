import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { blogEntitie } from "../../components/blogInformation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../../components/header";
import { useActions } from "../../hooks/useActions";

import PostMini from "../../components/blogInformation/postMini";
import { useParams } from "react-router-dom";
import Copyright from "../../components/copyright";

const convertArr = (arr: blogEntitie[]) => {
  return arr;
};

const PostDetails: React.FC = () => {
  const { readPost } = useTypedSelector((state) => state.BlogReducer);
  const { slug } = useParams();

  const { GetTopPosts } = useActions();
  const { topPosts } = useTypedSelector((state) => state.BlogReducer);

  useEffect(() => {
    GetTopPosts(3);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Typography
          align="center"
          variant="h3"
          sx={{ mb: "20px", mt: "20px", fontFamily: "none" }}
        >
          {slug}
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={9}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                component="img"
                width="100%"
                image={readPost.imageUrl}
                alt={readPost.imageName}
              />

              <CardContent>
                <Typography>{readPost.fullDescription}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ border: "1px solid black" }}>
                  <Typography align="center" variant="h5" component="div">
                    Recent Posts
                  </Typography>
                  <Divider sx={{ mb: "10px" }} />
                  <div>
                    {convertArr(topPosts).map((el) => (
                      <div key={el.id}>
                        <PostMini entitie={el} />
                      </div>
                    ))}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </>
  );
};

export default PostDetails;
