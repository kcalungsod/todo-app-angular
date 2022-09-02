export interface TaskEntry {
    id: string,
    name: string,
    description?: string,
    withDateDue: boolean,
    dateDue?: Date,
    isCompleted: boolean,
    dateCompleted?: Date
}