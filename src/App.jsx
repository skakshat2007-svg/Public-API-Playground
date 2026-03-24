import DogFinder from './components/DogFinder'
import JokeGenerator from './components/JokeGenerator'
import UserProfile from './components/UserProfile'

/**
 * App — root component that renders the page header,
 * the three API cards, and the footer.
 */
function App() {
    return (
        <div className="app">
            {/* ── Page Header ──────────────────────────────── */}
            <header className="app-header">
                <h1>🚀 Public API Playground</h1>
                <p>Explore free public APIs — dogs, jokes, and random users — all in one place.</p>
            </header>

            {/* ── Cards Grid ───────────────────────────────── */}
            <main className="cards-grid">
                <DogFinder />
                <JokeGenerator />
                <UserProfile />
            </main>

            {/* ── Footer ───────────────────────────────────── */}
            <footer className="app-footer">
                <p>Built with React · Public APIs: dog.ceo · official-joke-api · randomuser.me</p>
            </footer>
        </div>
    )
}

export default App
