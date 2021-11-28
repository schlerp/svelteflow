const Resource = (apiRoot: string, resName: string) => ({
  create: function create(data) {
    return fetch(`${apiRoot}/${resName}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });
  },
  read: function read(resID: string) {
    return fetch(`${apiRoot}/${resName}/${resID}`, {
      method: "GET",
    });
  },
  readall: function read() {
    return fetch(`${apiRoot}/${resName}`, {
      method: "GET",
    });
  },
  update: function update(data: any) {
    return fetch(`${apiRoot}/${resName}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });
  },
  delete: function del(resID: string) {
    return fetch(`${apiRoot}/${resName}/${resID}`, {
      method: "DELETE",
    });
  },
  command: function custom(path: string) {
    return fetch(`${apiRoot}/${path}`, {
      method: "GET",
    });
  },
});

export const APIClient = (apiRoot: string) => ({
  table: Resource(apiRoot, "table"),
  column: Resource(apiRoot, "column"),
  database: Resource(apiRoot, "database"),
  transform: Resource(apiRoot, "transform"),
  flows: Resource(apiRoot, "flow"),
});

export default APIClient;
