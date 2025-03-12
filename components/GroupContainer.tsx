import { Button } from "@/components/Button";

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
    <Box onClose={onClose} title={group.name}>
      <div className='w-full flex flex-col gap-2'>
        <ul className='flex flex-col h-full p-2 gap-2 items-start'>
          {group.members.map((member, index) => (
            <li className='w-fit flex gap-2' key={index}>
              <div className='text-sm font-[Inter] font-semibold text-gray-800'>
                {member}
              </div>
            </li>
          ))}
        </ul>
        <Button onClick={onClick}>사용하기</Button>
      </div>
    </Box>
  );
};

export { Group, GroupContainer };
