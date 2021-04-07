export default function ErrorFallback({ error, resetErrorBoundary }) {
   const router = useRouter()
   return (
      <div role='alert'>
         A fost o eroare:{' '}
         <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
         <span>
            <button onClick={() => {
               resetErrorBoundary()
               router.push('/')
            }}>Mergi inapoi</button>
         </span>
      </div>
   )
}