import {
    User,
    CompleteEmailVerificationMutationArgs,
    CompleteEmailVerificationResponse
} from './../../../types/graph.d';
import { Resolvers } from './../../../types/resolvers.d';
import privateResolver from '../../../utils/privateResolver';
import Verification from '../../../entities/Verification';
const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: privateResolver(
            async (
                _,
                args: CompleteEmailVerificationMutationArgs,
                { req }
            ): Promise<CompleteEmailVerificationResponse> => {
                const user: User = req.user;
                const { key } = args;
                if (user.email) {
                    try {
                        const verifiedUser = await Verification.findOne({
                            key,
                            payload: user.email
                        });
                        if (verifiedUser) {
                            user.verifiedEmail = true;
                            verifiedUser.save();
                            return {
                                ok: true,
                                error: null
                            };
                        } else {
                            return {
                                ok: false,
                                error: 'Cannot Verify Email'
                            };
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: 'No email to verify'
                    };
                }
            }
        )
    }
};

export default resolvers;
