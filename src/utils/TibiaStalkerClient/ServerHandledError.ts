import IServerError from "./IServerErrorDetails";

class ServerHandledError implements IServerError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;

  // TODO better support
  constructor(data: any) {
    this.type = data.type;
    this.title = data.title;
    this.status = data.status;
    this.detail = data.detail;
    this.instance = data.instance;
  }
}

export default ServerHandledError;
