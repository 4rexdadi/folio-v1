// import
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import "./projects.scss";
import { projectData } from "../../data/projectData";

import useOnScreen from "../../hooks/useOnScreen";
import { setCurrentColor, setCurrentTheme } from "../../store/colorSlice";

function Projects() {
	// custom intersection observer
	const projectRefs = useRef([]);
	const projectChildrenOnScreen = useOnScreen(projectRefs, 0.5);
	const { isIntersecting, IntersectingElement } = projectChildrenOnScreen;

	// get current color and set current color
	const { currentColor } = useSelector((state) => state.colorSlice);
	const { currentTheme } = useSelector((state) => state.colorSlice);
	const dispatch = useDispatch();

	// horizontal scrolling initialization
	gsap.registerPlugin(ScrollTrigger);
	const horizontalScrollRef = useRef(null);
	const projectsOnScreen = useOnScreen(horizontalScrollRef, 0.05);

	useEffect(() => {
		// if (!projectsOnScreen.isIntersecting) dispatch(setCurrentColor("black"));
		// if (projectsOnScreen.isIntersecting) {
		// 	dispatch(setCurrentTheme("light"));
		// } else dispatch(setCurrentTheme("dark"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectsOnScreen]);

	useEffect(() => {
		// Horizontal Scrolling
		let horizontalScrollElement = horizontalScrollRef.current;
		let totalWidth = horizontalScrollElement.offsetWidth;

		let t1 = gsap.timeline();

		t1.to(horizontalScrollElement, {
			scrollTrigger: {
				trigger: horizontalScrollElement,
				start: "top top",
				end: totalWidth,
				scroller: ".App", // locomotive element
				scrub: true,
				pin: true,
				// markers: true,
			},
			// we have to increase scrolling height of this section same as the scrolling element width
			x: -(totalWidth - window.innerWidth),
			ease: "none",
		});

		ScrollTrigger.refresh();

		return () => {
			// Let's clear instances
			t1.kill();
			t1.clear();
			ScrollTrigger.revert();
		};
	}, []);

	useEffect(() => {
		if (currentColor) {
			document.documentElement.style.setProperty(
				"--homepageColor",
				currentColor
			);
		}
	}, [currentColor]);

	useEffect(() => {
		if (isIntersecting) {
			let allProjects = projectRefs.current;
			let onScreenEl = IntersectingElement.target;

			allProjects.forEach((project) => {
				if (project.id === onScreenEl.id) {
					let backgroundColor = onScreenEl.attributes.background.value;

					dispatch(setCurrentColor(backgroundColor));
				}

				if (project.id === "0" || project.id === "1") {
					dispatch(setCurrentTheme("dark"));
					console.log("FIRST");
				} else dispatch(setCurrentTheme("light"));
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectChildrenOnScreen]);

	return (
		<motion.section className="projects" ref={horizontalScrollRef}>
			{projectData.map((project, index) => {
				return (
					<div
						key={index}
						id={index}
						background={project.color.primary}
						ref={(element) => (projectRefs.current[index] = element)}
						className="projects__project"
					></div>
				);
			})}
		</motion.section>
	);
}

export default Projects;
