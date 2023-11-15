import React, { Component } from "react";
import "./Button.css";

class Calculator extends Component {
  state = {
    result: "",
    history: "",
  };

  handleClick = (value) => {
    const operators = ["+", "-", "*", "/", "%"];

    const lastChar = this.state.result.charAt(this.state.result.length - 1);
    const isNewValueOperator = operators.includes(value);
    const isLastCharOperator = operators.includes(lastChar);

    if (value === "=") {
      try {
        const result = new Function(`return ${this.state.result}`)();
        this.setState({
          result: result.toString(),
          history: `${this.state.result}`,
        });
      } catch (error) {
        this.setState({ result: "Ошибка" });
      }
    } else if (value === "C") {
      this.setState({ result: "", history: "" });
    } else if (value === "DE") {
      this.setState({
        result: this.state.result.slice(0, -1),
      });
    } else if (value === "+/-") {
      // Toggle the sign of the number
      const newValue =
        this.state.result.charAt(0) === "-"
          ? this.state.result.slice(1)
          : `-${this.state.result}`;
      this.setState({ result: newValue });
    } else if (isLastCharOperator && isNewValueOperator) {
      // Do not allow consecutive operators
      return;
    } else {
      this.setState({
        result: this.state.result + value,
      });
    }
  };
  toggleDarkMode = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {
    const darkModeClass = this.state.isDarkMode ? "dark-mode" : "";
    return (
      <div className="MainContainer">
        <div className={`calculator ${darkModeClass}`}>
          <div className="inputLine">
            <input
              type="text"
              className={`input ${darkModeClass}`}
              value={this.state.history}
              readOnly
            />
            <input
              type="text"
              className={`input ${darkModeClass}`}
              value={this.state.result}
              readOnly
            />
          </div>
          <div className="container">
            <button
              className={`fsbutton ${darkModeClass}`}
              onClick={() => this.handleClick("C")}
            >
              C
            </button>
            <button
              className={`fsbutton ${darkModeClass}`}
              onClick={() => this.handleClick("+/-")}
            >
              +/-
            </button>
            <button
              className={`fsbutton ${darkModeClass}`}
              onClick={() => this.handleClick("%")}
            >
              %
            </button>
            <button onClick={() => this.handleClick("/")}>/</button>
            <button onClick={() => this.handleClick("7")}>7</button>
            <button onClick={() => this.handleClick("8")}>8</button>
            <button onClick={() => this.handleClick("9")}>9</button>
            <button onClick={() => this.handleClick("*")}>x</button>

            <button onClick={() => this.handleClick("4")}>4</button>
            <button onClick={() => this.handleClick("5")}>5</button>
            <button onClick={() => this.handleClick("6")}>6</button>
            <button onClick={() => this.handleClick("-")}>-</button>
            <button onClick={() => this.handleClick("1")}>1</button>
            <button onClick={() => this.handleClick("2")}>2</button>
            <button onClick={() => this.handleClick("3")}>3</button>
            <button onClick={() => this.handleClick("+")}>+</button>

            <button onClick={() => this.handleClick(".")}>.</button>
            <button onClick={() => this.handleClick("0")}>0</button>
            <button onClick={() => this.handleClick("DE")}>--</button>
            <button onClick={() => this.handleClick("=")}>=</button>
            <button className="toggle-dark-mode" onClick={this.toggleDarkMode}>
              Dark mod
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
