import Heading from "./elements/Heading";
import HowCard from "./elements/HowCard";

function How() {
    return(
        <div id="how">
            <Heading text="How it works"/>
            <div className="row mb-5">
                <HowCard src="register" title="Register for an account" description="This will also store records of your previous top ups, transfers and withdrawals." />
                <HowCard src="topup" title="Top up your balance" description="Add funds to your account wallet through MPESA and transact seamlessly on the platform." />
                <HowCard src="send" title="Send money" description="Transfer money from your wallet to other registered users on the platform with a single click." />
                <HowCard src="withdraw" title="Withdraw" description="Exchange your Paypoint balance for cash from Paypoint agents or transfer to your MPESA account. " />
            </div>
        </div>
    )
}

export default How