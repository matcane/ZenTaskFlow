import { TTask } from "@/store/taskStoreTypes";

import TaskContent from "./TaskContent";
import TaskWrapper from "./TaskWrapper";

export default function Task({ task }: { task: TTask }) {
  return (
    <TaskWrapper task={task}>
      <TaskContent task={task} />
    </TaskWrapper>
  );
}
