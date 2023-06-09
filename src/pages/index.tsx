import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import IconLink from "@/components/iconLink";
import moment from "moment";
import "moment-timezone";
import { useEffect } from "react";

export async function getStaticProps() {
	return {
		props: {},
	};
}

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

const getDateTime = (): { date: string; time: string } => {
	const now = moment().tz("Pacific/Auckland");
	const localDate = now.format("DD/MM/YY");
	const localTime = now.format("HH:mm");

	return { date: localDate, time: localTime };
};

const postVisit = async (): Promise<void> => {
	let ip = await getIp();

	const postData = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			data: {
				ip: ip,
				date: getDateTime().date,
				time: getDateTime().time,
			},
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
	let currentDate: Date = new Date();
	let year: number = currentDate.getFullYear();
	useEffect(() => {
		postVisit();
	}, []);

	return (
		<>
			<div className=" flex flex-col flex-wrap items-center sm:mt-toph mt-tops lg:ml-leftw ml-10 mr-10 mb-14">
				<div className="ml-justify-start">
					<h1 className="sm:text-4xl text-3xl">Hey! I'm Matt.</h1>

					<div>
						<h2 className="mt-5 sm:text-lg text-md">
							{" "}
							I'm a software developer.
						</h2>
						<h3 className="mt-5 sm:text-lg text-md max-w-5xl">
							I have a passion for building software that can be used to solve
							problems.
							<br /> My skills and interests lies in backend technologies and
							system design. Currently, I am looking for a full time position in
							backend development. I can also do full stack development. <br />I
							last worked on a p2p encrypted communications protocol at Sylo.
							Feel free to contact me!
						</h3>
						<div className="flex flex-row flex-wrap justify-start content-center mt-3 text-2xl">
							<IconLink
								link={"https://github.com/mattmazer1"}
								icon={faGithub}
							/>

							<IconLink
								link={"https://www.linkedin.com/in/matt-mazer/"}
								icon={faLinkedin}
							/>

							<IconLink
								link={"mailto:mattmazerdev@gmail.com"}
								icon={faEnvelope}
							/>
						</div>
					</div>
					<footer className="mt-2 text-sm text-gray-300">
						Copyright © {year}, Matt Mazer
					</footer>
				</div>
			</div>
		</>
	);
}
