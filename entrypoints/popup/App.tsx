import { Group, GroupContainer } from "@/components/GroupContainer";
import { GroupForm } from "@/components/GroupForm";
import Layout from "./Layout";

const App = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const deleteGroup = (target: number) => {
    setGroups(groups!.filter((_, index) => index !== target));
  };

  const createGroup = (group: Group) => {
    setGroups([group, ...groups!]);
  };

  const sendMessage = async (content: any) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) browser.tabs.sendMessage(tabs[0].id, { content });
    });
  };

  // 그룹이 변경될 때마다 저장
  useEffect(() => {
    const persistGroups = async (groups: Group[]) => {
      await browser.storage.sync.set({ groups });
    };

    if (groups) persistGroups(groups);
  }, [groups]);

  // 익스텐션 로딩 시 초기 그룹 정보 반환
  useEffect(() => {
    const fetchGroups = async () => {
      const data = await browser.storage.sync.get();
      const initialGroups = data.groups ?? [];

      setGroups(initialGroups);
    };

    fetchGroups();
  }, []);

  return (
    <Layout>
      <div className='col-span-2 flex justify-end p-2'>
        <Button onClick={() => setIsCreating(true)}>그룹 추가하기</Button>
      </div>
      <div className='flex flex-col gap-2 p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll scrollbar scrollbar-thumb-stone-200 scrollbar-w-2'>
        {isCreating && (
          <GroupForm
            onCreate={createGroup}
            onClose={() => setIsCreating(false)}
          />
        )}
        {groups?.map((group, index) => (
          <GroupContainer
            key={index}
            group={group}
            onClose={() => deleteGroup(index)}
            onClick={() => sendMessage(group)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default App;
