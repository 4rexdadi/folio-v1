// Imports
import { useState, useEffect } from "react";

function useOnScreen(ref, threshold = 0.3) {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState(false);
	const [IntersectingElement, setIntersectingElement] = useState(false);

	useEffect(() => {
		const singleRef = ref.current;

		if (!Array.isArray(singleRef) && singleRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					// Update our state when observer callback fires
					setIntersecting(entry?.isIntersecting ?? false);
					setIntersectingElement(entry);
				},
				{
					rootMargin: "0px",
					threshold,
				}
			);

			observer.observe(singleRef);

			return () => {
				observer.unobserve(singleRef);
			};
		}
	}, [ref, threshold]);

	useEffect(() => {
		const refs = ref.current;

		if (Array.isArray(refs) && refs[0]) {
			const observer = new IntersectionObserver(
				(entries) =>
					entries.forEach((entry) => {
						// Update our state when observer callback fires
						setIntersecting(entry?.isIntersecting ?? false);
						setIntersectingElement(entry);
					}),
				{
					rootMargin: "0px",
					threshold,
				}
			);

			refs.forEach((el) => {
				observer.observe(el);
			});

			return () => {
				refs.forEach((el) => {
					observer.unobserve(el);
				});
			};
		}
	}, [ref, threshold]); // Empty array ensures that effect is only run on mount and unmount

	return { isIntersecting, IntersectingElement };
}
export default useOnScreen;
