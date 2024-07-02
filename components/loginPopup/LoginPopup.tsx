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
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function LoginPopup() {
  const [loader, setLoader] = useState<string>("");
  async function signinHandler(type: string) {
    setLoader(type);
    await signIn(type, { redirect: false });
    setLoader("");
  }

  const { showLogin, toggleLogin } = useAppProvider();

  return (
    <>
      <Dialog open={showLogin} onOpenChange={toggleLogin}>
        <DialogContent className="sm:max-w-md md:w-2/4">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              {constants.landingPage.login_title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {constants.loginProvider?.map((item) => (
              <Button
                className={`text-accent-foreground  px-2 py-3 rounded-lg ${
                  loader && "cursor-not-allowed"
                }`}
                key={item.code}
                onClick={() => {
                  signinHandler(item.code);
                }}
                disabled={!!loader}
                variant="secondary"
              >
                {loader == item.code ? (
                  <LoaderCircle className="animate-spin absolute" />
                ) : (
                  <>
                    <item.icon className="mr-2 h-8 w-8 md:h-6 w-6" />
                    <span className="mr-1 md:hidden">{item.labelPrefix}</span>
                    {item.label}
                  </>
                )}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
