import { useState } from 'react'

/**
 * JokeGenerator
 * ─────────────
 * Fetches a random joke (setup + punchline) from the Official Joke API.
 * The "Next Joke" button fetches another joke without resetting the UI.
 */
function JokeGenerator() {
    const [joke, setJoke] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchJoke = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('https://official-joke-api.appspot.com/random_joke')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setJoke(data)
        } catch (err) {
            setError('Could not fetch a joke. Check your connection and try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <article className="card">
            {/* Header */}
            <div className="card-header">
                <div className="card-icon">😂</div>
                <div>
                    <h2>Joke Generator</h2>
                    <p>Powered by official-joke-api</p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="btn-row">
                {/* First fetch shows "Get Joke"; subsequent fetches show "Next Joke" */}
                <button className="btn btn-purple" onClick={fetchJoke} disabled={loading}>
                    {loading
                        ? <><span className="spinner" /> Loading...</>
                        : joke
                            ? '🔄 Next Joke'
                            : '😂 Get Joke'}
                </button>
            </div>

            {/* Error state */}
            {error && <p className="status-box status-error">{error}</p>}

            {/* Joke display */}
            {joke && !loading && (
                <div className="joke-box">
                    {/* Category badge */}
                    <span className="joke-category">{joke.type}</span>

                    {/* Setup */}
                    <p className="joke-setup" style={{ marginTop: '0.75rem' }}>
                        💬 {joke.setup}
                    </p>

                    <div className="joke-divider" />

                    {/* Punchline */}
                    <p className="joke-punchline">🥁 {joke.punchline}</p>
                </div>
            )}

            {/* Placeholder before first fetch */}
            {!joke && !loading && !error && (
                <p className="status-box status-loading" style={{ opacity: 0.6 }}>
                    Hit "Get Joke" to load your first joke!
                </p>
            )}
        </article>
    )
}

export default JokeGenerator
