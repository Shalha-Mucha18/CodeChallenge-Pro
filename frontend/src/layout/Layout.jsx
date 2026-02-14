import "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Outlet, Link, Navigate } from "react-router-dom"

export function Layout() {
    return <div className="app-layout">
        <header className="app-header">
            <div className="header-content">
                <h1>CodeChallenge Pro</h1>
                <nav>
                    <SignedIn>
                        <Link to="/">Generate</Link>
                        <Link to="/history">History</Link>
                        <div style={{
                            marginLeft: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: '40px',
                                            height: '40px',
                                            border: '2px solid var(--primary)',
                                            boxShadow: '0 0 10px rgba(102, 126, 234, 0.3)'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main className="app-main">
            <SignedOut>
                <Navigate to="/sign-in" replace />
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>

        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-tertiary)',
            fontSize: '0.9rem',
            borderTop: '1px solid var(--border)'
        }}>
            <p style={{ margin: 0 }}>
                Made by Mucha • CodeChallenge Pro © 2026
            </p>
        </footer>
    </div>
}