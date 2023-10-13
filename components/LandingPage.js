import React from "react"

export default function LandingPage(props) {
    const [isStarted, setIsStarted] = React.useState(false)

    function handleClick() {
        setIsStarted(true) 
        props.setIsQuestionsRequested(true)
    }

    return (
        !isStarted &&
        <section className="landing-section">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button 
                onClick={handleClick}
                className="start-btn"
            >
                Start quiz
            </button>
        </section>
    )
}