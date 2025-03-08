export default function Button({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: string;
}) {
  return (
    <button
      onClick={onClick}
      className='p-2.5 text-md text-gray-100 rounded-lg bg-gradient-to-bl from-green-800 to-emerald-800'
    >
      {children}
    </button>
  );
}
