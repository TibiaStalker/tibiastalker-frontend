import Divider from "@mui/material/Divider";
import Head from "next/head";
import * as React from "react";

import FAQ from "~/components/marketing/FAQ";
import Features from "~/components/marketing/Features";
import Hero from "~/components/marketing/Hero";
import Highlights from "~/components/marketing/Highlights";
import LogoCollection from "~/components/marketing/LogoCollection";
import Pricing from "~/components/marketing/Pricing";
import Testimonials from "~/components/marketing/Testimonials";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>New look</title>
      </Head>
      <Hero />
      <LogoCollection />
      <Features />
      <Divider />
      <Testimonials />
      <Divider />
      <Highlights />
      <Divider />
      <Pricing />
      <Divider />
      <FAQ />
      <Divider />
    </>
  );
}
