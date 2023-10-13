import { createRoot } from 'react-dom/client'
import { App } from 'app/App'
import './shared/config/i18n/i18n'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'
import { AuthProvider } from 'app/providers/AuthProvider'
import { WalletProvider } from 'app/providers/WalletProvider'

const container = document.getElementById('app')
const root = createRoot(container as Element)
root.render(
    <StoreProvider>
        <AuthProvider>
            <WalletProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </ErrorBoundary>
            </WalletProvider>
        </AuthProvider>
    </StoreProvider>
)
