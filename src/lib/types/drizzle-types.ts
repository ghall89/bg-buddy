import { InferSelectModel } from 'drizzle-orm';

import { games } from '@/db/drizzle/schema';

export type PgGameDetails = InferSelectModel<typeof games>;
