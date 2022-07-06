// Imports
import React, { useEffect, useRef } from "react";

// Contexts
import { useSelector } from "react-redux";

const CustomCursor = () => {
	const { cursorType } = useSelector((state) => state.cursorSlice);

	const cursor = useRef(null);
	const cursorDot = useRef(null);

	const onMouseMove = (event) => {
		const { clientX, clientY } = event;
		cursor.current.style.left = `${clientX}px`;
		cursor.current.style.top = `${clientY}px`;
	};

	const onMouseMoveForDot = (event) => {
		const { clientX, clientY } = event;
		cursorDot.current.style.left = `${clientX}px`;
		cursorDot.current.style.top = `${clientY}px`;
	};

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mousemove", onMouseMoveForDot);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mousemove", onMouseMoveForDot);
		};
	}, []);

	return (
		<>
			<div className={`cursor ${cursorType} `} ref={cursor}></div>
			<div className="cursorDot" ref={cursorDot}></div>
		</>
	);
};

export default CustomCursor;
