import { Group, GroupContainer } from "@/components/GroupContainer";
import { GroupForm } from "@/components/GroupForm";
import { AnimatePresence, motion, Variants } from "motion/react";
import Layout from "./Layout";
import { targetUrl } from "@/model/url";

const App = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [inReservationUrl, setInReservationUrl] = useState(false); // TODO 전역 상태관리 마렵네

  const formVariants: Variants = {
    initial: {
      y: 400,
      opacity: 0,
      scale: 0.6,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
    exit: {
      y: 600,
      opacity: 0,
      scale: 0.6,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        ease: "easeOut",
      },
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
    // TODO 새로운 그룹이 생성됐을 때 그룹 컨테이너 스크롤을 최상단으로 이동하기
  };

  const registerGroup = async (content: Group) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) browser.tabs.sendMessage(tabs[0].id, { content });
    });
    // TODO 최근에 사용한 그룹을 최상단으로 이동시키기
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
      <div className='h-24 flex justify-center items-center'>
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
              className='opacity-0'
              variant={"white"}
              onClick={() => setIsCreating(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key='button'
              animate={{
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.1 },
              }}
            >
              그룹 추가하기
            </MotionButton>
          )}
        </AnimatePresence>
      </div>
      <div className='flex flex-col gap-4 p-4 pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll scrollbar scrollbar-thumb-stone-100/50 scrollbar-w-2 snap-y'>
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
              whileHover={{
                scale: 1.02,
                transition: { ease: "easeOut", duration: 0.1 },
              }}
              activate={inReservationUrl}
            />
          ))}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default App;
