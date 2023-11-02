enum AlertType {
  Note = 'note',
  Important = 'important',
  Warning = 'warning',
  Danger = 'danger',
}

interface AlertProps {
  type: AlertType;
  label?: string;
  content: string;
}

export const Alert: React.FC<AlertProps> = ({ type, label, content }) => {
  const typeStyles = {
    [AlertType.Note]: 'border-blue-400 text-blue-400',
    [AlertType.Important]: 'border-purple-500 text-purple-500',
    [AlertType.Warning]: 'border-yellow-500 text-yellow-500',
    [AlertType.Danger]: 'border-red-500 text-red-500',
  };

  return (
    <div
      className={`ignore bg-background-secondary my-5 rounded-lg border px-6 py-5 ${typeStyles[type]}`}
    >
      <p className="font-semibold tracking-wide">
        {label ?? type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <p className="mt-2 block text-sm">{content}</p>
    </div>
  );
};
