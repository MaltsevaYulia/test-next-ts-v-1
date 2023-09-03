import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import supabase from "../supabaseConfig/supabaseClient";
import Profile from "./Profile.tsx/Profile";
import { Box, Button } from "@mui/material";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // handleAuthChange(event, session)
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/posts");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    // return () => {
    //   authListener.unsubscribe()
    // }
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      setAuthenticatedState("authenticated");
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header>
        <Box
          sx={{
            display: "flex",
            gap: "100px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <nav>
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Link href="/">Home</Link>
              <Link href="/register">Register</Link>
              <Link href="/sing-in">Sing in</Link>
              {authenticatedState === "authenticated" && (
                <>
                  <Link href="/users">Users List</Link>
                  <Link href="/posts">Posts</Link>
                </>
              )}
            </Box>
          </nav>
          {authenticatedState === "authenticated" && user && (
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Profile name={user.user_metadata.name} email={user.email} />
              <Button variant="contained" onClick={handleLogOut}>
                LogOut
              </Button>
            </Box>
          )}
        </Box>
      </header>
      {children}
    </div>
  );
};

export default Layout;
