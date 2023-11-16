import { SidebarWrapper } from './SidebarWrapper';

const NetworksLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <SidebarWrapper />
    <div className="flex-grow">{children}</div>
  </>
);

export default NetworksLayout;
