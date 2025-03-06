const useApply = async () => {
  document.body.style.background = "red";
  const group = await browser.storage.local.get("test group");

  console.log(group);
};

export default useApply;
