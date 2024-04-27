import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Blurred background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: "url(images/ai.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(55, 55, 95, 0.7)",
          zIndex: -1,
        }}
      ></div>

      <h1 style={{ fontSize: "48px", fontWeight: "bold", zIndex: 1 }}>
        Husky AI Platform
      </h1>
      <p
        style={{
          maxWidth: "800px",
          textAlign: "left",
          zIndex: 1,
        }}
      >
        "Revolutionize learning with AI: Personalize education, engage
        dynamically, and empower teachers for a future of immersive, effective
        education!"
        <br></br>
        <br></br>
        
          1. Write name of the topic you want to learn.
          <br></br>
          2. Click let's go to see your syllabus
          <br></br>
          3. If syllabus suits you, go ahead and generate your videos
          <br></br>
          4. Start leaarning and answer the questions
          <br></br>
          5. Ask our chatbot, your queries
        
      </p>
      <Link href="/create">
        <Button style={{ fontSize: "20px", padding: "10px 10px", zIndex: 1 }}>
          Create Yours Now
        </Button>
      </Link>
    </div>
  );
}
