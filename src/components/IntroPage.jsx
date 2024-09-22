import React from "react";

export default function IntroPage(props) {
    return (
        <section className="start-page-container">
            <div className="start-page-title-container">
                <h1 className="start-page-title">Quizzical</h1>
                <h4 className="start-page-subtitle">Best quiz web app:)</h4>
            </div>

            <button className="start-page-button" onClick={props.startQuiz}>
                <label className="start-page-button-label">Start quiz</label>
            </button>
        </section>
    )
}