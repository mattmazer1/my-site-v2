/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			margin: {
				toph: "30vh",
				tops: "30vh",
				leftw: "1vw",
			},

			colors: {
				darkMode: "#0F1D34",
			},
		},
	},
	plugins: [],
};
