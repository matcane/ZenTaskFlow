import { useMemo, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

import useTasksStore from "@/store/tasksStore";
import { TTask } from "@/store/taskStoreTypes";

import { useScrollY } from "@ui/AppWrapper";

import Task from "./Task";
import TaskSection, { type TTaskSection } from "./TaskSection";

const HEADER_HEIGHT = 120;

export default function TaskList() {
  const scrollY = useScrollY();
  const tasks = useTasksStore((state) => state.tasks);
  const hideCompleted = useTasksStore((state) => state.hideCompleted);
  const setEditButtonVisible = useTasksStore((state) => state.setEditButtonVisible);
  const [isPaddingBottom, setIsPaddingBottom] = useState(false);
  const listHeight = useRef(0);
  const sectionListRef = useRef<Animated.SectionList<TTask, TTaskSection>>(null);

  const screenHeight = Dimensions.get("window").height;
  const treshholdHeight = screenHeight * 0.75;

  const sections = useMemo<TTaskSection[]>(() => {
    const todoTasks = tasks.filter((task) => task.done === -1);
    const doneTasks = hideCompleted ? [] : tasks.filter((task) => task.done === 1);

    return [
      { title: "ToDo", data: todoTasks },
      { title: "Done", data: doneTasks },
    ].filter((section) => section.data.length > 0);
  }, [tasks, hideCompleted]);

  const onScrollEndDrag = () => {
    if (
      sectionListRef.current &&
      listHeight.current - treshholdHeight + HEADER_HEIGHT < screenHeight &&
      isPaddingBottom &&
      sections.length > 0
    ) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  const onScroll = !isPaddingBottom
    ? Animated.event([{ nativeEvent: { contentOffset: { y: scrollY! } } }], {
        useNativeDriver: false,
      })
    : undefined;

  const onContentSizeChange = (_: unknown, contentHeight: number) => {
    listHeight.current = contentHeight;

    const hasPadding = contentHeight - screenHeight / 3 < treshholdHeight;
    hasPadding && setIsPaddingBottom(true);

    const hasAnimation = contentHeight - treshholdHeight > treshholdHeight;
    hasAnimation && setIsPaddingBottom(false);

    const hasSections = sections.length > 0;
    setEditButtonVisible(hasSections);
  };

  const contentContainerStyle = {
    paddingBottom: isPaddingBottom ? treshholdHeight : screenHeight / 3,
  };

  return (
    <Animated.SectionList
      ref={sectionListRef}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      scrollEventThrottle={16}
      sections={sections}
      onScrollEndDrag={onScrollEndDrag}
      renderItem={({ item }) => <Task task={item} />}
      renderSectionHeader={TaskSection}
      keyExtractor={(item) => item.id}
      onContentSizeChange={onContentSizeChange}
    />
  );
}
