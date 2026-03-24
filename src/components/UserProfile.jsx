import { useState } from 'react'

/**
 * UserProfile
 * ───────────
 * Fetches a random user from randomuser.me.
 * Displays name, avatar, email, country, age, and phone number.
 */
function UserProfile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUser = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('https://randomuser.me/api/')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            // The API returns results as an array; take the first
            setUser(data.results[0])
        } catch (err) {
            setError('Failed to load a user profile. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Helper: build "First Last" from the name object
    const fullName = user
        ? `${user.name.first} ${user.name.last}`
        : ''

    return (
        <article className="card">
            {/* Header */}
            <div className="card-header">
                <div className="card-icon">👤</div>
                <div>
                    <h2>Random User</h2>
                    <p>Powered by randomuser.me</p>
                </div>
            </div>

            {/* Action button */}
            <div className="btn-row">
                <button className="btn btn-teal" onClick={fetchUser} disabled={loading}>
                    {loading ? <><span className="spinner" /> Loading...</> : '🎲 Get User'}
                </button>
            </div>

            {/* Error state */}
            {error && <p className="status-box status-error">{error}</p>}

            {/* User card */}
            {user && !loading && (
                <div className="user-card-inner">
                    {/* Avatar */}
                    <img
                        src={user.picture.large}
                        alt={`Profile photo of ${fullName}`}
                        className="user-avatar"
                    />

                    {/* Details */}
                    <div className="user-info">
                        <p className="user-name">{fullName}</p>

                        <p className="user-detail">
                            <span className="detail-icon">✉️</span>
                            {user.email}
                        </p>

                        <p className="user-detail">
                            <span className="detail-icon">🌍</span>
                            {user.location.country}
                        </p>

                        <p className="user-detail">
                            <span className="detail-icon">📞</span>
                            {user.phone}
                        </p>

                        <p className="user-detail">
                            <span className="detail-icon">🎂</span>
                            Age {user.dob.age}
                        </p>

                        {/* Badges for gender & nationality */}
                        <div className="user-badges">
                            <span className="badge badge-teal">
                                {user.location.country}
                            </span>
                            <span className="badge badge-blue">
                                Age {user.dob.age}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder before first fetch */}
            {!user && !loading && !error && (
                <p className="status-box status-loading" style={{ opacity: 0.6 }}>
                    Hit "Get User" to load a random profile!
                </p>
            )}
        </article>
    )
}

export default UserProfile
