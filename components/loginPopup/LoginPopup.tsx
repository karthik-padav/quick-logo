"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useAppProvider } from "@/components/app-provider";
import constants from "@/lib/constants";

export default function LoginPopup() {
  async function signinHandler(type: string) {
    await signIn(type, { redirect: false });
  }

  const { showLogin, toggleLogin } = useAppProvider();

  return (
    <>
      <Dialog open={showLogin} onOpenChange={toggleLogin}>
        <DialogContent className="sm:max-w-md md:w-2/4">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Join Figma for free design tools, templates, and more.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {constants.loginProvider?.map((item) => (
              <Button
                className={`text-accent-foreground hover:bg-red-500 bg-red-400 text-white px-2 py-3 rounded-lg`}
                key={item.code}
                onClick={() => {
                  signinHandler(item.code);
                }}
                variant="secondary"
              >
                <item.icon className="mr-2 h-8 w-8 md:h-6 w-6" />
                <span className="mr-1 md:hidden">{item.labelPrefix}</span>
                {item.label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
