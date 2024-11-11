import React from "react";
import "../styles/landing.css";
import { MdMessage } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { MdWallpaper } from "react-icons/md";
import { MdVideocam } from "react-icons/md";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-title">
        <h1>How may I help you today?</h1>
      </div>

      <div className="landing-cards-box">
        <div className="card1">
          <div className="card-icons">
            <MdMessage style={{ fontSize: "30px" }} />
            <MdArrowOutward style={{ fontSize: "30px" }} />
          </div>

          <h1 style={{ width: "80%",paddingInline: "4%" }}>Chat with AI</h1>
        </div>

        <div className="card2-grid">
          <div className="card2 color-bg1">
            <div className="card-icons">
              <MdWallpaper style={{ fontSize: "30px" }} />
              <MdArrowOutward style={{ fontSize: "30px" }} />
            </div>

            <h3 style={{ width: "80%",paddingInline: "4%" }}>Create AI Image</h3>
          </div>
          <div className="card2 color-bg2">
            <div className="card-icons">
                <MdVideocam style={{ fontSize: "30px" }} />
                <MdArrowOutward style={{ fontSize: "30px" }} />

            </div>            
            <h3>Create AI Video</h3>
          </div>
        </div>
      </div>

      <div className="prompt-box">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Quick Prompts</h2>
            <p>See All</p>
        </div>

      </div>
    </div>
  );
}
