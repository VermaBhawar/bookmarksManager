"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const code = searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      router.replace("/");
    };

    exchange();
  }, [router, searchParams]);

  return <p className="p-6">Signing you in...</p>;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="p-6">Signing you in...</p>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}
