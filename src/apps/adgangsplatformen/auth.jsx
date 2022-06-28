import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetch from "unfetch";
import {
  getToken,
  setToken,
  TOKEN_LIBRARY_KEY,
  TOKEN_USER_KEY
} from "../../core/token";
import {
  setStatusAuthenticated,
  setStatusUnauthenticated
} from "../../core/user.slice";

const ORIGIN = window.location.origin;
const PATHNAME = window.location.pathname.replace("/iframe.html", "/");

const CLIENT_ID = process.env.STORYBOOK_CLIENT_ID;
const REDIRECT_URL = `${ORIGIN}${PATHNAME}?path=/story/sb-utilities-adgangsplatformen--sign-in`;

function Auth() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.user.status);

  const handleCleanUp = useCallback(() => {
    window.sessionStorage.removeItem(TOKEN_USER_KEY);
    dispatch(setStatusUnauthenticated());
  }, [dispatch]);

  const handleSignIn = () => {
    window.parent.location.href = `https://login.bib.dk/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
  };

  const handleSignOut = () => {
    handleCleanUp();
    const token = getToken(TOKEN_USER_KEY);
    window.parent.location.href = `https://login.bib.dk/logout/?access_token=${token}`;
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      return;
    }

    fetch("https://login.bib.dk/oauth/token", {
      method: "POST",
      headers: {},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: "secret",
        redirect_uri: REDIRECT_URL
      })
    })
      .then((res) => res.json())
      .then((res) => {
        // eslint-disable-next-line camelcase
        if (!res?.access_token) {
          throw res;
        }

        // We need to make the token available in two contexts:
        // 1. Subsequent browser reloads. Consequently we set the token into sessionstorage, which are read by preview.js.
        window.sessionStorage.setItem(TOKEN_USER_KEY, res.access_token);
        // 2. Current storybook context.
        setToken(TOKEN_USER_KEY, res.access_token);
        setToken(TOKEN_LIBRARY_KEY, res.access_token);

        dispatch(setStatusAuthenticated());
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        handleCleanUp();
      });
  }, [dispatch, handleCleanUp]);

  return (
    <div style={{ width: "300px" }}>
      <h2>Adgangsplatformen</h2>
      <h5>
        Status:
        {status === "authenticated" ? (
          <span style={{ color: "green" }}> Signed in</span>
        ) : (
          <span style={{ color: "red" }}> Signed out</span>
        )}
      </h5>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: 10
        }}
      >
        <button type="button" onClick={handleSignIn} style={{ width: "100%" }}>
          Sign in
        </button>

        <button type="button" onClick={handleSignOut} style={{ width: "100%" }}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Auth;
