import * as SQLite from "expo-sqlite";

import { TTask } from "@/store/taskStoreTypes";

const DATABASE_NAME = process.env.EXPO_PUBLIC_DATABASE_NAME as string;

export const initializeDatabase = async (): Promise<TTask[]> => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

    await db.withExclusiveTransactionAsync(async (txn) => {
      await txn.execAsync(
        `CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          done INTEGER
        );`,
      );
    });

    const tasks = (await db.getAllAsync("SELECT * FROM tasks")) as TTask[];
    await db.closeAsync();
    return tasks;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};

export const executeQuery = async (query: string, values: any[] | any): Promise<void> => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync(query, values);
    await db.closeAsync();
  } catch (error) {
    console.error("Failed to execute query:", error);
    throw error;
  }
};

export const executeEachQuery = async (query: string, valuesList: any[] | any): Promise<void> => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const queries = await valuesList.map(async (values: TTask) => {
      await db.runAsync(query, values.id);
    });
    await Promise.all(queries);
    await db.closeAsync();
  } catch (error) {
    console.error("Failed to execute query:", error);
    throw error;
  }
};
