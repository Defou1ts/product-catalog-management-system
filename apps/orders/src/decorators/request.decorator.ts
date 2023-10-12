import { createParamDecorator } from '@nestjs/common';

import type { GraphQLExecutionContext } from '@nestjs/graphql';

export const GraphQLResponse = createParamDecorator((_data: any, ctx: GraphQLExecutionContext) => {
	try {
		const response = ctx.getArgs()[2].req.res;
		return response;
	} catch (err) {
		return null;
	}
});
