import IServerError from "./IServerErrorDetails";

class ServerUnhandledError implements IServerError {
  detail: string;
  constructor(
    public status: number,
    public statusText: string,
  ) {
    this.detail = "Something went wrong. Try it later";
  }
}

export default ServerUnhandledError;
