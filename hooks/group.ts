const persistGroups = async (groups: Group[]) => {
  await browser.storage.local.set({ groups });
};

const loadGroups = async () => {
  return (await browser.storage.local.get()) as Group[];
};

export { persistGroups, loadGroups };
