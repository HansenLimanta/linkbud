// page to show linkbud page. it will be like the linktree page

import Head from "next/head";
import { useEffect, useState } from "react";
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
      <main className="w-full bg-teal-700">
        <div className="flex h-full flex-col items-center justify-start gap-2 bg-teal-700 px-8 py-20 text-white sm:mx-auto sm:w-96">
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
          <div className="my-4 flex w-full flex-col gap-4 text-black">
            <a href="https://www.instagram.com/hansen_limanta/" target="_blank">
              <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 duration-150 ease-in-out hover:bg-transparent hover:text-white">
                <p className="text-center">Instagram</p>
              </div>
            </a>
            <a href="https://www.instagram.com/hansen_limanta/" target="_blank">
              <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 duration-150 ease-in-out hover:bg-transparent hover:text-white">
                <p className="text-center">LinkedIn</p>
              </div>
            </a>
            <a href="https://www.instagram.com/hansen_limanta/" target="_blank">
              <div className="w-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-3 duration-150 ease-in-out hover:bg-transparent hover:text-white">
                <p className="text-center">TikTok</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
