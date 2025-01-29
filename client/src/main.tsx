import React from "react";
import ReactDOM from "react-dom/client";
import { BooksProvider } from "./context/BookContext";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BooksProvider>
      <App />
    </BooksProvider>
	</React.StrictMode>
);
