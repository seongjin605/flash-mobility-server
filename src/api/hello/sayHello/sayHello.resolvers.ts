import { SayHelloQueryArgs, sayHelloResponse } from 'src/types/graph';

const resolvers = {
    Query: {
        sayHello: (_, args: SayHelloQueryArgs): sayHelloResponse => {
            return {
                error: true,
                text: `Hello ${args.name}`
            };
        }
    }
};

export default resolvers;
