// Imports
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/loader/Loader";
import CustomCursor from "./subComponent/CustomCursor";
import ScrollTriggerProxy from "./subComponent/ScrollTriggerProxy";

// Pages
import Home from "./pages/homePage/Home";
import About from "./pages/aboutPage/About";
import Lab from "./pages/labPage/Lab";
import Contact from "./pages/contactPage/Contact";
import Header from "./components/header/Header";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<>
			<CustomCursor />
			<ScrollTriggerProxy />
			<main className="App" data-scroll-container>
				<AnimatePresence>
					<Router>
						{isLoading ? (
							<Loader />
						) : (
							<>
								<Header />
								<Routes>
									<Route index path="/" element={<Home />} />

									<Route path="/about" element={<About />} />

									<Route path="/lab" element={<Lab />} />

									<Route path="/contact" element={<Contact />} />
								</Routes>
							</>
						)}
					</Router>
				</AnimatePresence>
			</main>
		</>
	);
}

export default App;
