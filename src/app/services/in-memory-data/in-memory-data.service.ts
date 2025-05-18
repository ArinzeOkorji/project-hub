import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { ITask } from '../../core/interfaces/task';
import { IProject } from '../../core/interfaces/project';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const projects: IProject[] = [
      { id: 1, name: 'Test Project', description: 'For demonstration purposes only. Feel free to delete this project and start creating your project(s) and task(s)', dateCreated: new Date() },
    ];

    const tasks: ITask[] = [
      { id: 1, projectId: 1, name: 'Task 1', description: 'Description 1', dateCreated: new Date(), status: 'Completed' },
      { id: 2, projectId: 1, name: 'Task 2', description: 'Description 2', dateCreated: new Date(), status: 'In Progress' }
    ];
    return {
      projects: JSON.parse(localStorage.getItem('projects') as string) || projects, 
      tasks: JSON.parse(localStorage.getItem('tasks') as string) || tasks,
    };
  }


  get(requestInfo: RequestInfo) {
    let collection = requestInfo.collection as any[];
    const query = requestInfo.query;


    if (requestInfo.id) {
      const index = collection.findIndex((item) => item.id === parseInt(requestInfo.id, 10));
      if (index > -1) {
        return requestInfo.utils.createResponse$(() => (
          {
          body: {
            data: collection[index],
            // length: collection.length
          },
          status: 200,
          headers: requestInfo.headers,
          url: requestInfo.url
        }));
      }
    }


    if (requestInfo.collectionName === 'projects') {
      const page = parseInt(query.get('page')?.[0] || '1', 10);
      const limit = parseInt(query.get('limit')?.[0] || '10', 10);
      const search = query.get('search')?.[0] || '';

      if(search) {
        collection = collection.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
        })
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const pagedData = collection.slice(start, end);
      return requestInfo.utils.createResponse$(() => (
        {
        body: {
          data: pagedData,
          length: collection.length
        },
        status: 200,
        headers: requestInfo.headers,
        url: requestInfo.url
      }));
    } else if(requestInfo.collectionName === 'tasks') {
      const projectTasks = collection.filter(task => task.projectId === parseInt(query.get('projectId')?.[0] || '1', 10))
      return requestInfo.utils.createResponse$(() => (
        {
        body: {
          data: projectTasks,
          length: projectTasks.length
        },
        status: 200,
        headers: requestInfo.headers,
        url: requestInfo.url
      }));
    }






    // fall back to default
    return undefined;
  }
  post(requestInfo: RequestInfo) {
    const collection = requestInfo.collection as any[];
    const newItem = { ...(requestInfo.req as HttpRequest<any>).body, id: collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1 };  
    collection.unshift(newItem);
      return requestInfo.utils.createResponse$(() => (
        localStorage.removeItem(requestInfo.collectionName),
        localStorage.setItem(requestInfo.collectionName, JSON.stringify(collection)),
        {
        body: {},
        status: 200,
        headers: requestInfo.headers,
        url: requestInfo.url
      }));

    return undefined;
  }
  delete(requestInfo: RequestInfo) {
    const id = parseInt(requestInfo.id, 10);
    const collection = requestInfo.collection as any[];
    const index = collection.findIndex((item) => item.id === id);
    if (index > -1) {
      collection.splice(index, 1);

      if(requestInfo.collectionName === 'projects') {
        const db = requestInfo.utils.getDb() as { tasks: ITask[] };

        db.tasks = db.tasks.filter((task) => task.projectId !== id);
        
        localStorage.removeItem('tasks'),
        localStorage.setItem('tasks', JSON.stringify(db.tasks));

        
      }

      return requestInfo.utils.createResponse$(() => (
        localStorage.removeItem(requestInfo.collectionName),
        localStorage.setItem(requestInfo.collectionName, JSON.stringify(collection)),
        {
        body: {},
        status: 200,
        headers: requestInfo.headers,
        url: requestInfo.url
      }));
    }

    return undefined;
  }

  put(requestInfo: RequestInfo) {
    const id = parseInt(requestInfo.id, 10);
    const collection = requestInfo.collection as any[];
    const index = collection.findIndex((item) => item.id === id);
    if (index > -1) {
      const updatedItem = { ...(requestInfo.req as HttpRequest<any>).body, id };
      collection[index] = updatedItem;
      return requestInfo.utils.createResponse$(() => (
        localStorage.removeItem(requestInfo.collectionName),
        localStorage.setItem(requestInfo.collectionName, JSON.stringify(collection)),
        {
        body: updatedItem,
        status: 200,
        headers: requestInfo.headers,
        url: requestInfo.url
      }));
    }

    return undefined;
  }
}
