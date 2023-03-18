import React, { useState, useEffect, useTransition } from "react";
import {
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogInformation, { blogEntitie } from "../../components/blogInformation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../../components/header";
import { useActions } from "../../hooks/useActions";
import { TablePaginationActions } from "../../components/pagination";
import PostMini from "../../components/blogInformation/postMini";
import Copyright from "../../components/copyright";


const mdTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const filterBySearch = (entities: blogEntitie[], search: string) => {
  const result = entities.filter((item) =>
    item.title.concat(item.shortDescription).includes(search)
  );
  return result;
};

const convertArr =(arr:blogEntitie[])=>{
  return arr;
}

const BlogsPage: React.FC = () => {
  const { GetAllPosts, GetTopPosts } = useActions();
  const { allBlogs, topPosts } = useTypedSelector((state) => state.BlogReducer);

  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleSearch = (e: any) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    GetAllPosts(0, 1, true);
    GetTopPosts(3);
  }, []);

  const MyPagination = () => {
    return (
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
        colSpan={3}
        count={allBlogs.length}
        labelRowsPerPage="Posts per page"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Header />
      <Container >
        <Typography
          align="center"
          variant="h3"
          sx={{ mb: "1,5rem", mt: "45px", fontFamily: "Segoe UI" }}
        >
          Welcome to our blog
        </Typography>
        <Typography
          align="center"
          component="div"
          sx={{ mb: "10px", mt: "10px" }}
        >
          <TextField
            label="Search"
            type="search"
            variant="outlined"
            onChange={handleSearch}
            sx={{ mt: "1rem" }}
            style={{ width: "450px" }}
          />
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={9}>
            <Table>
              <TableBody>
                <TableRow>
                  <MyPagination />
                </TableRow>
                {(rowsPerPage > 0
                  ? filterBySearch(allBlogs, search).slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filterBySearch(allBlogs, search)
                ).map((el) => (
                  <TableRow key={el.id}>
                    <BlogInformation entitie={el} />
                  </TableRow>
                ))}
                <TableRow>
                  <MyPagination />
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={3}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ border: "1px solid black" }}>
                  <Typography align="center" variant="h5" component="div">
                    Recent Posts
                  </Typography>
                  <Divider sx={{mb:"10px"}}/>
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
        <Copyright/>
      </Container>
    </ThemeProvider>
  );
};

export default BlogsPage;
