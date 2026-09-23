"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="flex-1">
          <Link
            href="/"
            className="brand"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <span className="brand-mark">R</span>
            Reelspace
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="profile-menu">
            <div tabIndex={0} role="button" className="profile-trigger">
              {session?.user?.email?.slice(0, 1).toUpperCase() || "?"}
            </div>
            <ul tabIndex={0} className="profile-dropdown">
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>

                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        Upload a reel
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}