import SignIn from "@/components/SignIn/SignIn";

const { default: ConfirmOtp } = require("@/components/ConfirmOtp/ConfirmOtp");

function TestLight() {
    return <>
        <SignIn />
    </>
}

export default TestLight;