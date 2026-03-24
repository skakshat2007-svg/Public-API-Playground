import { useState } from 'react'

/**
 * DogFinder
 * ─────────
 * Fetches a random dog image from the Dog CEO API.
 * Extracts the breed name from the image URL path.
 * Lets the user copy the image URL to clipboard.
 */
function DogFinder() {
    const [imageUrl, setImageUrl] = useState(null)
    const [breed, setBreed] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [copied, setCopied] = useState(false)

    // Extract breed from a Dog CEO URL like:
    // https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg
    // → "Afghan Hound"
    const extractBreed = (url) => {
        try {
            const parts = url.split('/breeds/')[1].split('/')[0] // e.g. "hound-afghan"
            return parts
                .split('-')
                .reverse()
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')
        } catch {
            return 'Unknown Breed'
        }
    }

    const fetchDog = async () => {
        setLoading(true)
        setError(null)
        setCopied(false)
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random')
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const data = await res.json()
            setImageUrl(data.message)
            setBreed(extractBreed(data.message))
        } catch (err) {
            setError('Failed to fetch a dog. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const copyUrl = async () => {
        if (!imageUrl) return
        try {
            await navigator.clipboard.writeText(imageUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    return (
        <article className="card">
            {/* Header */}
            <div className="card-header">
                <div className="card-icon">🐶</div>
                <div>
                    <h2>Dog Finder</h2>
                    <p>Powered by dog.ceo API</p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="btn-row">
                <button className="btn btn-blue" onClick={fetchDog} disabled={loading}>
                    {loading ? <><span className="spinner" /> Fetching...</> : '🐾 Get Dog'}
                </button>

                {imageUrl && (
                    <button className="btn btn-ghost btn-sm" onClick={copyUrl}>
                        {copied ? '✅ Copied!' : '📋 Copy URL'}
                    </button>
                )}
            </div>

            {/* Error state */}
            {error && <p className="status-box status-error">{error}</p>}

            {/* Result */}
            {imageUrl && !loading && (
                <div>
                    <div className="dog-image-wrap">
                        <img
                            src={imageUrl}
                            alt={`A ${breed}`}
                            className="dog-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="dog-breed">
                        <span className="breed-pill">{breed}</span>
                        {copied && <span className="copy-feedback">URL copied!</span>}
                    </div>
                </div>
            )}
        </article>
    )
}

export default DogFinder
