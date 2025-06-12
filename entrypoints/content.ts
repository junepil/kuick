import { Group } from "@/components/GroupContainer";
import useRegister from "@/hooks/register";
import { targetUrl } from "@/model/url";

export default defineContentScript({
  matches: targetUrl,
  main() {
    browser.runtime.onMessage.addListener((message) => {
      const group: Group = message.content;

      useRegister(group);
    });
  },
});
