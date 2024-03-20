

import React from 'react';
import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

type Props = {};

const SettingsPage: React.FC<Props> = async () => {
  const isPro = await checkSubscription();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    padding: '150px',
  };

  const messageBoxStyle: React.CSSProperties = {
    padding: '25px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    maxWidth: '600px',
    textAlign: 'center',
    lineHeight: 1.6,
  };

  const featureList = (
    <ul style={{ marginTop: '20px', textAlign: 'left', listStyleType: 'disc' }}>
      <li>Unlimited generations - create as many courses as you like.</li>
      <br />
      <li>Your education is in your hands, with no limits.</li>
      <br />
      <li>Tier 1 Gpt access tokens to consume and generate a lot of content.</li>
    </ul>
  );
  

  const proMessage = (
    <>
      <h2 style={{ marginBottom: '10px' }}>Congratulations, you are a Pro user!</h2>
      <p>As a Pro user, you have access to the following benefits:</p>
      {featureList}
    </>
  );

  const freeMessage = (
    <>
      <h2 style={{ marginBottom: '10px' }}>You are currently a Free user.</h2>
      <p>You're missing out on the full capabilities that our platform offers. Here's what you could be enjoying:</p>
      {featureList}
      <br />
      <p style={{ marginTop: '10px' }}>Subscribe now to unlock your full potential.</p>
    </>
  );

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '0.5em' }} className="text-3xl font-bold">Settings</h1>
      <div style={messageBoxStyle}>
        {isPro ? proMessage : freeMessage}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;

