interface DataNode {
  firstName: string;
  lastName: string;
  clientId: string;
}

export interface ResponseModel {
  statusCode: number;
  data: DataNode;
}
