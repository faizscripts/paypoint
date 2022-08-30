import {useEffect} from "react";
import Head from "next/head";
import '../styles/globals.scss';
import "bootstrap/dist/css/bootstrap.min.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.bootstrap = require('bootstrap');
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
