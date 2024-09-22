import React from "react";
import { decode } from "html-entities";
import QuizResponse from "./QuizResponse";

export default function QuizQuestion(props) {
    return (
        <div className="question-container">
            <h1 className="question-title">{decode(props.question.title)}</h1>
            <div className="question-responses">
                 {
                    props.question.responses.map((response, index) => {
                        let state = "default"

                        if (props.isCheckingResults) {
                            if (response !== props.question.correctAnswer && response !== props.question.selectedAnswer) {
                                state = "neutral"
                            } else if (response === props.question.selectedAnswer && response !== props.question.correctAnswer) {
                                state = "incorrect"
                            } else if (response === props.question.correctAnswer) {
                                state = "correct"
                            }
                        } else {
                            state = (response === props.question.selectedAnswer) ? "selected" : "default"
                        }
                        
                        return (
                            <QuizResponse 
                                key={index} 
                                title={decode(response)} 
                                state={state}
                                userInteractionEnabled={!props.isCheckingResults}
                                onResponseChange={() => props.onResponseChange(index) }
                            />
                        )
                    })
                }
            </div>
            <hr/>
        </div>
    )
}