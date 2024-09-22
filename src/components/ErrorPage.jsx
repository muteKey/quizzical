import React from "react";

export default function ErrorPage(props) {
    return (
        <section className="error-container">
            <h1 className="error-page-title">Error occured. Please try refreshing page</h1>
            <button className="error-page-button" onClick={props.refresh}>
                <label className="error-page-button-label">Refresh</label>
            </button>
        </section>
    )
}