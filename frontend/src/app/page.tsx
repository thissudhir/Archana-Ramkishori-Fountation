"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
// import Projects from "../components/Projects";
import AboutUs from "./about-us/page";
import Mission from "../components/Mission";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Hero />
        <Mission />
        {/* <AboutUs /> */}
      </Layout>
    </ThemeProvider>
  );
}
