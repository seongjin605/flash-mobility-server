import {
    EditPlaceMutationArgs,
    EditPlaceResponse
} from './../../../types/graph.d';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Place from '../../../entities/Place';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(
            async (
                _,
                args: EditPlaceMutationArgs,
                { req }
            ): Promise<EditPlaceResponse> => {
                const user: User = req.user;
                try {
                    // relations 설정에 user 엔티티를 넣어주면 요청에따라서 유저정보를 가져올 수 있지만,
                    // 많은 유저정보들이 필요없으면 Place entity에 유저 아이디만 처음부터 넣는것이 더 효율적으로 생각됨.
                    // const place = await Place.findOne({id: args.placeId}, {relations:["user"]});
                    const place = await Place.findOne({ id: args.placeId });
                    if (place) {
                        if (place.userId === user.id) {
                            const notNull = cleanNullArgs(args);
                            await Place.update(
                                { id: args.placeId },
                                { ...notNull }
                            );
                            return {
                                ok: true,
                                error: null
                            };
                        } else {
                            return {
                                ok: false,
                                error: 'Not Authorized'
                            };
                        }
                    } else {
                        return {
                            ok: false,
                            error: 'Place not found'
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};

export default resolvers;
