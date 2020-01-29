import { Client } from '@microsoft/microsoft-graph-client';
import { GraphAuthProvider } from './GraphAuthProvider';

// Set the authProvider to an instance
// of GraphAuthProvider
const clientOptions = {
  authProvider: new GraphAuthProvider()
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

export class GraphManager {
  static getUserAsync = async() => {
    // GET /me
    return graphClient.api('/me').get();
  }

  static getTareas = async() => {
    // GET /sites/grupoenvision.sharepoint.com:/sites/demos/AprobacionMovil:/lists/Tarea/items?expand=fields(select=Title, Estado)
    return graphClient.api('/sites/grupoenvision.sharepoint.com:/sites/demos/AprobacionMovil:/lists/Tarea/items?expand=fields')
    .get();
  }

  static patchTareas = async(itemId) => {
    const fieldValueSet = {
      Estado: "Aprobada"
  };
    return graphClient.api('/sites/grupoenvision.sharepoint.com:/sites/demos/AprobacionMovil:/lists/Tarea/items/'+itemId+'/fields')
    .update(fieldValueSet);
  }

  static getEvents = async() => {
    // GET /me/events
    alert(JSON.stringify(await graphClient.api('/me/events')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get()));
    return graphClient.api('/me/events')
      // $select='subject,organizer,start,end'
      // Only return these fields in results
      .select('subject,organizer,start,end')
      // $orderby=createdDateTime DESC
      // Sort results by when they were created, newest first
      .orderby('createdDateTime DESC')
      .get();
  }
}