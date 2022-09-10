export interface TaskEntry {
    id: string,
    taskName: string,
    description?: string,
    withDateDue: boolean,
    dateDue?: Date,
    isCompleted: boolean,
    dateCompleted?: Date,
    priorityTag?: string,
    subTasks?: object[],
    recurringTask?: boolean,
    recurringTaskID: string,
    schedule?: string,
    dateCreated: Date
}