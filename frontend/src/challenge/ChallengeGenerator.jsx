import "react"
import { useState, useEffect } from "react"
import { MCQChallenge } from "./MCQChallenge.jsx";
import { useApi } from "../utils/api.js"

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState("easy")
    const [quota, setQuota] = useState(null)
    const { makeRequest } = useApi()

    useEffect(() => {
        fetchQuota()
    }, [])

    const fetchQuota = async () => {
        try {
            const data = await makeRequest("quota")
            setQuota(data)
        } catch (err) {
            console.log(err)
        }
    }

    const generateChallenge = async () => {
        setIsLoading(true)
        setError(null)
        setChallenge(null)

        try {
            const data = await makeRequest("generate_challenge", {
                method: "POST",
                body: JSON.stringify({ difficulty })
            }
            )
            setChallenge(data)
            fetchQuota()
        } catch (err) {
            setError(err.message || "Failed to generate challenge.")
        } finally {
            setIsLoading(false)
        }
    }

    const getNextResetTime = () => {
        if (!quota?.last_reset_date) return null
        const resetDate = new Date(quota.last_reset_date)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    const getDifficultyEmoji = (diff) => {
        const emojis = {
            easy: "",
            medium: "",
            hard: ""
        }
        return emojis[diff] || ""
    }

    const getQuotaDots = () => {
        const total = 5
        const remaining = quota?.quota_remaining || 0
        return Array.from({ length: total }, (_, i) => (
            <span
                key={i}
                style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: i < remaining
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(255, 255, 255, 0.2)',
                    margin: '0 4px',
                    transition: 'all 0.3s ease',
                    boxShadow: i < remaining ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none'
                }}
            />
        ))
    }

    return <div className="challenge-container">
        <h2>🎯 Generate New Challenge</h2>

        <div className="quota-display">
            <p>
                Challenges Remaining Today: <strong>{quota?.quota_remaining || 0} / 5</strong>
            </p>
            <div style={{ marginTop: '0.75rem' }}>
                {getQuotaDots()}
            </div>
            {quota?.quota_remaining === 0 && (
                <p style={{ marginTop: '1rem', color: 'var(--warning)', fontSize: '0.95rem' }}>
                    Next reset: {getNextResetTime()?.toLocaleString()}
                </p>
            )}
        </div>

        <div className="difficulty-selector">
            <label htmlFor="difficulty">
                {getDifficultyEmoji(difficulty)} Select Difficulty Level
            </label>
            <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={isLoading}
            >
                <option value="easy">Easy - Perfect for Beginners</option>
                <option value="medium">Medium - Intermediate Challenge</option>
                <option value="hard">Hard - Expert Level</option>
            </select>
        </div>

        <button
            onClick={generateChallenge}
            disabled={isLoading || quota?.quota_remaining === 0}
            className="generate-button"
        >
            {isLoading ? (
                <>
                    <span className="pulse">Generating...</span>
                </>
            ) : (
                <>Generate Challenge</>
            )}
        </button>

        {error && <div className="error-message">
            <p>{error}</p>
        </div>}

        {challenge && <MCQChallenge challenge={challenge} />}
    </div>
}