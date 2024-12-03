"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import DataTable from "./data-table";
import rtlPlugin from "stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Providers } from "@/redux/provider";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn, Arial, sans-serif",
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function Main() {
  return (
    <Providers>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box className="mt-5">
              <DataTable />
            </Box>
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </Providers>
  );
}
