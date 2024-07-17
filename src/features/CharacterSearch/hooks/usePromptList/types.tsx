type SetPromptData = (promptData: string[]) => void;
export type FetchPromptList = (input: string, setPromptData: SetPromptData) => Promise<void>;
