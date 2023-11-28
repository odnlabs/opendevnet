const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="min-h-[80vh]" id="main" tabIndex={0}>
    {children}
  </main>
);

export default SiteLayout;
