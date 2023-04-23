import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document { // Maintains Document properties with our stylesheet and layout
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.0/css/bootstrap.min.css" // External style sheet link
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

export default MyDocument;
