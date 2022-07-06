// To use gsap with locomotive scroll, we have to use scroller proxy provided by gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import locomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Register scroll trigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerProxy = () => {
	const disableScrolling = useSelector(
		(state) => state.disableScrollingSlice.disableScrolling
	);

	useEffect(() => {
		let locoScroll = null;
		const scrollEl = document.querySelector(".App");

		locoScroll = new locomotiveScroll({
			el: scrollEl,
			smooth: true,
			smartphone: {
				smooth: true,
				multiplier: 0.5,
			},
			multiplier: 0.5,
			class: "is-reveal",
		});

		locoScroll.on("scroll", () => {
			ScrollTrigger.update();
		});

		ScrollTrigger.scrollerProxy(scrollEl, {
			scrollTop(value) {
				return arguments.length
					? locoScroll.scrollTo(value, 0, 0)
					: locoScroll.scroll.instance.scroll.y;
			},
			scrollLeft(value) {
				if (locoScroll) {
					return arguments.length
						? locoScroll.scrollTo(value, 0, 0)
						: locoScroll.scroll.instance.scroll.x;
				}
				return null;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
			pinType: scrollEl.style.transform ? "transform" : "fixed",
		});

		const lsUpdate = () => {
			locoScroll.update();
		};

		ScrollTrigger.addEventListener("refresh", lsUpdate);
		ScrollTrigger.refresh();

		// if (disableScrolling) {
		// 	locoScroll.stop();
		// 	// ScrollTrigger.disable();
		// } else {
		// 	locoScroll.start();
		// 	// ScrollTrigger.enable();
		// }

		return () => {
			ScrollTrigger.removeEventListener("refresh", lsUpdate);
			locoScroll.destroy();
			// locoScroll = null;
		};
	}, []);

	return null;
};

export default ScrollTriggerProxy;
