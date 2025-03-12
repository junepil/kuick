import { Button } from "@/components/Button";
import { Group } from "@/components/GroupContainer";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface GroupFormProps {
  onCreate: (data: Group) => void;
  onClose: () => void;
}

const GroupForm = ({ onCreate, onClose }: GroupFormProps) => {
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
    <Box onClose={onClose} title='새 그룹'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 py-2 w-auto h-fit overflow-y-auto relative items-end'
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
    </Box>
  );
};

export { GroupForm };
