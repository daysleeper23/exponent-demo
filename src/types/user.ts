import { z } from "zod";

//USERS
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty({ message: "User's name could not be empty." }),
  avatarUrl: z.string().optional(),
  email: z.string().email(),
  onlineStatus: z.enum(['Online', 'Offline', 'Away', 'Busy']),
  team: z.string().uuid(),
});
export type User = z.infer<typeof UserSchema>;