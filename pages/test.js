import SignIn from "@/components/SignIn/SignIn";
import ConfirmOtp from "@/components/ConfirmOtp/ConfirmOtp";
import Head from "next/head";

const { default: ConfirmOtp } = require("@/components/ConfirmOtp/ConfirmOtp");

function TestLight() {
    return <>
        <Head>
        <title>Player Page</title>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=" Player page"
        />
      </Head>
    <ConfirmOtp />
    </>
}

export default TestLight;