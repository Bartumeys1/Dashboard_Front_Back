import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'


const NotFound : React.FC = () => {
    return(
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
           backgroundColor: 'white',
           
        }}
      >
        <Typography variant="h6" sx={{my:0}} >
        The page you’re looking for doesn’t exist.
      </Typography>
        <Typography  variant="h1" style = {{fontWeight:700 , fontSize: '15em'}} sx={{my:0 }}>
            404
        </Typography>
      <Button variant="contained" component={Link} to="/">Back Home</Button>
      </Box>
    )
}

export default NotFound;




