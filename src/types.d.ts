type InputType = 'url' | 'token' | 'message' | 'title' | 'priority' | 'contentType' | 'clickUrl' | 'bigImageUrl' | 'intentUrl' | 'extras';

type DisplayContentType = 'text/plain' | 'text/markdown';

interface ExtrasType {
  [key: string]: object;
}

type Inputs = Record<InputType, string>;

interface SendInputs extends Partial<Omit<Inputs, 'url' | 'token'>> {
  apiUrl: string;
  message: string;
  priority?: number;
  contentType: string;
  extras?: ExtrasType | null;
}

interface MessageBody {
  message: string;
  title?: string;
  priority?: number;
  extras: ExtrasType;
}

interface MessageResponse extends MessageBody {
  appid: number;
  date: string;
  id: number;
}

interface BadResponse {
  error: string;
  errorCode: number;
  errorDescription: string;
}
