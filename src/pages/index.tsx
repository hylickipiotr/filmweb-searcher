import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

const Home: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace("/api/");
    }
  }, [router]);

  return null;
};

export default Home;
