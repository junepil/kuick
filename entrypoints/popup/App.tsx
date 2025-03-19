import { Group, GroupContainer } from "@/components/GroupContainer";
import { GroupForm } from "@/components/GroupForm";
import { AnimatePresence, motion } from "motion/react";
import Layout from "./Layout";

const App = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [inReservationUrl, setInReservationUrl] = useState(false); // TODO 전역 상태관리 마렵네

  const formVariants = {
    initial: {
      y: 150,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 350,
      opacity: 0,
    },
  };

  const containerVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  const MotionButton = motion.create(Button);
  const MotionGroupForm = motion.create(GroupForm);
  const MotionGroupContainer = motion.create(GroupContainer);

  const deleteGroup = (target: number) => {
    setGroups(groups!.filter((_, index) => index !== target));
  };

  const createGroup = (group: Group) => {
    setGroups([group, ...groups!]);
  };

  const registerGroup = async (content: Group) => {
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

  useEffect(() => {
    browser.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;

        if (!url) return;

        if (targetUrl.includes(url)) {
          setInReservationUrl(true);
          return;
        }

        setInReservationUrl(false);
      },
    );
  }, []);

  return (
    <Layout>
      <div className='h-24'>
        <AnimatePresence>
          {isCreating ? (
            <MotionGroupForm
              onCreate={createGroup}
              onClose={() => setIsCreating(false)}
              variants={formVariants}
              initial='initial' // initially rendered
              exit='exit' // exit animation
              animate='animate' // create animation
              key='form'
            />
          ) : (
            <MotionButton
              className='absolute left-[50%] top-[0%] translate-x-[-50%]'
              variant={"white"}
              onClick={() => setIsCreating(true)}
              initial={{ y: 100 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key='button'
            >
              그룹 추가하기
            </MotionButton>
          )}
        </AnimatePresence>
      </div>
      <div className='flex flex-col gap-2 p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll scrollbar scrollbar-thumb-stone-200 scrollbar-w-2'>
        <AnimatePresence>
          {groups?.map((group, index) => (
            <MotionGroupContainer
              key={index}
              group={group}
              onClose={() => deleteGroup(index)}
              onClick={() => registerGroup(group)}
              variants={containerVariants}
              initial='initial'
              exit='exit'
              animate='enter'
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default App;
