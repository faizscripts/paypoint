import {useEffect} from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import '../styles/globals.scss';
import "bootstrap/dist/css/bootstrap.min.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.bootstrap = require('bootstrap');
  }, [])
  return (
      <>
          <Head>
              <title>Paypoint</title>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <meta name="format-detection" content="telephone=no"/>
              <meta name="description" content="Send money in a safe, reliable and robust system at a minimal cost"/>
              <meta name="keywords" content="money, mpesa, paypoint, safe, reliable, minimal cose"/>
              <meta name="author" content="Faiz Ahmed"/>
          </Head>
        <Navbar/>
        <Component {...pageProps} />
      </>
      )
}

export default MyApp
