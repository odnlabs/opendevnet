import Image from 'next/image';

export const Header: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-10 border-b bg-header border-border">
        <div className="flex justify-between">
          {/* Branding */}
          <div className="flex px-2 py-1.5">
            <div className="py-0.5 flex">
              <Image
                src="/logo.png"
                height={30}
                width={30}
                alt="Logo"
                className="w-6 h-6 mr-1"
              />
              <p className="text-sm font-medium no-select text-text-faint py-0.5">
                Open Dev Net
              </p>
              <div className="w-px h-4 my-1 ml-3 mr-1 bg-text/20"></div>
            </div>
            <button className="px-1.5 py-1 text-sm rounded-sm h-7 text-text-faint hover:text-text-secondary focus:text-text hover:bg-secondary focus:bg-secondary-hover">
              Settings
            </button>
            <button className="px-1.5 py-1 text-sm rounded-sm h-7 text-text-faint hover:text-text-secondary focus:text-text hover:bg-secondary focus:bg-secondary-hover">
              Help
            </button>
          </div>

          {/* Account Dropdown */}
          <div className="py-1.5 mr-3">
            <button className="px-1.5 py-1 text-sm rounded-sm h-7 text-text-faint hover:text-text-secondary focus:text-text hover:bg-secondary focus:bg-secondary-hover">
              Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
