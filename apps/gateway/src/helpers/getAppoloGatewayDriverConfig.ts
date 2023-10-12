import { RemoteGraphQLDataSource, IntrospectAndCompose } from '@apollo/gateway';

import type { ServicesConfig } from '../config/services.config';
import type { ApolloGatewayDriverConfig } from '@nestjs/apollo';

export const getApolloGatewayDriverConfig = async ({
	productsServiceHost,
	productsServicePort,
	cartsServiceHost,
	cartsServicePort,
	ordersServiceHost,
	ordersServicePort,
	usersServiceHost,
	usersServicePort,
}: ServicesConfig): Promise<Omit<ApolloGatewayDriverConfig<any>, 'driver'>> => ({
	server: {
		context: ({ req }: any) => {
			return { req };
		},
	},
	gateway: {
		buildService({ url }) {
			return new RemoteGraphQLDataSource({
				url,
				willSendRequest({ request, context }) {
					request.http.headers.set('user', context?.req?.user ? JSON.stringify(context?.req?.user) : null);
				},
			});
		},
		supergraphSdl: new IntrospectAndCompose({
			subgraphs: [
				{
					name: 'Products',
					url: `http://${productsServiceHost}:${productsServicePort}/graphql`,
				},
				{
					name: 'Carts',
					url: `http://${cartsServiceHost}:${cartsServicePort}/graphql`,
				},
				{
					name: 'Users',
					url: `http://${usersServiceHost}:${usersServicePort}/graphql`,
				},
				{
					name: 'Orders',
					url: `http://${ordersServiceHost}:${ordersServicePort}}/graphql`,
				},
			],
		}),
	},
});
