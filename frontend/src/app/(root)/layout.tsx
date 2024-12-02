"use client";
import { Sidebar } from "@/src/components/sidebar/sidebar";
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
} from "@/src/gql/graphql";
import { CREATE_PROFILE } from "@/src/graphql/mutations/CreateProfile";
import { useProfileStore } from "@/src/store/profileStore";
import { useMutation } from "@apollo/client";
import { useSession } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

import React, { useEffect } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = useProfileStore((state) => state.profile);

  const { session } = useSession();

  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});
  const { isSignedIn } = useAuth();
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    if (!isSignedIn) setProfile(null);
  }, [isSignedIn, setProfile]);
  useEffect(() => {
    const createProfileFn = async () => {
      if (!session?.user) return;
      try {
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user.username || "",
              imageUrl: session?.user.imageUrl,
            },
          },
          onCompleted: (data) => {
            setProfile(data.createProfile);
          },
          refetchQueries: ["GetServers"],
        });
      } catch (err) {
        console.log("Error creating profile in backend: ", err);
      }
    };
    if (profile?.id) return;
    createProfileFn();
  }, [session?.user, profile?.id]);

  return (
    <main className="min-h-screen">
      <Sidebar />
      {children}
    </main>
  );
}
