import React, { type ErrorInfo, type ReactNode } from 'react'
import { PageErrorBoundary } from 'widgets/PageErrorBoundary'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError () {
        return { hasError: true }
    }

    componentDidCatch (error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo)
    }

    render () {
        const { hasError } = this.state
        const { children } = this.props

        if (hasError) {
            return <PageErrorBoundary/>
        }

        return children
    }
}

export default ErrorBoundary
