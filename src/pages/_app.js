import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
export default function App({ Component, pageProps }) {
  <Provider store={store}>
    return <Component {...pageProps} />;
  </Provider>;
}
