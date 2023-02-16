import SignIn from "@/components/SignIn/SignIn";

const { default: ConfirmOtp } = require("@/components/ConfirmOtp/ConfirmOtp");

function TestLight() {
    return <>
        <ConfirmOtp />
    </>
}

export default TestLight;