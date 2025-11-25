const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-6 mt-10">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
      <span className="text-sm">© {new Date().getFullYear()} Raise. All rights reserved.</span>
      <div className="flex gap-4 text-sm">
        <a href="mailto:support@raise.com" className="hover:text-white">Support</a>
        <a href="https://www.raise.com" className="hover:text-white">Docs</a>
      </div>
    </div>
  </footer>
)

export default Footer
