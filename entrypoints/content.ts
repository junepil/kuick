import { Group } from "@/components/GroupContainer";
import useRegister from "@/hooks/register";

export default defineContentScript({
  matches: [
    "<all_urls>",
    "https://wein.konkuk.ac.kr/ptfol/cmnt/cube/findCubeResveStep2.do",
    "https://wein.konkuk.ac.kr/ptfol/cmnt/hub/findCubeResveStep2.do",
  ],
  main() {
    console.log("content script");

    browser.runtime.onMessage.addListener((message) => {
      console.log("message recieved: ", message.content);
      const group: Group = message.content;

      useRegister(group);
    });
  },
});
