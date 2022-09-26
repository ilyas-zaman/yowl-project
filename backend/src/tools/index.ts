// A COMPRENDRE ...

const isSomeEnum =
	<T>(e: T) =>
	(token: unknown): token is T[keyof T] => {
		return Object.values(e).includes(token as T[keyof T]);
	};
    //if (isSomeEnum(ErrorMessages)(str))

// ...

export * from './HttpStatus';
export * from './ErrorMessage';
export { isSomeEnum };
