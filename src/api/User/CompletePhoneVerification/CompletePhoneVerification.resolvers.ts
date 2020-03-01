import {
    CompletePhoneVerificationmutationArgs,
    CompletePhoneVerificationResponse
} from './../../../types/graph.d';
import { Resolvers } from './../../../types/resolvers.d';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (
            _,
            args: CompletePhoneVerificationmutationArgs
        ): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try {
                const verification = await Verification.findOne({
                    payload: phoneNumber,
                    key
                });
                if (!verification) {
                    return {
                        ok: false,
                        error: 'Verification token not valid',
                        token: null
                    };
                } else {
                    verification.verified = true;
                    verification.save();
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.Message,
                    token: null
                };
            }
            try {
                const user = await User.findOne({ phoneNumber });
                if (user) {
                    user.verifiedPhoneNumber = true;
                    user.save();
                    return {
                        ok: true,
                        error: null,
                        token: 'token comming soon'
                    };
                } else {
                    return {
                        ok: true,
                        error: null,
                        token: null
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};

export default resolvers;
