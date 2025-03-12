import { Button } from "@/components/Button";
import { Group } from "@/components/GroupContainer";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RiUserMinusLine } from "react-icons/ri";

interface GroupFormProps {
  onCreate: (data: Group) => void;
  onClose: () => void;
}

const GroupForm = ({ onCreate, onClose }: GroupFormProps) => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<Group>({
    defaultValues: {
      members: [""],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<Group> = (data) => {
    onCreate(data);
    onClose();
    reset();
  };

  const addMember = () => {
    setValue("members", [...members, ""]);
  };

  const removeMember = (index: number) => {
    setValue(
      "members",
      members.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {}, members);
  return (
    <Box onClose={onClose} title="새 그룹">
      <div className='w-full h-64 flex flex-col gap-2 relative'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 p-2 w-full overflow-y-auto'
        >
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => <Input placeHolder='그룹명' {...field} />}
          />
          {members.map((_, index) => (
            <Controller
              key={index}
              name={`members.${index}`}
              control={control}
              defaultValue=''
              render={({ field }) => (
                <div className='w-full flex justify-between items-center relative'>
                  <Input placeHolder='학번' {...field} />
                  <RiUserMinusLine
                    onClick={() => removeMember(index)}
                    className='text-xl text-gray-400 hover:text-cyan-700'
                  />
                </div>
              )}
            />
          ))}
          <Button onClick={addMember}>멤버 추가</Button>
          <input
            className='flex p-2 bg-cyan-800 rounded-lg text-zinc-50'
            type='submit'
            value='추가하기'
          />
        </form>
      </div>
    </Box>
  );
};

export { GroupForm };
