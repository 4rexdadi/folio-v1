import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";

//Context
import { setCursorType } from "../../../store/cursorSlice";

function BannerCanvas() {
	// get current color and set current color
	const { currentTheme } = useSelector((state) => state.colorSlice);
	const dispatch = useDispatch();
	let canvas = useRef(null);

	const size = useWindowSize();

	useEffect(() => {
		let renderingElement = canvas.current;

		// create an offscreen canvas only for the drawings
		let drawingElement = renderingElement.cloneNode();
		let drawingCtx = drawingElement.getContext("2d");
		let renderingCtx = renderingElement.getContext("2d");
		let lastX;
		let lastY;
		let moving = false;

		renderingCtx.globalCompositeOperation = "source-over";
		renderingCtx.fillStyle = currentTheme === "dark" ? "#000000" : "#ffffff";
		renderingCtx.fillRect(0, 0, size.width, size.height);

		const onMouseOver = (ev) => {
			moving = true;
			lastX = ev.pageX - renderingElement.offsetLeft;
			lastY = ev.pageY - renderingElement.offsetTop;
		};

		const OnClick = (ev) => {
			moving = true;
			lastX = ev.pageX - renderingElement.offsetLeft;
			lastY = ev.pageY - renderingElement.offsetTop;
		};

		const onMouseUp = (ev) => {
			moving = false;
			lastX = ev.pageX - renderingElement.offsetLeft;
			lastY = ev.pageY - renderingElement.offsetTop;
		};

		const onMouseMove = (ev) => {
			if (moving) {
				drawingCtx.globalCompositeOperation = "source-over";
				renderingCtx.globalCompositeOperation = "destination-out";
				let currentX = ev.pageX - renderingElement.offsetLeft;
				let currentY = ev.pageY - renderingElement.offsetTop;
				drawingCtx.lineJoin = "round";
				drawingCtx.moveTo(lastX, lastY);
				drawingCtx.lineTo(currentX, currentY);
				drawingCtx.closePath();
				drawingCtx.lineWidth = 120;
				drawingCtx.stroke();
				lastX = currentX;
				lastY = currentY;
				renderingCtx.drawImage(drawingElement, 0, 0);
			}
		};

		renderingElement.addEventListener("mouseover", onMouseOver);

		renderingElement.addEventListener("click", OnClick);

		renderingElement.addEventListener("mouseup", onMouseUp);

		renderingElement.addEventListener("mousemove", onMouseMove);

		return () => {
			renderingElement.removeEventListener("mousemove", onMouseOver);
			renderingElement.removeEventListener("click", OnClick);
			renderingElement.removeEventListener("mouseup", onMouseUp);
			renderingElement.removeEventListener("mousemove", onMouseMove);
		};
	}, [size.height, size.width, currentTheme]);

	return (
		<canvas
			className="banner__canvas"
			height={size.height}
			width={size.width}
			ref={canvas}
			onMouseOver={() => dispatch(setCursorType("pointer"))}
			onMouseLeave={() => dispatch(setCursorType(""))}
		></canvas>
	);
}

export default BannerCanvas;
