export default function Input({ placeHolder = "" }: { placeHolder?: string }) {
  return (
    <input
      type='text'
      className='h-8 rounded-md border-2 border-gray-300 p-2 outline-green-800'
      placeholder={placeHolder}
    />
  );
}
