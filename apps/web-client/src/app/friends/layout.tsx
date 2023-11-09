import { SidebarWrapper } from './SidebarWrapper';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <SidebarWrapper />

    <div className="flex-grow">{children}</div>
  </>
);

export default RootLayout;
