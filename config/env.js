import dotenv from "dotenv";
dotenv.config();
import { object, z } from "zod";

// const portSchema = z.coerce.number().min(1).max(65535).default(3000);
// const PORT = portSchema.parse(process.env.PORT);
// export default PORT;

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);
