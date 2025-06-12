import { Group } from "@/components/GroupContainer";

const useAddUserButton = () => {
  const searchUserButton = document.getElementById(
    "userAddBtn",
  ) as HTMLButtonElement;

  searchUserButton.click();
};

const selectUsingPurpose = () => {
  const purposeList = document.querySelector("#srupSeq") as HTMLSelectElement;

  purposeList.value = '1';
}

const addUsers = (users: string[]) => {
  const userAddButton = document.getElementById("addBtn") as HTMLButtonElement;
  const userIdInput = userAddButton.previousElementSibling as HTMLInputElement;
  const saveButton = document.getElementById("findUserAddPop")
    ?.nextElementSibling?.lastChild?.lastChild?.lastChild as HTMLButtonElement;

  const memberObserver = new MutationObserver((_, observer) => {
    const members = userAddButton.parentElement?.nextElementSibling?.children;

    if (members?.length === users.length) {
      saveButton.click();
      saveForm();
      observer.disconnect();
    }
  });

  memberObserver.observe(document.body, { childList: true, subtree: true });

  users.forEach((id) => {
    userIdInput.value = id;
    userAddButton.click();
  });
};

const saveForm = () => {
  const saveButton = document.getElementById("saveBtn");

  saveButton?.click();
};

const useRegister = ({ members }: Group) => {
  const users = members;

  selectUsingPurpose();

  const popupObserver = new MutationObserver((_, observer) => {
    const elem = document.getElementById("addBtn");
    if (elem) {
      addUsers(users);

      observer.disconnect();
    }
  });

  popupObserver.observe(document.body, { childList: true, subtree: true });

  useAddUserButton();
};

export default useRegister;
