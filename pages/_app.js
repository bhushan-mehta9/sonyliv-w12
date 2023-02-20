import ConfirmOtp from '@/components/ConfirmOtp/ConfirmOtp'
import ErrorBoundary from '@/components/ErrorBoundary'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
}
