"use client"
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "@/components/Header";

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {/* 🔹 APP LAYOUT */}
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* HEADER */}
          <Header />
          {/* MAIN CONTENT */}
          <Container sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
            {children}
          </Container>
          </Box>
      </body>
    </html>
  );
}

export default RootLayout;