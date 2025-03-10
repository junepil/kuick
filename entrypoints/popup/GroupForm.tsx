import { Button } from "@/components/Button";
import { Group } from "@/components/GroupContainer";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

type GroupFormProps = {
  onCreate: (data: Group) => void;
};

const GroupForm = ({ onCreate }: GroupFormProps) => {
  const [create, setCreate] = useState(false);
  const { control, handleSubmit, setValue, watch, reset } = useForm<Group>({
    defaultValues: {
      members: [""],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<Group> = (data) => {
    onCreate(data);
    setCreate(false);
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
    <div className='flex flex-col w-full ease-out duration-200'>
      {!create && (
        <Button onClick={() => setCreate(true)}>그룹 추가하기</Button>
      )}
      {create && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-1 w-full'
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
                <div className='flex items-center gap-x-2'>
                  <Input placeHolder='학번' {...field} />
                  <Button onClick={() => removeMember(index)}>
                    <IoClose />
                  </Button>
                </div>
              )}
            />
          ))}
          <Button onClick={addMember}>멤버 추가</Button>
          <input className='bg-orange-800 p-2' type='submit' value='추가하기' />
        </form>
      )}
    </div>
  );
};

export { GroupForm };
