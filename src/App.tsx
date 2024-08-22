/* eslint no-eval: 0 */
import { PiPlusMinusBold, PiPercentBold, PiDivideBold, PiPlusBold, PiMinusBold, PiEqualsBold, PiXBold } from "react-icons/pi";
import { useEffect, useState } from "react";

function App() {
	const buttons = [
		{ type: "deleteall", value: "AC" },
		{ type: "plusminus", value: <PiPlusMinusBold /> },
		{ type: "percent", value: <PiPercentBold /> },
		{ type: "divide", value: <PiDivideBold /> },
		{ type: "number", value: "7" },
		{ type: "number", value: "8" },
		{ type: "number", value: "9" },
		{ type: "multiplication", value: <PiXBold /> },
		{ type: "number", value: "4" },
		{ type: "number", value: "5" },
		{ type: "number", value: "6" },
		{ type: "minus", value: <PiMinusBold /> },
		{ type: "number", value: "1" },
		{ type: "number", value: "2" },
		{ type: "number", value: "3" },
		{ type: "plus", value: <PiPlusBold /> },
		{ type: "number", value: "0" },
		{ type: "operation", value: "," },
		{ type: "equals", value: <PiEqualsBold /> },
	];

	const [number, setNumber] = useState<string>("");

	const handleClickedNumber = (type: string, value: string | JSX.Element) => {
		const stringValue = typeof value === "string" ? value : type === "plusminus" ? "±" : type === "percent" ? "%" : type === "divide" ? "/" : type === "multiplication" ? "*" : type === "minus" ? "-" : type === "plus" ? "+" : value;

		if (type === "number" || type === "operation") {
			setNumber((prev) => prev + stringValue);
		} else if (type === "deleteall") {
			setNumber("");
		} else if (type === "equals") {
			try {
				let formattedExpression = number;

				// Handle specific replacements
				if (formattedExpression.includes("x")) {
					formattedExpression = formattedExpression.replace(/x/g, "*");
				}
				if (formattedExpression.includes(",")) {
					formattedExpression = formattedExpression.replace(/,/g, ".");
				}
				if (formattedExpression.includes("±")) {
					formattedExpression = formattedExpression.replace(/±/g, "-");
				}
				if (formattedExpression.includes("%")) {
					formattedExpression = formattedExpression.replace(/%/g, "/100");
				}

				// Debugging: Output the formatted expression
				console.log("Formatted Expression:", formattedExpression);

				// Evaluate the expression using eval
				const result = eval(formattedExpression);

				// Check if result is undefined or null
				if (result === undefined || result === null) {
					setNumber("Error");
				} else {
					setNumber(result.toString());
				}
			} catch (error) {
				// Debugging: Output the error
				console.error("Evaluation Error:", error);
				setNumber("Error");
			}
		} else if (type === "plusminus") {
			setNumber((prev) => prev + "±");
		} else if (type === "percent") {
			setNumber((prev) => {
				const newValue = prev.endsWith("%") ? prev : prev + "%";
				return newValue;
			});
		} else if (type === "divide") {
			setNumber((prev) => prev + "/");
		} else if (type === "multiplication") {
			setNumber((prev) => prev + "*");
		} else if (type === "minus") {
			setNumber((prev) => prev + "-");
		} else if (type === "plus") {
			setNumber((prev) => prev + "+");
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				handleClickedNumber("equals", "=");
			} else if (event.key === "Backspace") {
				setNumber((prev) => prev.slice(0, -1));
			} else if (event.key === "+") {
				handleClickedNumber("plus", "+");
			} else if (event.key === "-") {
				handleClickedNumber("minus", "-");
			} else if (event.key === "*") {
				handleClickedNumber("multiplication", "*");
			} else if (event.key === "/") {
				handleClickedNumber("divide", "/");
			} else if (event.key === "%") {
				handleClickedNumber("percent", "%");
			} else if (event.key.match(/[0-9]/)) {
				handleClickedNumber("number", event.key);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="mainContainer">
			<div className="wrapper">
				<div className="screen">{number}</div>
				<div className="buttonBox">
					{buttons.map((item, index) => (
						<div onClick={() => handleClickedNumber(item.type, item.value)} key={index} className="button">
							{item.value}
						</div>
					))}
				</div>
			</div>
			<div className="footer">{new Date().getFullYear()} All rights reserved. <a href="https://keremunce.com">keremunce.com</a></div>
		</div>
	);
}

export default App;
