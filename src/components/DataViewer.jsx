import { useState } from 'react'

/**
 * DataViewer
 * ──────────
 * Fetches data from JSONPlaceholder API.
 * Supports posts, comments, albums, and photos.
 */
function DataViewer() {
    const [resource, setResource] = useState('posts')
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchResource = async () => {
        setLoading(true)
        setError(null)
        setItems([])
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}?_limit=5`)
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setItems(data)
        } catch (err) {
            setError(`Failed to fetch ${resource}. Please try again.`)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <article className="card">
            {/* Header */}
            <div className="card-header">
                <div className="card-icon">📁</div>
                <div>
                    <h2>JSONPlaceholder</h2>
                    <p>Mock data for testing</p>
                </div>
            </div>

            {/* Resource Selector */}
            <div className="resource-selector">
                <select
                    value={resource}
                    onChange={(e) => setResource(e.target.value)}
                    className="btn btn-ghost"
                >
                    <option value="posts">Posts</option>
                    <option value="comments">Comments</option>
                    <option value="albums">Albums</option>
                    <option value="photos">Photos</option>
                </select>

                <button className="btn btn-blue" onClick={fetchResource} disabled={loading}>
                    {loading ? <><span className="spinner" /> Fetching...</> : '📤 Fetch Data'}
                </button>
            </div>

            {/* Error state */}
            {error && <p className="status-box status-error">{error}</p>}

            {/* Result list */}
            {items.length > 0 && !loading && (
                <div className="data-list-wrap">
                    <ul className="data-list">
                        {items.map((item) => (
                            <li key={item.id} className="data-item">
                                <span className="item-id">#{item.id}</span>
                                <span className="item-title">{item.title || item.name}</span>
                                {item.thumbnailUrl && (
                                    <img src={item.thumbnailUrl} alt={item.title} className="item-thumb" />
                                )}
                                {item.body && <p className="item-body">{item.body.substring(0, 60)}...</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Placeholder */}
            {items.length === 0 && !loading && !error && (
                <p className="status-box status-loading" style={{ opacity: 0.6 }}>
                    Select a resource and click Fetch!
                </p>
            )}
        </article>
    )
}

export default DataViewer
