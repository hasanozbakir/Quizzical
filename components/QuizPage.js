import React from "react"
import Question from "./Question"

export default function QuizPage(props) {
    
    const questionElements = props.questionsArray.map((item, index) => {
        return <Question 
                    item={item}
                    id={index}
                    key={index}
                    name={`answer${index}`}
                    isAllChecked={props.isAllChecked}
                    setQuestionsArray={props.setQuestionsArray} />
    })

    return (
        <div className="question-container">
            {questionElements}
        </div>
    )
}