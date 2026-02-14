import "react"
import { useState, useEffect } from "react"
import { MCQChallenge } from "../challenge/MCQChallenge.jsx";
import { useApi } from "../utils/api.js";

export function HistoryPanel() {
    const { makeRequest } = useApi()
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("my-history")
            console.log(data)
            setHistory(data.challenges)
        } catch (err) {
            setError("Failed to load history.")
        } finally {
            setIsLoading(false)
        }
    }

    const getStats = () => {
        const total = history.length
        const byDifficulty = {
            easy: history.filter(c => c.difficulty === 'easy').length,
            medium: history.filter(c => c.difficulty === 'medium').length,
            hard: history.filter(c => c.difficulty === 'hard').length
        }
        return { total, byDifficulty }
    }

    const filteredHistory = filter === 'all'
        ? history
        : history.filter(c => c.difficulty === filter)

    const stats = getStats()

    if (isLoading) {
        return <div className="loading">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
            Loading your challenge history...
        </div>
    }

    if (error) {
        return <div className="error-message">
            <p>{error}</p>
            <button
                onClick={fetchHistory}
                style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--gradient-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
            >
                Retry
            </button>
        </div>
    }

    return <div className="history-panel">
        <div style={{ marginBottom: '2rem' }}>
            <h2>📚 Challenge History</h2>

            {history.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        padding: '1.5rem',
                        background: 'var(--glass)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {stats.total}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Total Challenges
                        </div>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'var(--glass)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {stats.byDifficulty.easy}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Easy
                        </div>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'var(--glass)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {stats.byDifficulty.medium}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Medium
                        </div>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'var(--glass)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {stats.byDifficulty.hard}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Hard
                        </div>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem'
                }}>
                    {['all', 'easy', 'medium', 'hard'].map(diff => (
                        <button
                            key={diff}
                            onClick={() => setFilter(diff)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: filter === diff ? 'var(--gradient-primary)' : 'var(--surface)',
                                border: filter === diff ? 'none' : '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-primary)',
                                fontWeight: filter === diff ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'capitalize'
                            }}
                        >
                            {diff === 'all' ? 'All' :
                                diff === 'easy' ? 'Easy' :
                                    diff === 'medium' ? 'Medium' : 'Hard'}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {filteredHistory.length === 0 ? (
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'var(--glass)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {filter === 'all' ? 'No challenges yet' : `No ${filter} challenges yet`}
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Start generating challenges to build your history!
                </p>
            </div>
        ) : (
            <div className="history-list">
                {filteredHistory.map((challenge) => {
                    return <MCQChallenge
                        challenge={challenge}
                        key={challenge.id}
                        showExplanation
                    />
                })}
            </div>
        )}
    </div>
}