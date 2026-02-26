// import React from 'react'

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Bot, CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type Status = "verifying" | "success" | "error";

const VerifyEmailPage = () => {

    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<Status>("verifying");
    const [errorMessage, setErrorMessage] = useState("");
    const token = searchParams.get("token");


const mutation = useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: () => {
      setStatus("success");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setStatus("error");
      setErrorMessage(error.message || "Invalid or expired token.");
    },
  });

  useEffect(() => {
    if(token) {
        mutation.mutate(token);
    }
  }, []);

  if(!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">ReviewBot</span>
            </Link>

            <div className="space-y-4">
                <XCircle className="w-12 h-12 text-destructive mx-auto" />
                <h1 className="text-2xl font-bold tracking-tight">Verification failed</h1>
                <p className="text-muted-foreground text-sm">Invalid verification link.</p>
                <Button asChild variant="outline" className="w-full gap-2 mt-4">
                <Link to="/auth">Back to Sign In</Link>
                </Button>
            </div>
        </motion.div>
      </div>
    )
  }





  return (
   <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">ReviewBot</span>
        </Link>
        {status === "verifying" && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
            <h1 className="text-2xl font-bold tracking-tight">Verifying your email…</h1>
            <p className="text-muted-foreground text-sm">Please wait while we confirm your account.</p>
          </div>
        )}
        {status === "success" && (
          <div className="space-y-4">
            <CheckCircle className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-2xl font-bold tracking-tight">Email verified!</h1>
            <p className="text-muted-foreground text-sm">Your account is confirmed. You can now sign in.</p>
            <Button asChild className="w-full gap-2 mt-4">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}
        {status === "error" && (
          <div className="space-y-4">
            <XCircle className="w-12 h-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold tracking-tight">Verification failed</h1>
            <p className="text-muted-foreground text-sm">{errorMessage}</p>
            <Button asChild variant="outline" className="w-full gap-2 mt-4">
              <Link to="/auth">Back to Sign In</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default VerifyEmailPage