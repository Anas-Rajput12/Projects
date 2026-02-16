// CLIENT-SAFE AUTH FILE
// This file can be used inside Client Components

import { useUser, useAuth, useClerk } from "@clerk/nextjs";

export { useUser, useAuth, useClerk };

export interface SessionData {
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

export const useSession = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const sessionData =
    isLoaded && isSignedIn && user
      ? {
          user: {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            name: user.fullName || user.username || undefined,
          },
        }
      : null;

  return {
    data: sessionData,
    isLoading: !isLoaded,
  };
};

// Optional backward compatibility mocks

export const signIn = {
  email: async () => {
    console.warn(
      "Mock signIn used. Please use Clerk <SignIn /> component instead."
    );
    return {
      error: { message: "Use Clerk SignIn component instead." },
    };
  },
};

export const signUp = {
  email: async () => {
    console.warn(
      "Mock signUp used. Please use Clerk <SignUp /> component instead."
    );
    return {
      error: { message: "Use Clerk SignUp component instead." },
    };
  },
};

export const signOut = async () => {
  console.warn(
    "Mock signOut used. Please use useClerk().signOut() instead."
  );
  return {};
};
