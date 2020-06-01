import User from '../../../entities/User';
import Ride from '../../../entities/Ride';
import {
    RequestRideMutationArgs,
    RequestRideResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
    Mutation: {
        RequestRide: privateResolver(
            async (
                _,
                args: RequestRideMutationArgs,
                { req, pubSub }
            ): Promise<RequestRideResponse> => {
                const user: User = req.user;
                if (!user.isRiding && !user.isDriving) {
                    try {
                        const ride = await Ride.create({
                            ...args,
                            passenger: user
                        }).save();
                        user.isRiding = true;
                        user.save();
                        pubSub.publish('rideRequest', {
                            NearByRideSubscription: ride
                        });
                        return {
                            ok: true,
                            error: null,
                            ride
                        };
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error:
                            'You cannnot Request two Rides or driver and request',
                        ride: null
                    };
                }
            }
        )
    }
};

export default resolvers;
