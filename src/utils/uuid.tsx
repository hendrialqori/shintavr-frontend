import { v4 as uuidv4 } from "uuid";

export const UUID = (uuidv4() as any).replaceAll("-", "").slice(0, 15);
