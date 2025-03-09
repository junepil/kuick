import { Group, GroupContainer } from "@/components/GroupContainer";
import { GroupForm } from "./GroupForm";
import Layout from "./Layout";

const App = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const deleteGroup = (target: number) => {
    setGroups(groups.filter((_, index) => index !== target));
  };

  const createGroup = (group: Group) => {
    setGroups([...groups, group]);
  };

  const sendMessage = async (content: any) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) browser.tabs.sendMessage(tabs[0].id, { content });
    });
  };
  // TODO 영속화 기능 추가
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
