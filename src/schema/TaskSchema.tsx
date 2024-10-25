import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    assignedBy: z.string().min(1),
    assignedTo: z.string().min(1)
}).required();