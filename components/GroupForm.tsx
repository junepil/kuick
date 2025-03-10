import { Button } from "@/components/Button";
import { Group } from "@/components/GroupContainer";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { RiUserMinusLine } from "react-icons/ri";

type GroupFormProps = {
  onCreate: (data: Group) => void;
  onClose: () => void;
};

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
    <div className='w-full p-4 pt-12 h-64 border-2 border-gray-300 rounded-lg flex flex-col gap-2 relative hover:border-cyan-700'>
      <IoClose
        onClick={onClose}
        className='absolute end-4 top-4 text-xl text-gray-400 hover:text-cyan-700'
      />
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
          className='flex p-2 bg-cyan-800 rounded-lg text-gray-50'
          type='submit'
          value='추가하기'
        />
      </form>
    </div>
  );
};

export { GroupForm };
