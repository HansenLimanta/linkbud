// page to show linkbud page. it will be like the linktree page

import Head from "next/head";
import { useEffect, useState } from "react";
import Background from "~/components/Background";
import LinkButton from "~/components/LinkButton";
export default function Linkbud() {
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    getProfilePicture();
  }, []);

  async function getProfilePicture() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].picture.large);

        setProfilePicture(data.results[0].picture.large);
      });
  }

  return (
    <>
      <Head>
        <title>Linkbud</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-full">
        <div className="flex flex-col items-center justify-start gap-2 px-8 py-20 text-white sm:mx-auto sm:w-96">
          <Background theme="white" />
          <img
            className="h-24 rounded-full"
            src={profilePicture}
            alt="profile picture"
          />
          <h1 className="text-xl font-semibold">Hansen Limanta</h1>
          <h2 className="text-center">
            Description Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eveniet, quas?
          </h2>
          <div className="my-4 flex w-full flex-col gap-4">
            <LinkButton
              name="Instagram"
              theme="white"
              url="https://www.instagram.com/hansen_limanta/"
            />
            <LinkButton
              name="LinkedIn"
              theme="white"
              url="https://www.instagram.com/hansen_limanta/"
            />
            <LinkButton
              name="Tiktok"
              theme="white"
              url="https://www.instagram.com/hansen_limanta/"
            />
          </div>
        </div>
      </main>
    </>
  );
}
