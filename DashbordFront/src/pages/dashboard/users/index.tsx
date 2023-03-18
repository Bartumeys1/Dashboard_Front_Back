import React, { useEffect } from "react";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Loader from "../../../components/loader";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Button } from "@mui/material";
import { Link, } from 'react-router-dom'


  const Users: React.FC<any> = () => {
    const { GetAllUsers , SetCurrentUser  , RemoveUser} = useActions();
  const { loading, allUsers  } = useTypedSelector((state) => state.UserReducer);

  let rows: any[] = allUsers;

  const GetCurrentUser = (user: any) =>{
    SetCurrentUser(user);
  }

  useEffect(() => {
    GetAllUsers();
  }, []);

  const columns: GridColDef[] = [
    //{ field: "id", headerName: "Id", width: 270 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "surname", headerName: "Surname", width: 230 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "emailConfirmed", headerName: "Confirmed email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to="/dashboard/edit" style={{textDecoration: "none"}}><Button variant="contained"  onClick ={()=>{GetCurrentUser(params.row)}}>Edit</Button></Link>
          );
        }
      },
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        renderCell: (params) => {
          return (
            <Button variant="contained" onClick ={()=>{
              if(window.confirm(`Delete ${params.row.email}?`))
              {
                 DeleteUser(params.row.email);
              }
             }}>Delete</Button>
            );
          }
        },
    ];
     

     async function DeleteUser(email:string)
     {
      await RemoveUser(email);
      await GetAllUsers();
     } 
  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button 
      variant="contained"
      sx={{mt:2 , mb:2 , left:'90%'}}
      component={Link} to="registration"
      >
        Registretin User
        </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        //checkboxSelection
      />
    </div>
  );
};

export default Users;
