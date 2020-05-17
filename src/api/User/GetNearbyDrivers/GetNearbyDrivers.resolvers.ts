import { GetNearbyDriversResponse } from './../../../types/graph.d';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';
import { Between, getRepository } from 'typeorm';

const resolvers: Resolvers = {
    Query: {
        GetNearbyDrivers: privateResolver(
            async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
                const user: User = req.user;
                const { lastLat, lastLng } = user;
                try {
                    const drivers: User[] | any = await getRepository(
                        User
                    ).findOne({
                        isDriving: true,
                        lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                        lastLng: Between(lastLng - 0.5, lastLng + 0.5)
                    });
                    return {
                        ok: true,
                        error: null,
                        drivers
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        drivers: null
                    };
                }
            }
        )
    }
};

export default resolvers;
