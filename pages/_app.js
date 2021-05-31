import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import useIsClient from "../utils/useIsClient"

function MyApp({ Component, pageProps }) {
  const isClient = useIsClient();
  return (
    <>
      {isClient && (
        <>
          <TopNav />
          <Component {...pageProps} />
        </>
      )}
    </>
  );

}

export default MyApp;
