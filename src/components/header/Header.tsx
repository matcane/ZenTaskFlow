import useTasksStore from "@/store/tasksStore";

import MenuModal from "@ui/menu/MenuModal";

import HeaderText from "./HeaderText";
import HeaderWrapper from "./HeaderWrapper";

export default function Header() {
  const { isEditing, tasksByIdToDelete, tasksToDeleteEqualAllTask } = useTasksStore();

  const renderHeaderText = () => {
    if (isEditing) {
      if (tasksByIdToDelete.length > 0) {
        return tasksToDeleteEqualAllTask ? "All selected" : `${tasksByIdToDelete.length} selected`;
      }
      return "Select tasks";
    }
    return "Tasks";
  };

  return (
    <HeaderWrapper>
      <HeaderText indent={!isEditing}>{renderHeaderText()}</HeaderText>
      <MenuModal />
    </HeaderWrapper>
  );
}
