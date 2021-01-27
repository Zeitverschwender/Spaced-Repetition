import React from "react";
import { Redirect, useLocation } from "react-router-dom";

export default function LoginRedirect() {
  const query = new URLSearchParams(useLocation().search);
  localStorage.setItem("loginToken", query.get("token"));
  return <Redirect to="/" />;
}
