import React, { useEffect } from "react";

const Google = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.substring(1)); // remove #
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken) {
      console.log("Access token:", accessToken);

      // Save it
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken ?? "");

      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);

      window.location.href = "/";
    }
  }, []);

  return <div className="flex items-center justify-center h-screen text-2xl">Signing you in...</div>;
};

export default Google;
