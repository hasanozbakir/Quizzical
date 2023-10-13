import React from "react"
import {decode} from 'html-entities'
import { shuffleArray } from "../src/utils"

export default function Question(props) {
    const [answersArray, setAnswersArray] = React.useState(
        () => shuffleArray([
            ...props.item.incorrect_answers, 
            props.item.correct_answer
        ])
    )
    let [formData, setFormData] = React.useState({
        [props.name]: ""
    })

    React.useEffect(() => {
        props.setQuestionsArray(prevArray => {
            return prevArray.map((each, index) => {
                return index === props.id ? 
                        {
                            ...each, 
                            answer: formData[props.name]
                        }:
                        each
            })
        })
    }, [formData[props.name]])

    function handleChange(event) {
        event.stopPropagation();
        if(!props.isAllChecked) {
            const {name, value} = event.target
            console.log(name)
            setFormData({[name]: value})
        }
    }

    const answersElements = answersArray.map(choice => {
        return (
            <div 
                key={choice}
                className={formData[props.name] === "" ? "not-answered": ""}>
                <input 
                    className={
                        !props.isAllChecked ?
                        "":
                        choice === props.item.correct_answer ? 
                        "correct": 
                        "wrong"}
                    hidden
                    type="radio"
                    id={`${choice}${props.id}`}
                    name={props.name}
                    value={choice}
                    checked={formData[props.name] === choice}
                    onChange={handleChange}
                />
                <label 
                    className={props.isAllChecked ? "label-after-check": ""}
                    htmlFor={`${choice}${props.id}`}
                >
                    {decode(choice)}
                </label>    
            </div>
        )
    })

    return (
        <div className="question-box">
            <p className="question-text">{decode(props.item.question)}</p>   
            <div className="answer-container">
                {answersElements}
            </div>     
        </div>
    )
}