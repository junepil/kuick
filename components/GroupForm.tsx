import { Button } from "@/components/Button";
import { Group } from "@/components/GroupContainer";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface GroupFormProps {
  onCreate: (data: Group) => void;
  onClose: () => void;
  ref: React.Ref<any>;
}

const GroupForm: React.FC<GroupFormProps> = ({
  onCreate,
  onClose,
  ...props
}: GroupFormProps) => {
  const { control, handleSubmit, watch, reset } = useForm<Group>({
    defaultValues: {
      members: ["", "", "", ""],
    },
  });

  const members = watch("members");

  const useRealMembers = (members: string[]) => {
    return members.filter((member) => member !== "");
  };

  const onSubmit: SubmitHandler<Group> = (data) => {
    data.members = useRealMembers(data.members);

    onCreate(data);
    onClose();
    reset();
  };

  return (
    <div
      className='absolute w-full h-full translate-y-[20%] bottom-0 bg-stone-50 z-10 rounded-t-4xl py-8 px-8 flex flex-col gap-2 items-end'
      ref={props.ref}
    >
      <IoClose className='text-stone-500 text-xl' onClick={onClose} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 py-2 w-full h-fit overflow-y-auto relative items-end'
      >
        <Controller
          name='name'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Input placeholder='그룹명' {...field} required />
          )}
        />
        {members.map((_, index) => (
          <Controller
            key={index}
            name={`members.${index}`}
            control={control}
            defaultValue=''
            render={({ field }) => <Input placeholder='학번' {...field} />}
          />
        ))}
        <Button
          onClick={handleSubmit(onSubmit)}
          type={"submit"}
          variant={"create"}
        >
          등록하기
        </Button>
      </form>
    </div>
  );
};

export { GroupForm };
