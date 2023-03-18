import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter, TablePagination } from "@mui/material";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Navigate, NavLink } from "react-router-dom";
import { blogEntitie } from "../../../components/blogInformation";
import { TablePaginationActions } from "../../../components/pagination";

const Dashboard_Blog: React.FC = () => {
  const { GetAllPosts, RemoveBlog, SetReadPost } = useActions();
  const { allBlogs } = useTypedSelector((state) => state.BlogReducer);
  //const { loading  } = useTypedSelector((state) => state.BlogReducer);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [entitie, setEntitie] = useState({});

  let rows: blogEntitie[] = allBlogs;
  useEffect(() => {
    GetAllPosts(0, 1, true);
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

  const HandleDeletePost = (entitie: blogEntitie) => {
    if (window.confirm(`Delete ${entitie.title}?`)) {
      DeleteUser(entitie.id);
    }
  };

  async function DeleteUser(id: number) {
    await RemoveBlog(id);
    await GetAllPosts(0, 1, true);
  }
  return (
    <TableContainer component={Paper}>
      {/* {openDeleteDialog &&
      //<DeletePostDialog entitie={entitie}/>
      } */}

      <NavLink to="/dashboard/createPost">
        <Button variant="contained" sx={{ mt: 2, mb: 2, left: "90%" }}>
          Create New
        </Button>
      </NavLink>
      <Table
        sx={{
          minWidth: 500,
          maxWidth: "98%",
          border: "1px solid #e0e0e0",
          mb: "5px",
          ml: "13px",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Time created</TableCell>
            <TableCell align="center">Time updated</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell style={{ width: 300 }} align="center">
                {row.addedDate}
              </TableCell>
              <TableCell style={{ width: 300 }} align="center">
                {row.lastModified}
              </TableCell>
              <TableCell style={{ width: 300 }} align="center">
                <Button
                  variant="contained"
                  sx={{ m: "1px" }}
                  onClick={() => {
                    HandleDeletePost(row);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: "1px" }}
                  onClick={() => {
                    SetReadPost(row);
                  }}
                >
                  <NavLink
                    to="editePost"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Edite
                  </NavLink>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Dashboard_Blog;
