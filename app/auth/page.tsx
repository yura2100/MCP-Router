"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"
import { useSignInOauthMutation } from "@/app/auth/_hooks/use-sign-in-oauth-mutation";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import GoogleIcon from "@/public/google.svg";

export default function AuthPage() {
  const { mutate, isPending } = useSignInOauthMutation();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Layers className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to MCP Router</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in to manage your MCP servers</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => mutate({ provider: "google", next })}
              className="w-full flex items-center justify-center"
              disabled={isPending}
              variant="outline"
            >
              <>
                <Image src={GoogleIcon} alt="google" width={256} height={256} className="mr-2 h-4 w-4"/>
                Sign in with Google
              </>
            </Button>
          </CardContent>
          {/*{error && (*/}
          {/*  <CardContent>*/}
          {/*    <p className="text-sm text-destructive text-center">{error}</p>*/}
          {/*  </CardContent>*/}
          {/*)}*/}
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our <Link href="/legal/terms-of-service" className="underline">Terms of Service</Link> and <Link href="/legal/privacy-policy" className="underline">Privacy Policy</Link>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
