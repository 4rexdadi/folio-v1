// import
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./header.scss";
import { navData } from "../../data/navData";

//Context
import { setCursorType } from "../../store/cursorSlice";
import { setDisableScrolling } from "../../store/disableScrollingSlice";

function Header() {
	const dispatch = useDispatch();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isActive, setIsActive] = useState("home");
	const location = useLocation();

	useEffect(() => {
		// update Locomotive scroll and re-calculate element hight and weight on roughs change
		window.dispatchEvent(new Event("resize"));
	}, [location]);

	useEffect(() => {
		if (isMenuOpen) {
			dispatch(setDisableScrolling(true));
		} else {
			dispatch(setDisableScrolling(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMenuOpen]);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const closeMenuAndSetActive = (index) => {
		setIsMenuOpen(false);
		setIsActive(index);
	};

	const changeLogoToLink = () => {
		if (isActive !== "home") {
			setIsMenuOpen(false);
		}
		setIsActive("home");
	};

	const containerVariants = {
		hidden: { y: -72, opacity: 0 },
		show: {
			y: 0,
			opacity: 1,
			transition: {
				delayChildren: 1,
				staggerChildren: 0.5,
				duration: 1,
				ease: [0.6, 0.05, -0.01, 0.9],
			},
		},
	};

	const childrenVariants = {
		hidden: { scale: 0, opacity: 0 },
		show: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 1,
				ease: [0.6, 0.05, -0.01, 0.9],
				type: "spring",
			},
		},
	};

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className="header"
		>
			<div
				data-scroll
				data-scroll-sticky
				data-scroll-target=".App"
				className="container"
			>
				<nav className={`header__nav ${!isMenuOpen ? "hideNav" : ""}`}>
					<div
						className={
							isMenuOpen ? "header__nav__logo animateLogo" : "header__nav__logo"
						}
						onClick={() => changeLogoToLink()}
					>
						{isActive === "home" ? (
							<p>Adedayo Aturu</p>
						) : (
							<Link className="link" data-replace="Home page" to={"/"}>
								<span>Back Home</span>
							</Link>
						)}
					</div>
					<ul className="header__nav__links">
						{navData.map((nav, index) => {
							return (
								<motion.li
									key={index}
									className={isMenuOpen ? "animateLinks" : ""}
									onClick={() => closeMenuAndSetActive(index)}
									variants={childrenVariants}
								>
									<Link
										className={isMenuOpen ? "animateLinks link" : "link"}
										to={nav.link}
										data-replace={nav.header}
										onMouseOver={() => dispatch(setCursorType("hovered"))}
										onMouseLeave={() => dispatch(setCursorType(""))}
									>
										<span>{nav.header}</span>
									</Link>
								</motion.li>
							);
						})}
					</ul>
				</nav>

				<div
					className={`header__hamburger ${isMenuOpen && "closeHamburger"}`}
					onClick={() => toggleMenu()}
				>
					<span></span>
					<span></span>
				</div>
			</div>
		</motion.section>
	);
}

export default Header;
