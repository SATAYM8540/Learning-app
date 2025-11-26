
import React, { useEffect, useState } from "react";
import "./cookie.css";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const setConsent = (value) => {
    // store consent for 180 days
    document.cookie =
      "cookie_consent=" +
      value +
      "; max-age=" +
      60 * 60 * 24 * 180 +
      "; path=/; SameSite=Lax";
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-text">
        We use cookies to improve your experience on CodingSikho. You can accept
        or decline non-essential cookies.
      </div>

      <div className="cookie-actions">
        <button
          className="cookie-btn cookie-btn-secondary"
          onClick={() => setConsent("declined")}
        >
          Decline
        </button>
        <button
          className="cookie-btn cookie-btn-primary"
          onClick={() => setConsent("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
