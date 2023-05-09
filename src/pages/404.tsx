import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/");
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-2xl">404 not found</div>
		</div>
	);
};

export default Custom404;
