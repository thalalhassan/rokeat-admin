import React from "react";
import Header from "./header";
import Footer from "./footer";

/**
 * Layout component  to add header and footer to all pages
 * @param props
 * @returns
 */
export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
