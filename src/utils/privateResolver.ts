const privateResolver = resolverFunction => async (
    parent,
    args,
    context,
    info
) => {
    if (!context.req.user) {
        throw new Error('No JWT. Refuse to proceed');
    }
    const resolved = await resolverFunction(parent, args, context, info);
    console.log('parent:', parent);
    console.log('args:', args);
    console.log('context:', context);
    console.log('info:', info);
    return resolved;
};

export default privateResolver;
