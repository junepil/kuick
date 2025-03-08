import { Group } from "./Group.type";

export default function GroupContainer({
  group,
  onClick,
  isSelected = false,
}: {
  group: Group;
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className='w-full p-4 border-2 border-gray-300 rounded-lg flex flex-col gap-8 hover:border-green-800 '
    >
      <h2 className='text-4xl font-black text-green-800'>{group.name}</h2>
      <ul className='flex flex-col gap-2 items-center justify-center'>
        {group.members.map(({ id, name }, index) => (
          <li className='w-fit flex gap-2' key={index}>
            <div>{id}</div>
            <div>{name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
