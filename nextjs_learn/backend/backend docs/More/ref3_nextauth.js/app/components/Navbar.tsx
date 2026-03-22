"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#111",
        color: "#fff",
      }}
    >
      <span>MyApp</span>

      <div>
        {status === "loading" && <span>Loading...</span>}

        {status === "unauthenticated" && (
          <button onClick={() => signIn("github")}>Sign In</button>
        )}

        {status === "authenticated" && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="avatar"
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%", marginRight: "8px" }}
                />
              ) : (
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#555",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                  }}
                >
                  {session.user?.name?.[0] ?? "?"}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%",
                  background: "#222",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                <button
                  onClick={() => signOut()}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    color: "#fff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
