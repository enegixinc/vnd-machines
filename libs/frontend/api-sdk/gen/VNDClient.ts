import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuthService } from './services.gen';
import { BrandsService } from './services.gen';
import { CategoriesService } from './services.gen';
import { ContractsService } from './services.gen';
import { ProductsService } from './services.gen';
import { UsersService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class VNDClient {

	public readonly auth: AuthService;
	public readonly brands: BrandsService;
	public readonly categories: CategoriesService;
	public readonly contracts: ContractsService;
	public readonly products: ProductsService;
	public readonly users: UsersService;

	public readonly request: BaseHttpRequest;

	constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? '',
			VERSION: config?.VERSION ?? '1.0',
			WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
			CREDENTIALS: config?.CREDENTIALS ?? 'include',
			TOKEN: config?.TOKEN,
			USERNAME: config?.USERNAME,
			PASSWORD: config?.PASSWORD,
			HEADERS: config?.HEADERS,
			ENCODE_PATH: config?.ENCODE_PATH,
			interceptors: {
				request: config?.interceptors?.request ?? new Interceptors(),
				response: config?.interceptors?.response ?? new Interceptors(),
      },
		});

		this.auth = new AuthService(this.request);
		this.brands = new BrandsService(this.request);
		this.categories = new CategoriesService(this.request);
		this.contracts = new ContractsService(this.request);
		this.products = new ProductsService(this.request);
		this.users = new UsersService(this.request);
	}
}
