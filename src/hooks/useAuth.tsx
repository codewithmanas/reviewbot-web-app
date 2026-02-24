import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signOut };
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/auth");
  //   }
  // }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // if (!user) return null;

  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }

  return <>{children}</>;
}
