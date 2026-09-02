import { Suspense } from "react";
import SignInForm from "./SignInForm"; // or your component path

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white text-xs">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}