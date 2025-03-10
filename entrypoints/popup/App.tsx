import { Group, GroupContainer } from "@/components/GroupContainer";
import { GroupForm } from "@/components/GroupForm";
import Layout from "./Layout";

const App = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);

  const deleteGroup = (target: number) => {
    setGroups(groups!.filter((_, index) => index !== target));
  };

  const createGroup = (group: Group) => {
    setGroups([...groups!, group]);
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
      {groups?.map((group, index) => (
        <GroupContainer
          key={index}
          group={group}
          onClose={() => deleteGroup(index)}
          onClick={() => sendMessage(group)}
        />
      ))}
      <GroupForm onCreate={createGroup} />
    </Layout>
  );
};

export default App;
