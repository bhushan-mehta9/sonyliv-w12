import '@/styles/globals.scss';
import { getConfigApiAfterLogin, generateToken } from "@/lib/app";

export default function App({ Component, pageProps }) {

  if(typeof window !== "undefined" && !localStorage.getItem('token')){
    generateToken()
  }

  if(typeof window !== "undefined" && localStorage.getItem('accessToken')){
    let commonData = getConfigApiAfterLogin();
    pageProps = {...pageProps, ...commonData};
  }

  return <Component {...pageProps} />
}
