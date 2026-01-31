import "react"
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react"

export function AuthenticationPage() {
    return <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    }}>
        <div className="auth-container">
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem'
                }}>
                    🎯 CodeChallenge Pro
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    margin: 0
                }}>
                    Master coding with AI-powered challenges
                </p>
            </div>

            <SignedOut>
                <SignIn
                    routing="path"
                    path="/sign-in"
                    appearance={{
                        elements: {
                            rootBox: {
                                width: '100%'
                            },
                            card: {
                                background: 'transparent',
                                boxShadow: 'none'
                            }
                        }
                    }}
                />
                <SignUp
                    routing="path"
                    path="/sign-up"
                    appearance={{
                        elements: {
                            rootBox: {
                                width: '100%'
                            },
                            card: {
                                background: 'transparent',
                                boxShadow: 'none'
                            }
                        }
                    }}
                />
            </SignedOut>
            <SignedIn>
                <div className="redirect-message">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        You are already signed in!
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Redirecting to dashboard...
                    </p>
                </div>
            </SignedIn>
        </div>
    </div>
}