export const Header: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-10 border-b bg-header border-border">
        <div className="flex justify-between">
          {/* Branding */}
          <p className="px-3 py-2 font-bold no-select text-text-faint">
            Open Dev Net
          </p>

          {/* Account Dropdown */}
          <div className="py-2 mr-3">
            <div className="h-6 p-1 text-sm rounded-sm bg-secondary">
              Account
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
