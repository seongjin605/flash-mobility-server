import { Greeting } from 'src/types/graph';

const resolvers = {
    Query: {
        sayHello: (): Greeting => {
            return {
                text: 'This is Error',
                error: true
            };
        }
    }
};

export default resolvers;
