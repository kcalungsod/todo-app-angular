export interface TaskEntry {
    id: string,
    taskName: string,
    description?: string,
    withDateDue: boolean,
    dateDue?: Date,
    isCompleted: boolean,
    dateCompleted?: Date,
    priorityTag?: string,
    subTasks?: subTaskEntry[],
    recurringTask?: boolean,
    recurringTaskID: string,
    schedule?: string,
    dateCreated: Date,
    nextDueDate?: Date
}

export interface subTaskEntry {
    subTask?: string,
    done?: boolean,
    dateCompleted?: Date
}