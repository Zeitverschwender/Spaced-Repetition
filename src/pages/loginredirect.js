import React from "react";
import { Redirect, useLocation } from "react-router-dom";

import Backend from "../services/backend";

export default function LoginRedirect() {
  new Backend().setToken(
    new URLSearchParams(useLocation().search).get("token")
  );
  return <Redirect to="/" />;
}
