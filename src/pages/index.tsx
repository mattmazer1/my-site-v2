import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import IconLink from "@/components/iconLink";
import { useEffect } from "react";

const getIp = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    } else {
      console.error("could not fetch ip", response.status);
      return null;
    }
  } catch (error) {
    console.error("could not fetch ip:", error);
    return null;
  }
};

const postVisit = async (): Promise<void> => {
  let ip = await getIp();

  const postData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ip: ip,
    }),
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POST_REQUEST as string,
      postData
    );
    await response.json();

    if (!response.ok) {
      throw new Error("could not post visit data");
    }
  } catch (error: any) {
    console.log(error);
  }
};

export default function Home() {
  useEffect(() => {
    postVisit();
  }, []);

  return (
    <>
      <div className=" flex flex-col flex-wrap justify-center items-center sm:mt-toph mt-tops">
        <h1 className="sm:text-4xl text-3xl">Matt Mazer</h1>

        <h2 className="mt-4 sm:text-lg text-sm">Cloud engineer</h2>
        <div className="mt-4 sm:text-6xl text-4xl">
          <IconLink link={"https://github.com/mattmazer1"} icon={faGithub} />

          <IconLink
            link={"https://www.linkedin.com/in/matt-mazer/"}
            icon={faLinkedin}
          />

          <IconLink link={"mailto:mattmazerdev@gmail.com"} icon={faEnvelope} />
        </div>
      </div>
    </>
  );
}
