import SignIn from "@/components/SignIn/SignIn";
import ConfirmOtp from "@/components/ConfirmOtp/ConfirmOtp";

const { default: ConfirmOtp } = require("@/components/ConfirmOtp/ConfirmOtp");

function TestLight() {
    return <>
        <ConfirmOtp />
    </>
}

export default TestLight;