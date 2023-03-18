import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../components/header";

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

const DefaultSite: React.FC = () => {

  return (
    <ThemeProvider theme={mdTheme}>
      <Header />
    </ThemeProvider>
  );
};

export default DefaultSite;
