"use client"
import Header from "@/components/Header";
const RootLayout = ({ children}: any) => {
  return (
    <html lang="en">
      <body >
        <Header/>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;