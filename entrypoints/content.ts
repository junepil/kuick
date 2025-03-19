import { Group } from "@/components/GroupContainer";
import useRegister from "@/hooks/register";
import { targetUrl } from "@/model/url";

export default defineContentScript({
  matches: ["<all_urls>", ...targetUrl],
  main() {
    console.log("content script");

    browser.runtime.onMessage.addListener((message) => {
      console.log("message recieved: ", message.content);
      const group: Group = message.content;

      useRegister(group);
    });
  },
});
