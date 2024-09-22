import { useState } from "react";
import IntroPage from "./components/IntroPage.jsx"
import yellowBlob from './assets/yellowBlob.svg'
import Loader from "./components/Loader.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import QuizQuestion from "./components/QuizQuestion.jsx";
import { nanoid } from "nanoid";

function App() {
  const [pageState, setPageState] = useState("intro")
  const [questionsData, setQuestionsData] = useState([])

  function startQuiz() {
    fetchQuiz()
    setPageState("loading")
  }

  async function fetchQuiz() {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
      const data = await response.json()
      if (data.response_code === 0) {
        const res = handleFetchResults(data.results)
        setQuestionsData(res)
        setPageState("quiz")
      } else {
        throw new Error(response.status);
      }
    } catch(error) {
      setPageState("error")
    }    
  }

  function refresh() {
    setPageState("intro")
  }

  function handleFetchResults(results) {    
    return results.map(result => {
      const responses = [...result.incorrect_answers, result.correct_answer].sort((a, b) => 0.5 - Math.random());
      return {
        id: nanoid(),
        title: result.question,
        type: result.type,
        responses: responses,
        correctAnswer: result.correct_answer,
        selectedAnswer: null
      }
    })
  }

  function handleResponseChange(question, index) {
    setQuestionsData(prevQuestions => 
        prevQuestions.map(prevQuestion => {
          if (prevQuestion.id === question.id) {
            return {...prevQuestion, selectedAnswer: prevQuestion.responses[index]}
          } else {
            return prevQuestion
          }
        }
      )
    )
  }

  function handleSubmit() {
    setPageState("quizResults")
  }

  const getCorrectResponsesNumber = () => {
    const correct = questionsData.filter(question => question.selectedAnswer === question.correctAnswer)
    return correct.length
  }

  function handlePlayAgain() {
    startQuiz()
  }

  function render() {    
    switch(pageState) {
      case "intro":
        return (
          <IntroPage startQuiz={startQuiz} />
        )
      case "loading":
        return (
          <Loader />
        )

      case "quiz":
        return (
          <div className="quiz-container">
          <div className="questions-container">
              {questionsData.map(question => 
                  <QuizQuestion 
                    key={ nanoid() } 
                    question={question} 
                    isCheckingResults={false}
                    onResponseChange={ (index) => handleResponseChange(question, index) }
                  />
                )
              }
          </div>
          <button className="quiz-action-button" onClick={handleSubmit}>
              <label className="quiz-action-button-label">Check answers</label>
          </button>
        </div>
        )

      case "quizResults":
        return (
          <div className="quiz-container">
          <div className="questions-container">
              {
                  questionsData.map(question => 
                    <QuizQuestion 
                      key={ nanoid() } 
                      question={question}
                      isCheckingResults={true}
                      onResponseChange={ (index) => handleResponseChange(question, index) }
                   />
                  )
              }
          </div>
          <div className="score-container">
            <h1 className="score-title">You scored {getCorrectResponsesNumber()}/{questionsData.length} correct answers</h1>
            <button className="quiz-action-button" onClick={handlePlayAgain}>
                <label className="quiz-action-button-label">Play again</label>
            </button>
          </div>
        </div>
        )

      case "error":
        return (
          <ErrorPage refresh={refresh} />
        )
      
      default:
        return (
          <h1>No content</h1>
        )
    }
  }

  return (
    <main className="main-container">{ render() }</main>    
  )
}

export default App
