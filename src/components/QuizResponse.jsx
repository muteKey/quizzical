import React from "react";

export default function QuizResponse(props) {
    const styles = {
        "default": {
            borderRadius: "0.5rem",
            borderWidth: "0.79px",
            borderStyle: "solid",
            borderColor: "#4D5B9E",
            backgroundColor: "#F5F7FB",
            opacity: "100%",
        },
        "selected": {
            border: "none",
            backgroundColor: "#D6DBF5",
            opacity: "100%",
        },
        "correct": {
            border: "none",
            backgroundColor: "#94D7A2",
            opacity: "100%"
        },
        "incorrect": {
            border: "none",
            backgroundColor: "#F8BCBC",
            opacity: "50%",
        },
        "neutral": {
            borderRadius: "0.5rem",
            borderWidth: "0.79px",
            borderStyle: "solid",
            borderColor: "#4D5B9E",
            backgroundColor: "#F5F7FB",
            opacity: "50%",
        }
    }

    const currentStyle = props.userInteractionEnabled ? styles[props.state] : {...styles[props.state], pointerEvents: "none"}

    return (
        <button className="response" style={currentStyle} onClick={props.onResponseChange}>
            <label className="response-label">{props.title}</label>
        </button>
    )
}