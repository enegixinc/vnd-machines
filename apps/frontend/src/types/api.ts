export interface ApiClient<T, S> {
    getMany: (params: any) => Promise<{ data: T[]; total: number }>;
    deleteOne: (params: { id: string }) => Promise<void>;
    recoverOne: (params: { id: string }) => Promise<void>;
    createOne: (params: any) => Promise<any>;
    getOne: (params: S) => Promise<T>;
}
