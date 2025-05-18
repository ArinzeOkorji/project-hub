export interface ITask { 
    id: number,
    projectId: number,
    name: string,
    description: string,
    status: string,
    dateCreated: Date,
}