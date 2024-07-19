import { charactersUrl } from "../../constants/api";
import ServerHandledError from "./ServerHandledError";
import ServerUnhandledError from "./ServerUnhandledError";

const tibiaStalkerClient = async <T>(path: string) => {
  const response = await fetch(`${charactersUrl}${path}`);

  if (!response.ok && response.body) {
    const data = await response.json();
    return Promise.reject(new ServerHandledError(data));
  } else if (!response.ok) {
    return Promise.reject(
      new ServerUnhandledError(response.status, response.statusText),
    );
  }

  const data: T = await response.json();
  return Promise.resolve(data);
};

export default tibiaStalkerClient;
