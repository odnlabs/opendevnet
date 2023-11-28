import { SidebarWrapper } from './SidebarWrapper';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <SidebarWrapper />
    <div className="flex-grow">
      <main id="main" tabIndex={0}>
        {children}
      </main>
    </div>
  </>
);

export default RootLayout;
