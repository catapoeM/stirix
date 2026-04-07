const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <h1>Stirix</h1>
        </header>

        {children}
      </body>
    </html>
  );
}

export default RootLayout;