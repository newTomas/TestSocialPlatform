export type TTransactionClient = any;

export interface IDatabaseService {
	runInTransaction<T>(callback: (tx: TTransactionClient) => Promise<T>): Promise<T>;
}
