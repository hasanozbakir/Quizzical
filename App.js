import React from "react"
import { Default } from 'react-awesome-spinners'
import LandingPage from "./components/LandingPage"
import QuizPage from "./components/QuizPage"

export default function App() {
    const [token, setToken] = React.useState(
        () => fetch("https://opentdb.com/api_token.php?command=request")
            .then(response => response.json()
            .then(data => setToken(data.token))
        ) || ""
    )
    const [amount, setAmount] = React.useState(5)
    const [score, setScore] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [isQuestionsRequested, setIsQuestionsRequested] = React.useState(false)
    const [isAllChecked, setIsAllChecked] = React.useState(false)
    const [questionsArray, setQuestionsArray] = React.useState([])
    const apiRequestUrl = `https://opentdb.com/api.php?amount=${amount}${token ? `&token=${token}`: ""}`

    React.useEffect(() => {
        if(isQuestionsRequested) {
            setLoading(true)
            fetch(apiRequestUrl)
                .then(response => response.json())
                .then(data => {
                    setQuestionsArray(data.results)
                    setLoading(false)
                })
        }
    }, [isQuestionsRequested])

    function handleCheck() {
        setIsAllChecked(true)
        setIsQuestionsRequested(false)
        const num = questionsArray.filter(item => item.answer === item.correct_answer).length
        setScore(num)
    }

    function handleClick() {
        setIsQuestionsRequested(true)
        setIsAllChecked(false)
        setScore(0)
    }

    return (
        <div className="container">
            {loading && 
            <section className="preloader-section">
                <Default />
            </section>}

            <LandingPage 
                setIsQuestionsRequested={setIsQuestionsRequested} />

            {(isQuestionsRequested || isAllChecked) && !loading &&
            <QuizPage 
                isAllChecked={isAllChecked}
                questionsArray={questionsArray}
                setQuestionsArray={setQuestionsArray}/>}

            {isQuestionsRequested && !isAllChecked &&
            <button 
                className="check-btn"
                onClick={handleCheck}
            >
                Check answers
            </button>}

            {isAllChecked &&
            <div className="score-container">
                <h4 
                    className="score-text"
                >
                    You scored {score}/{amount} correct answers
                </h4>
                <button 
                    className="play-again-btn"
                    onClick={handleClick}
                >
                    Play again
                </button>
            </div>}
        </div>
    )
}