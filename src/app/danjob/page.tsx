import React from "react";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";

type Props = {};

const DanjobPage = async (props: Props) => {
  const isPro = await checkSubscription();

  const proMessage = (
    <>
      <iframe src="https://danjob.com/" name="myiFrame" height="720px" width="1280px"></iframe>
    </>
  );

  const freeMessage = (
    <>
      <h2 style={{ marginBottom: '10px' }}>You are currently a Free user.</h2>
      <p>You need to subscribe to access the feature of creating custom Cover Letter and Linkedin Message:</p>
      <br />
      <p style={{ marginTop: '10px' }}>Subscribe now to unlock your full potential.</p>
    </>
  );

  return (
    <div style={{height:"100%", width: "100%"}} className="py-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold">DanJob Subscription</h1>
      <div >
        {isPro ? proMessage : freeMessage}
      </div>
      {/*<SubscriptionButton isPro={isPro} />*/}
    </div>
  );
};

export default DanjobPage;
