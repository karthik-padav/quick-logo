"use client";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useAppProvider } from "@/components/app-provider";
import { Google, Wine } from "@/assets/icons";

export default function LoginPopup() {
  async function signinHandler(type: string) {
    const resp = await signIn(type, { redirect: false });
    console.log("123321");
  }

  function setIsDialogOpen() {}
  const { showLogin, toggleLogin } = useAppProvider();

  return (
    <>
      <Dialog open={showLogin} onOpenChange={toggleLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Join Figma for free design tools, templates, and more.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Button
              onClick={() => {
                signinHandler("github");
              }}
              variant="secondary"
            >
              Sign in with GitHub
            </Button>
            <Button
              onClick={() => {
                signinHandler("google");
              }}
              variant="secondary"
            >
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
