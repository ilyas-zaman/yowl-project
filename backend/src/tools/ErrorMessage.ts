const ErrorMessages = {
	// General
	Wrong: 'wrong',
	DoesNotExist: 'does not exist',
	IsNotValid: 'is not valid',
	Unknow: 'unknow',
	IsRequiredOrEmpty: 'is required or empty',
	AlreadyExist: 'already exist',

	// Email
	IsNotValidEmail: 'is not a valid email',

	// URL
	IsNotValidURL: 'is not a valid URL',

	// Password
	TooShortPassword: 'is too short. Must be at least 8 characters',
	TooLongPassword: 'is too long. Must be less than 50 characters',

	// Login
	Unauthorized: "unauthorized",
	TokenEmpty: "complete the section ('Authorization') to continue",
	TokenInvalidOrExpired: "invalid or expired",
	UnauthorizedMessage: "Oops ! You are not authorized to do this action.",
	AdminOnly: "Section reserved to admin only !",
} as const;

type ErrorMessage = typeof ErrorMessages[keyof typeof ErrorMessages]

export { ErrorMessages }
export type { ErrorMessage }
