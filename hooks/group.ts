export const setGroup = async ({ name, members }: Group) => {
  // browser object only works for service worker world :(
  await browser.storage.local.set({ [name]: members });
};

export const getGroup = async (name: string) => {
  return await browser.storage.local.get(name);
};

type Group = {
  name: string;
  members: string[];
};
