"use client";

import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFirebaseApp, useSigninCheck } from "reactfire";

import { AppRoute, AuthRoutes } from "@/constants/route";

import { LogoutIcon, LoginIcon } from "../icon/Icon";

export const AuthButtons = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const auth = getAuth(useFirebaseApp());
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        if (AuthRoutes.some((route) => pathname.startsWith(route))) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      {signInCheckResult?.signedIn ? (
        <LogoutIcon
          className="w-9 h-9 cursor-pointer"
          onClick={handleSignOut}
        />
      ) : (
        // <Dropdown
        //   anchor={
        //     <Image
        //       className="cursor-pointer"
        //       alt="Home"
        //       src="/icon/emoji-funny-square.svg"
        //       width={36}
        //       height={36}
        //     />
        //   }
        // >
        //   <DropdownItem>
        //     <div className="text-center font-bold">Profile</div>
        //   </DropdownItem>
        //   <DropdownItem>
        //     <div className="text-center font-bold">Logout</div>
        //   </DropdownItem>
        // </Dropdown>
        <Link href={AppRoute.AUTH.LOGIN}>
          <LoginIcon className="w-9 h-9 cursor-pointer" />
        </Link>
      )}
    </>
  );
};
