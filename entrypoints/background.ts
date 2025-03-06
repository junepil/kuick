import useApply from "@/hooks/apply";
import { setGroup, getGroup } from "@/hooks/group";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  // browser.storage.sync.set({ key: "value" });
  // useMessageListener();
});

const useMessageListener = () => {
  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      const tabId = tabs[0].id;

      const group = {
        name: "test group",
        members: ["202111345", "202111345"],
      };

      if (!tabId) return;

      switch (message.action) {
        case "set":
          await setGroup(group);
          break;
        case "get":
          console.log(await getGroup(group.name));
          break;
        case "apply":
          browser.scripting.executeScript({
            target: { tabId: tabId },
            func: useApply,
          });
          break;
        default:
          console.log("default");
      }
    },
  );
};
