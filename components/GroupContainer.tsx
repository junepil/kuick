import { IoClose } from "react-icons/io5";
import { Button } from "./Button";

class Group {
  name: string;
  members: string[];

  constructor(name: string, members: string[]) {
    this.name = name;
    this.members = members;
  }
}

type GroupContainerProps = {
  group: Group;
  onClick: () => void;
  onClose: () => void;
};

const GroupContainer = ({ group, onClick, onClose }: GroupContainerProps) => {
  return (
    <div className='w-full p-4 border-2 border-gray-300 rounded-lg flex flex-col gap-2 relative hover:border-cyan-700'>
      <h2 className='text-4xl font-black text-green-800 overflow-clip'>
        {group.name}
      </h2>
      <IoClose
        onClick={onClose}
        className='absolute end-4 top-4 text-xl text-gray-400 hover:text-cyan-700'
      />
      <ul className='flex flex-col h-full p-2 gap-2 items-start'>
        {group.members.map((member, index) => (
          <li className='w-fit flex gap-2' key={index}>
            <div className='text-sm font-semibold text-gray-800'>{member}</div>
          </li>
        ))}
      </ul>
      <Button onClick={onClick}>사용하기</Button>
    </div>
  );
};

export { Group, GroupContainer };
