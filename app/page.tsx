"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import Auth from "@/components/Auth";
import TodoList from "@/components/TodoList";
import AvatarUpload from "@/components/AvatarUpload";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  async function updateProfile(avatarUrl: string) {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: session?.user.id,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      if (profile) setProfile({ ...profile, avatar_url: avatarUrl });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!session ? (
        <Auth />
      ) : (
        <div className="flex-1 container mx-auto max-w-2xl py-8 px-4">
          <div className="mb-8">
            <AvatarUpload
              url={profile?.avatar_url || null}
              onUpload={(url) => updateProfile(url)}
            />
          </div>
          <TodoList />
        </div>
      )}
    </div>
  );
}
