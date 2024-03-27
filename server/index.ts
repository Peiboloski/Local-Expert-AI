import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { getAndUpdateCityDescription } from './controllers/getAdnUpdateCityDescription';

export const appRouter = router({
    getCitySummary: publicProcedure
        .input(
            z.object({
                cityName: z.string(),
                cityId: z.number(),
                cityCountry: z.string(),
            })
        )
        .query(async (opts) => {
            const { cityName, cityId, cityCountry } = opts.input;
            const summary = await getAndUpdateCityDescription({ cityName, cityId, cityCountry });
            return summary;
        })
})

export type AppRouter = typeof appRouter