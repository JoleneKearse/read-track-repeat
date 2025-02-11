import React, { useEffect } from "react";
import useBooks from "../context/useBooks";

interface AlertProps {
	message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
	const { state, dispatch } = useBooks();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: "SET_SHOW_ALERT", payload: false });
		}, 2500);
		return () => clearTimeout(timer);
	}, [state.showAlert, dispatch]);

	if (!state.showAlert) return null;

	return (
		<div
			role="status"
			aria-live="polite"
			className="fixed top-20 -right-10 bg-orange-gradient text-purple-700 font-bold px-40 py-20 rounded-3xl shadow-lg transition-opacity duration-500 ease-in-out z-10"
		>
			{message}
		</div>
	);
};

export default Alert;
