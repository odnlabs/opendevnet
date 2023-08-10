interface ButtonProps {
  title: string;
}

export const Button = ({ title }: ButtonProps) => {
  return (
    <button className="px-5 py-2 text-white bg-black rounded-md">
      {title}
    </button>
  );
};
