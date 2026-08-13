export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgb(var(--line)_/_0.55)] py-8">
      <div className="container-shell flex flex-col gap-4 text-sm text-[rgb(var(--text-subtle))] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-[rgb(var(--text-muted))]">RASH / Rajeet Ash</span>
          <span className="mx-2 text-[rgb(var(--line))]">·</span>
          <span>Software engineer building useful systems.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a href="mailto:rajeetash@hotmail.com" className="transition-colors hover:text-[rgb(var(--accent))]">Email</a>
          <a href="https://github.com/rajeet-04" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--accent))]">GitHub</a>
          <a href="https://www.linkedin.com/in/rajeet" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--accent))]">LinkedIn</a>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  )
}
