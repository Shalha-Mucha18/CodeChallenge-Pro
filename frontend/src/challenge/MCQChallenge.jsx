import "react"
import { useState } from "react"

export function MCQChallenge({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)

    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    const getOptionClass = (index) => {
        if (selectedOption === null) return "option"

        if (index === challenge.correct_answer_id) {
            return "option correct"
        }
        if (selectedOption === index && index !== challenge.correct_answer_id) {
            return "option incorrect"
        }

        return "option"
    }

    const getOptionPrefix = (index) => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F']
        return letters[index] || index + 1
    }

    const getDifficultyBadge = () => {
        const badges = {
            easy: { emoji: '😊', color: '#4facfe', label: 'Easy' },
            medium: { emoji: '🤔', color: '#f093fb', label: 'Medium' },
            hard: { emoji: '🔥', color: '#f5576c', label: 'Hard' }
        }
        const badge = badges[challenge.difficulty] || badges.easy

        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: `linear-gradient(135deg, ${badge.color}22 0%, ${badge.color}44 100%)`,
                border: `1px solid ${badge.color}66`,
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
            }}>
                <span style={{ fontSize: '1.2rem' }}>{badge.emoji}</span>
                {badge.label}
            </span>
        )
    }

    const getResultMessage = () => {
        if (selectedOption === null) return null

        const isCorrect = selectedOption === challenge.correct_answer_id

        return (
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: isCorrect
                    ? 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(245, 87, 108, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)',
                border: `2px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`,
                animation: 'fadeIn 0.3s ease-out'
            }}>
                <p style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>{isCorrect ? '🎉' : '💪'}</span>
                    {isCorrect ? 'Correct! Well done!' : 'Not quite! Keep learning!'}
                </p>
            </div>
        )
    }

    return <div className="challenge-display">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            {getDifficultyBadge()}
            {challenge.timestamp && (
                <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-tertiary)'
                }}>
                    {new Date(challenge.timestamp).toLocaleString()}
                </span>
            )}
        </div>

        <p className="challenge-title">{challenge.title}</p>

        <div className="options">
            {options.map((option, index) => (
                <div
                    className={getOptionClass(index)}
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    style={{
                        position: 'relative',
                        paddingLeft: '3.5rem'
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        left: '1.25rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: selectedOption === index
                            ? 'var(--gradient-primary)'
                            : 'var(--surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        border: '2px solid var(--border)',
                        transition: 'all 0.3s ease'
                    }}>
                        {getOptionPrefix(index)}
                    </span>
                    {option}
                </div>
            ))}
        </div>

        {getResultMessage()}

        {shouldShowExplanation && selectedOption !== null && (
            <div className="explanation">
                <h4>Explanation</h4>
                <p>{challenge.explanation}</p>
            </div>
        )}
    </div>
}