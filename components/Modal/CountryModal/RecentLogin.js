import React from "react";
import style from "./RecentLogin.scss";
import withStyles from "isomorphic-style-loader/withStyles";
import Crown from "../../../srcAssets/images/next/crown.png";
import Delete from "../../../srcAssets/images/next/deleteIcon.png";

function RecentLogin(props) {
  const arr = ["945****949", "725****038", "845****949", "725****038"];
  return (
    <div className="wrapper">
      {arr.map((item) => (
        <div className="container">
          <div className="contact-container">
            <div className="contact">
              <div className="contactNo">+91 {item}</div>
              <div className="last-login">Last Login: 10th April</div>
            </div>
            <div className="subscribedCta">
              <img src={Crown} className="ctaImg" />
              <span className="cta-text">Subscriber</span>
            </div>
          </div>

          <div className="delete">
            <img src={Delete} />
          </div>
        </div>
      ))}
      <div className="login-text">Login with another account</div>
    </div>
  );
}

export default withStyles(style)(RecentLogin);
