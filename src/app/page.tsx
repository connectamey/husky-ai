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
        Learning AI Platform
      </h1>
      <p
        style={{
          maxWidth: "600px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        The integration of artificial intelligence into education is
        transforming the landscape of learning. AI-driven platforms can
        personalize the learning experience, provide adaptive feedback, and
        create interactive learning environments that engage students in new and
        exciting ways. Additionally, AI tools can analyze vast amounts of
        educational data, helping educators identify learning patterns and
        tailor instruction to individual needs. This enables a more inclusive
        educational approach, accommodating diverse learning styles and
        abilities. Furthermore, AI can automate administrative tasks, allowing
        teachers to focus more on teaching and less on paperwork. AI's role in
        creating virtual simulations and educational games also presents
        innovative methods for complex problem-solving and critical thinking,
        making learning more immersive and effective. As AI technology continues
        to evolve, its potential to revolutionize education and foster a more
        dynamic, responsive, and student-centered learning environment grows
        increasingly evident.
      </p>
      <Link href="/create">
        <Button style={{ fontSize: "20px", padding: "10px 20px", zIndex: 1 }}>
          Create Yours Now
        </Button>
      </Link>
    </div>
  );
}
