type Ok<T> = {
	ok: true
	value: T
};

type Fail<K> = {
	ok: false
	value: K
};

export type Result<T, K> = Ok<T> | Fail<K>;

export const Result = {
	Ok<T>(value: T): Result<T, never> {
		return {
			ok: true,
			value
		};
	},
	Fail<K>(value: K): Result<never, K> {
		return {
			ok: false,
			value
		};
	}
};
