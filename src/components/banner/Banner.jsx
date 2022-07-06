// Imports
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import BannerCanvas from "./bannerCanvas/BannerCanvas";
import "./banner.scss";

export default function Banner() {
	const { currentTheme } = useSelector((state) => state.colorSlice);

	useEffect(() => {
		let textColor = currentTheme === "dark" ? "#ffffff" : "#000000";

		document.documentElement.style.setProperty("--textColor", textColor);

		console.log(currentTheme);
		console.log(textColor);
	}, [currentTheme]);

	const containerVariant = {
		initial: { y: 800 },
		animate: {
			y: 0,
			transition: {
				duration: 2,
				staggerChildren: 0.2,
			},
		},
	};
	const childVariant = {
		initial: { y: 800 },
		animate: {
			y: 0,
			transition: {
				duration: 1,
				ease: [0.6, 0.05, -0.01, 0.9],
			},
		},
	};

	return (
		<section className="banner">
			<video
				className="banner__video"
				loop
				autoPlay
				src={require("../../assets/video/video.mp4")}
			></video>

			<BannerCanvas />

			<h2 className="banner__title" data-scroll data-scroll-speed="3">
				<motion.div
					variants={containerVariant}
					initial="initial"
					animate="animate"
				>
					<motion.span variants={childVariant}>
						I <br /> build <br /> things
					</motion.span>
					<br />
					<motion.span variants={childVariant}>for the web.</motion.span>
				</motion.div>
			</h2>
		</section>
	);
}
