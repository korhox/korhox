export default function PageLayout({ children }) {
  return (
    <div className={`flex flex-col items-center min-h-screen justify-start bg-slate-300 print:bg-transparent print:min-h-0`}>
      {children}
    </div>
  )
}
