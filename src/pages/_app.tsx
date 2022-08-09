import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";
import "../firebase";

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "trpc/routers/_app";

import ToastifyContainer from "components/Toastify/container";
import { RootContext } from "context";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-slider/assets/index.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import "../styles/responsive.scss";

import { RouteGuard } from "components/Auth/guard";
import { LAYOUTS, PageWithLayoutType } from "components/Layout";
import AdminLayout from "components/Layout/Admin";

type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  // Get layout based on component
  const Layout = LAYOUTS[Component.layout] || AdminLayout;

  return (
    <>
      <Provider store={store}>
        <ToastifyContainer />
        <RootContext>
          <Layout>
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </Layout>
        </RootContext>
      </Provider>
    </>
  );
};

const IS_SERVER = typeof window === "undefined";

const getToken = () => {
  if (IS_SERVER) return "";
  return localStorage.getItem("jwt") || "";
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      headers() {
        return {
          Authorization: getToken()
        };
      },
    };

    /**
     * @link https://react-query.tanstack.com/reference/QueryClient
     */
    // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
