export default function Input({
  placeHolder = "",
  ...props
}: {
  placeHolder?: string;
}) {
  return (
    <input
      type='text'
      className='max-w-28 h-8 rounded-md border-2 border-gray-300 p-2 outline-green-800 w-auto'
      placeholder={placeHolder}
      {...props}
    />
  );
}
