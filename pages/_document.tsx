import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
