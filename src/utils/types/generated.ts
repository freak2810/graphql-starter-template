/* eslint-disable unicorn/no-abusive-eslint-disable */
/*  eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'src/utils/types/context';
import { z } from 'zod';
import { PhoneNumber } from 'libphonenumber-js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error. */
  DateTime: Date;
  /** A field whose value conforms to the standard internet email address format as specified in {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address HTML Spec}. */
  Email: string;
  /** The JSON scalar type represents JSON values as specified by {@link http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf ECMA-404}. */
  JSON: Record<string | number, any>;
  /** A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character */
  Password: string;
  /** A field whose value conforms to the standard Phone number format (based on Google's Phone Number Library) format. The very powerful {@link https://github.com/googlei18n/libphonenumber libphonenumber } library is available to take that format, parse and display it in whatever display format you want. It can also be used to parse user input and get the E.164 format to pass into a schema. */
  PhoneNumber: PhoneNumber;
  /** A field whose value conforms to the Postal Code of the Address component */
  PostalCode: string;
  /** A field whose value conforms to the standard URL format as specified in {@link https://www.ietf.org/rfc/rfc3986.txt RFC3986}, and it uses real JavaScript URL objects. */
  URL: string;
};

/** Status of an authentication attempt */
export type AuthenticationStatus = 'FAILED' | 'SUCCESS';

/** Strategies that can be used by a user to authenticate */
export type AuthenticationStrategy = 'EMAIL_CODE' | 'EMAIL_PASSWORD' | 'PHONE_NUMBER_CODE' | 'PHONE_NUMBER_PASSWORD';

/** Response a user gets when a verification code is sent to email/ phone number */
export type CodeResponse = {
  __typename?: 'CodeResponse';
  /** client's email/ phone number it is sent to */
  sentTo: Scalars['String'];
  /** status if the otp is sent or not */
  status: AuthenticationStatus;
  /** strategy used to login */
  strategy: AuthenticationStrategy;
  /** validity of the verification code */
  validity: Scalars['Int'];
};

/** Type of the platform to send the message to */
export type ContactType = 'EMAIL' | 'SMS' | 'WHATSAPP';

export type CreateUserInput = {
  /** Email of the user. */
  email?: InputMaybe<Scalars['Email']>;
  /** Name of the user. */
  name: CreateUserNameInput;
  /** Password of the user. Leave it as "" if you only want to provide password-less strategies */
  password?: InputMaybe<Scalars['Password']>;
  /** Phone number of the user. */
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
  /** List of authentication strategies that the user has enabled. */
  strategies: Array<AuthenticationStrategy>;
};

export type CreateUserNameInput = {
  /** First name of the user. */
  first: Scalars['String'];
  /** Last name of the user. */
  last: Scalars['String'];
};

export type DeleteUserMutationArgs = {
  /** The ID of the user to update. */
  _id: Scalars['String'];
};

/** Every record of the user's login */
export type LoginHistory = {
  __typename?: 'LoginHistory';
  /**
   * Unique MongoDB Object ID for the record.
   *  * Created using mongodb package
   */
  _id: Scalars['ID'];
  /** User's Login */
  strategy?: Maybe<AuthenticationStrategy>;
  /** Timestamp of when the user is logged in */
  timestamp: Scalars['DateTime'];
  /** User's ID */
  userId: Scalars['ID'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** refresh token */
  refreshToken: Scalars['String'];
  /** status if the user is logged in */
  status: AuthenticationStatus;
  /** strategy used to login */
  strategy: AuthenticationStrategy;
  /** authentication token */
  token: Scalars['String'];
};

/** Input type for login with email and otp */
export type LoginWithEmailAndCodeMutationInput = {
  /** Password of the user */
  code: Scalars['String'];
  /** Email of the user */
  email: Scalars['Email'];
};

/** Input type for login with email and password */
export type LoginWithEmailAndPasswordMutationInput = {
  /** Email of the user */
  email: Scalars['Email'];
  /** Password of the user */
  password: Scalars['Password'];
};

/** Input type for login with phone number and otp */
export type LoginWithPhoneNumberAndCodeMutationInput = {
  /** Password of the user */
  code: Scalars['String'];
  /** Phone number of the user */
  phoneNumber: Scalars['PhoneNumber'];
};

/** Input type for login with phone number and password */
export type LoginWithPhoneNumberAndPasswordMutationInput = {
  /** Password of the user */
  password: Scalars['Password'];
  /** Phone number of the user */
  phoneNumber: Scalars['PhoneNumber'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Confirm the Email for verification */
  confirmEmailForVerification: User;
  /** Confirm the Phone number for verification */
  confirmPhoneNumberForVerification: User;
  /** Mutation to create a new user */
  createUser: User;
  /** Mutation to delete an existing user */
  deleteUser: User;
  /** Verify the verification code for the email and login the user */
  loginWithEmailAndCode: LoginResponse;
  /** Mutation to login a user using email and password */
  loginWithEmailAndPassword: LoginResponse;
  /** Verify the verification code for the phone number and login the user */
  loginWithPhoneNumberAndCode: LoginResponse;
  /** Mutation to login a user using phone number and password */
  loginWithPhoneNumberAndPassword: LoginResponse;
  /** Mutation to refresh token */
  refreshToken: LoginResponse;
  /** Mutation to reset a user's password when forgot */
  resetUserPassword: User;
  /** Mutation to send a verification code to the user's email */
  sendCodeToEmail: CodeResponse;
  /** Mutation to send a verification code to the user's phone number */
  sendCodeToPhoneNumber: CodeResponse;
  /** Verify email */
  sendEmailForVerification: CodeResponse;
  /** Mutation to send a verification code to the user's email/ phone number to reset password */
  sendMessageForPasswordReset: CodeResponse;
  /** Verify Phone number */
  sendTextMessageForVerification: CodeResponse;
  /** Mutation to update an existing user */
  updateUser: User;
  /** Mutation to update the password for an existing user */
  updateUserPassword: User;
};

export type MutationConfirmEmailForVerificationArgs = {
  input: LoginWithEmailAndCodeMutationInput;
};

export type MutationConfirmPhoneNumberForVerificationArgs = {
  input: LoginWithPhoneNumberAndCodeMutationInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  where: DeleteUserMutationArgs;
};

export type MutationLoginWithEmailAndCodeArgs = {
  input: LoginWithEmailAndCodeMutationInput;
};

export type MutationLoginWithEmailAndPasswordArgs = {
  input: LoginWithEmailAndPasswordMutationInput;
};

export type MutationLoginWithPhoneNumberAndCodeArgs = {
  input: LoginWithPhoneNumberAndCodeMutationInput;
};

export type MutationLoginWithPhoneNumberAndPasswordArgs = {
  input: LoginWithPhoneNumberAndPasswordMutationInput;
};

export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};

export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordMutationInput;
};

export type MutationSendCodeToEmailArgs = {
  config?: InputMaybe<SendCodeMutationConfigurationInput>;
  email: Scalars['Email'];
};

export type MutationSendCodeToPhoneNumberArgs = {
  config?: InputMaybe<SendCodeMutationConfigurationInput>;
  phoneNumber: Scalars['PhoneNumber'];
  platform?: InputMaybe<TextMessagePlatform>;
};

export type MutationSendEmailForVerificationArgs = {
  config?: InputMaybe<SendCodeMutationConfigurationInput>;
  email: Scalars['Email'];
};

export type MutationSendMessageForPasswordResetArgs = {
  _id: Scalars['String'];
  config?: InputMaybe<SendCodeMutationConfigurationInput>;
  platform: ContactType;
};

export type MutationSendTextMessageForVerificationArgs = {
  config?: InputMaybe<SendCodeMutationConfigurationInput>;
  phoneNumber: Scalars['PhoneNumber'];
  platform?: InputMaybe<TextMessagePlatform>;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  where: UpdateUserMutationArgs;
};

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
  where: UpdateUserPasswordMutationArgs;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch user by token */
  me?: Maybe<User>;
  /** Fetch a user based on the details */
  user: User;
  /** Fetch more than one or more users based on the query parameters */
  users: Array<User>;
};

export type QueryUserArgs = {
  where: UserQueryArgs;
};

export type QueryUsersArgs = {
  where?: InputMaybe<UserQueryArgs>;
};

/** Input type for login with email and otp */
export type ResetUserPasswordMutationInput = {
  /** Email of the user */
  clientContact: Scalars['String'];
  /** Password of the user */
  code: Scalars['String'];
};

/** Input type for changing configuration of the verification code */
export type SendCodeMutationConfigurationInput = {
  /**
   * Length of the Code
   *
   * @default 4
   */
  codeLength?: InputMaybe<Scalars['Int']>;
  /**
   * Expire time of the code (in minutes)
   *
   * @default 10
   */
  expireTime?: InputMaybe<Scalars['Int']>;
  /**
   * Type of verification code.
   * * e.g numeric, alphanumeric, etc
   *
   * @default NUMERIC
   */
  type?: InputMaybe<VerificationCodeType>;
};

/** Type of platform to send message to */
export type TextMessagePlatform = 'SMS' | 'WHATSAPP';

export type UpdateUserInput = {
  /** Email of the user. */
  email?: InputMaybe<Scalars['Email']>;
  /** Name of the user. */
  name?: InputMaybe<UpdateUserNameInput>;
  /** Phone number of the user. */
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
};

export type UpdateUserMutationArgs = {
  /** The ID of the user to update. */
  _id: Scalars['String'];
};

export type UpdateUserNameInput = {
  /** First name of the user. */
  first: Scalars['String'];
  /** Last name of the user. */
  last: Scalars['String'];
};

export type UpdateUserPasswordInput = {
  /** The new password for the user. */
  newPassword: Scalars['Password'];
  /**
   * Existing password of the user.
   *
   * * Note: Leave it empty if there was no password before
   */
  oldPassword?: InputMaybe<Scalars['Password']>;
};

export type UpdateUserPasswordMutationArgs = {
  /** The ID of the user to update. */
  _id: Scalars['String'];
};

/** User object containing all the details relevant to the authentication and authorization of a user */
export type User = {
  __typename?: 'User';
  /**
   * Unique MongoDB Object ID for the record.
   * * Created using mongodb package
   */
  _id: Scalars['ID'];
  /**
   * Email of the user.
   *
   * * Note: This is optional here but will be validated based on the type of authentication. So if any operation uses email, then this will have to exist
   */
  email?: Maybe<Scalars['Email']>;
  /** Login History of the user. */
  loginHistory?: Maybe<Array<LoginHistory>>;
  /**
   * First and last names of the user.
   *
   * * NOTE: This object can be changed to contain more such properties in the future. For instance, nickname, middle name, etc.
   */
  name: UserName;
  /**
   * Phone number of the user.
   *
   * * Note: This is optional here but will be validated based on the type of authentication. So if any operation uses phone number, then this will have to exist.
   */
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  /** List of authentication strategies that the user has enabled. */
  strategies: Array<AuthenticationStrategy>;
  /** Details of the user's that are verified */
  verified?: Maybe<VerificationList>;
};

export type UserName = {
  __typename?: 'UserName';
  /** First name of the user. */
  first: Scalars['String'];
  /** Last name of the user. */
  last: Scalars['String'];
};

/** At-least one of the query arguments needs to be provided */
export type UserQueryArgs = {
  /** ID of the user */
  _id?: InputMaybe<Scalars['ID']>;
  /** Email of the user */
  email?: InputMaybe<Scalars['Email']>;
  /** Phone number of the user */
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
};

/** Type of code to send to user */
export type VerificationCodeType = 'ALPHABETIC' | 'ALPHA_NUMERIC' | 'NUMERIC';

/** List of the accounts the user has verified */
export type VerificationList = {
  __typename?: 'VerificationList';
  email?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['Boolean']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticationStatus: AuthenticationStatus;
  AuthenticationStrategy: AuthenticationStrategy;
  CodeResponse: ResolverTypeWrapper<CodeResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ContactType: ContactType;
  CreateUserInput: CreateUserInput;
  CreateUserNameInput: CreateUserNameInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteUserMutationArgs: DeleteUserMutationArgs;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LoginHistory: ResolverTypeWrapper<LoginHistory>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  LoginWithEmailAndCodeMutationInput: LoginWithEmailAndCodeMutationInput;
  LoginWithEmailAndPasswordMutationInput: LoginWithEmailAndPasswordMutationInput;
  LoginWithPhoneNumberAndCodeMutationInput: LoginWithPhoneNumberAndCodeMutationInput;
  LoginWithPhoneNumberAndPasswordMutationInput: LoginWithPhoneNumberAndPasswordMutationInput;
  Mutation: ResolverTypeWrapper<{}>;
  Password: ResolverTypeWrapper<Scalars['Password']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  ResetUserPasswordMutationInput: ResetUserPasswordMutationInput;
  SendCodeMutationConfigurationInput: SendCodeMutationConfigurationInput;
  TextMessagePlatform: TextMessagePlatform;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserMutationArgs: UpdateUserMutationArgs;
  UpdateUserNameInput: UpdateUserNameInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPasswordMutationArgs: UpdateUserPasswordMutationArgs;
  User: ResolverTypeWrapper<User>;
  UserName: ResolverTypeWrapper<UserName>;
  UserQueryArgs: UserQueryArgs;
  VerificationCodeType: VerificationCodeType;
  VerificationList: ResolverTypeWrapper<VerificationList>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CodeResponse: CodeResponse;
  String: Scalars['String'];
  Int: Scalars['Int'];
  CreateUserInput: CreateUserInput;
  CreateUserNameInput: CreateUserNameInput;
  DateTime: Scalars['DateTime'];
  DeleteUserMutationArgs: DeleteUserMutationArgs;
  Email: Scalars['Email'];
  JSON: Scalars['JSON'];
  LoginHistory: LoginHistory;
  ID: Scalars['ID'];
  LoginResponse: LoginResponse;
  LoginWithEmailAndCodeMutationInput: LoginWithEmailAndCodeMutationInput;
  LoginWithEmailAndPasswordMutationInput: LoginWithEmailAndPasswordMutationInput;
  LoginWithPhoneNumberAndCodeMutationInput: LoginWithPhoneNumberAndCodeMutationInput;
  LoginWithPhoneNumberAndPasswordMutationInput: LoginWithPhoneNumberAndPasswordMutationInput;
  Mutation: {};
  Password: Scalars['Password'];
  PhoneNumber: Scalars['PhoneNumber'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  ResetUserPasswordMutationInput: ResetUserPasswordMutationInput;
  SendCodeMutationConfigurationInput: SendCodeMutationConfigurationInput;
  URL: Scalars['URL'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserMutationArgs: UpdateUserMutationArgs;
  UpdateUserNameInput: UpdateUserNameInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPasswordMutationArgs: UpdateUserPasswordMutationArgs;
  User: User;
  UserName: UserName;
  UserQueryArgs: UserQueryArgs;
  VerificationList: VerificationList;
  Boolean: Scalars['Boolean'];
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export type CodeResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CodeResponse'] = ResolversParentTypes['CodeResponse']
> = {
  sentTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AuthenticationStatus'], ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['AuthenticationStrategy'], ParentType, ContextType>;
  validity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginHistoryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LoginHistory'] = ResolversParentTypes['LoginHistory']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  strategy?: Resolver<Maybe<ResolversTypes['AuthenticationStrategy']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']
> = {
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AuthenticationStatus'], ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['AuthenticationStrategy'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  confirmEmailForVerification?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmEmailForVerificationArgs, 'input'>
  >;
  confirmPhoneNumberForVerification?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmPhoneNumberForVerificationArgs, 'input'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'where'>
  >;
  loginWithEmailAndCode?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithEmailAndCodeArgs, 'input'>
  >;
  loginWithEmailAndPassword?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithEmailAndPasswordArgs, 'input'>
  >;
  loginWithPhoneNumberAndCode?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithPhoneNumberAndCodeArgs, 'input'>
  >;
  loginWithPhoneNumberAndPassword?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithPhoneNumberAndPasswordArgs, 'input'>
  >;
  refreshToken?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, 'token'>
  >;
  resetUserPassword?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationResetUserPasswordArgs, 'input'>
  >;
  sendCodeToEmail?: Resolver<
    ResolversTypes['CodeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendCodeToEmailArgs, 'email'>
  >;
  sendCodeToPhoneNumber?: Resolver<
    ResolversTypes['CodeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendCodeToPhoneNumberArgs, 'phoneNumber'>
  >;
  sendEmailForVerification?: Resolver<
    ResolversTypes['CodeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendEmailForVerificationArgs, 'email'>
  >;
  sendMessageForPasswordReset?: Resolver<
    ResolversTypes['CodeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageForPasswordResetArgs, '_id' | 'platform'>
  >;
  sendTextMessageForVerification?: Resolver<
    ResolversTypes['CodeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendTextMessageForVerificationArgs, 'phoneNumber'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input' | 'where'>
  >;
  updateUserPassword?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserPasswordArgs, 'input' | 'where'>
  >;
};

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['Email']>, ParentType, ContextType>;
  loginHistory?: Resolver<Maybe<Array<ResolversTypes['LoginHistory']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['UserName'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  strategies?: Resolver<Array<ResolversTypes['AuthenticationStrategy']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['VerificationList']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNameResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserName'] = ResolversParentTypes['UserName']
> = {
  first?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationListResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VerificationList'] = ResolversParentTypes['VerificationList']
> = {
  email?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  CodeResponse?: CodeResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  LoginHistory?: LoginHistoryResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserName?: UserNameResolvers<ContextType>;
  VerificationList?: VerificationListResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const AuthenticationStatusSchema = z.enum(['FAILED', 'SUCCESS']);

export const AuthenticationStrategySchema = z.enum([
  'EMAIL_CODE',
  'EMAIL_PASSWORD',
  'PHONE_NUMBER_CODE',
  'PHONE_NUMBER_PASSWORD',
]);

export const ContactTypeSchema = z.enum(['EMAIL', 'SMS', 'WHATSAPP']);

export function CreateUserInputSchema(): z.ZodObject<Properties<CreateUserInput>> {
  return z.object<Properties<CreateUserInput>>({
    email: z.string().email().nullish(),
    name: z.lazy(() => CreateUserNameInputSchema()),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/)
      .trim()
      .nullish(),
    phoneNumber: z.custom<PhoneNumber>((value) => value).nullish(),
    strategies: z.array(AuthenticationStrategySchema),
  });
}

export function CreateUserNameInputSchema(): z.ZodObject<Properties<CreateUserNameInput>> {
  return z.object<Properties<CreateUserNameInput>>({
    first: z.string().min(1).max(50),
    last: z.string().min(1).max(50),
  });
}

export function DeleteUserMutationArgsSchema(): z.ZodObject<Properties<DeleteUserMutationArgs>> {
  return z.object<Properties<DeleteUserMutationArgs>>({
    _id: z.string(),
  });
}

export function LoginWithEmailAndCodeMutationInputSchema(): z.ZodObject<
  Properties<LoginWithEmailAndCodeMutationInput>
> {
  return z.object<Properties<LoginWithEmailAndCodeMutationInput>>({
    code: z.string().min(4).max(20),
    email: z.string().email(),
  });
}

export function LoginWithEmailAndPasswordMutationInputSchema(): z.ZodObject<
  Properties<LoginWithEmailAndPasswordMutationInput>
> {
  return z.object<Properties<LoginWithEmailAndPasswordMutationInput>>({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/),
  });
}

export function LoginWithPhoneNumberAndCodeMutationInputSchema(): z.ZodObject<
  Properties<LoginWithPhoneNumberAndCodeMutationInput>
> {
  return z.object<Properties<LoginWithPhoneNumberAndCodeMutationInput>>({
    code: z.string().min(4).max(20),
    phoneNumber: z.custom<PhoneNumber>((value) => value),
  });
}

export function LoginWithPhoneNumberAndPasswordMutationInputSchema(): z.ZodObject<
  Properties<LoginWithPhoneNumberAndPasswordMutationInput>
> {
  return z.object<Properties<LoginWithPhoneNumberAndPasswordMutationInput>>({
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/),
    phoneNumber: z.custom<PhoneNumber>((value) => value),
  });
}

export function ResetUserPasswordMutationInputSchema(): z.ZodObject<Properties<ResetUserPasswordMutationInput>> {
  return z.object<Properties<ResetUserPasswordMutationInput>>({
    clientContact: z.string(),
    code: z.string().min(4).max(20),
  });
}

export function SendCodeMutationConfigurationInputSchema(): z.ZodObject<
  Properties<SendCodeMutationConfigurationInput>
> {
  return z.object<Properties<SendCodeMutationConfigurationInput>>({
    codeLength: z.number().min(4).max(20).default(4).nullish(),
    expireTime: z.number().min(1).max(60).default(10).nullish(),
    type: VerificationCodeTypeSchema.default('NUMERIC').nullish(),
  });
}

export const TextMessagePlatformSchema = z.enum(['SMS', 'WHATSAPP']);

export function UpdateUserInputSchema(): z.ZodObject<Properties<UpdateUserInput>> {
  return z.object<Properties<UpdateUserInput>>({
    email: z.string().email().nullish(),
    name: z.lazy(() => UpdateUserNameInputSchema().nullish()),
    phoneNumber: z.custom<PhoneNumber>((value) => value).nullish(),
  });
}

export function UpdateUserMutationArgsSchema(): z.ZodObject<Properties<UpdateUserMutationArgs>> {
  return z.object<Properties<UpdateUserMutationArgs>>({
    _id: z.string(),
  });
}

export function UpdateUserNameInputSchema(): z.ZodObject<Properties<UpdateUserNameInput>> {
  return z.object<Properties<UpdateUserNameInput>>({
    first: z.string().min(1).max(50),
    last: z.string().min(1).max(50),
  });
}

export function UpdateUserPasswordInputSchema(): z.ZodObject<Properties<UpdateUserPasswordInput>> {
  return z.object<Properties<UpdateUserPasswordInput>>({
    newPassword: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/)
      .trim(),
    oldPassword: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/)
      .trim()
      .nullish(),
  });
}

export function UpdateUserPasswordMutationArgsSchema(): z.ZodObject<Properties<UpdateUserPasswordMutationArgs>> {
  return z.object<Properties<UpdateUserPasswordMutationArgs>>({
    _id: z.string(),
  });
}

export function UserQueryArgsSchema(): z.ZodObject<Properties<UserQueryArgs>> {
  return z.object<Properties<UserQueryArgs>>({
    _id: z.string().nullish(),
    email: z.string().email().nullish(),
    phoneNumber: z.custom<PhoneNumber>((value) => value).nullish(),
  });
}

export const VerificationCodeTypeSchema = z.enum(['ALPHABETIC', 'ALPHA_NUMERIC', 'NUMERIC']);

export function AdditionalEntityFieldsSchema(): z.ZodObject<Properties<AdditionalEntityFields>> {
  return z.object<Properties<AdditionalEntityFields>>({
    path: z.string().nullish(),
    type: z.string().nullish(),
  });
}

export type UserInDb = {
  _id: string;
  email?: Maybe<string>;
  name: UserName;
  phoneNumber?: Maybe<PhoneNumber>;
  strategies: Array<AuthenticationStrategy>;
  verified?: Maybe<VerificationList>;
  createdAt: Date;
  updatedAt?: Maybe<Date>;
  password: Maybe<string>;
};

/**
 * Status of an authentication attempt
 * @typedef {("FAILED"|"SUCCESS")} AuthenticationStatus
 */

/**
 * Strategies that can be used by a user to authenticate
 * @typedef {("EMAIL_CODE"|"EMAIL_PASSWORD"|"PHONE_NUMBER_CODE"|"PHONE_NUMBER_PASSWORD")} AuthenticationStrategy
 */

/**
 * Response a user gets when a verification code is sent to email/ phone number
 * @typedef {Object} CodeResponse
 * @property {string} sentTo - client's email/ phone number it is sent to
 * @property {AuthenticationStatus} status - status if the otp is sent or not
 * @property {AuthenticationStrategy} strategy - strategy used to login
 * @property {number} validity - validity of the verification code
 */

/**
 * Type of the platform to send the message to
 * @typedef {("EMAIL"|"SMS"|"WHATSAPP")} ContactType
 */

/**
 * @typedef {Object} CreateUserInput
 * @property {Email} [email] - Email of the user.
 * @property {CreateUserNameInput} name - Name of the user.
 * @property {Password} [password] - Password of the user. Leave it as "" if you only want to provide password-less strategies
 * @property {PhoneNumber} [phoneNumber] - Phone number of the user.
 * @property {Array<AuthenticationStrategy>} strategies - List of authentication strategies that the user has enabled.
 */

/**
 * @typedef {Object} CreateUserNameInput
 * @property {string} first - First name of the user.
 * @property {string} last - Last name of the user.
 */

/**
 * JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error.
 * @typedef {*} DateTime
 */

/**
 * @typedef {Object} DeleteUserMutationArgs
 * @property {string} _id - The ID of the user to update.
 */

/**
 * A field whose value conforms to the standard internet email address format as specified in {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address HTML Spec}.
 * @typedef {*} Email
 */

/**
 * The JSON scalar type represents JSON values as specified by {@link http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf ECMA-404}.
 * @typedef {*} JSON
 */

/**
 * Every record of the user's login
 * @typedef {Object} LoginHistory
 * @property {string} _id - Unique MongoDB Object ID for the record.
 *  * Created using mongodb package
 * @property {AuthenticationStrategy} [strategy] - User's Login
 * @property {DateTime} timestamp - Timestamp of when the user is logged in
 * @property {string} userId - User's ID
 */

/**
 * @typedef {Object} LoginResponse
 * @property {string} refreshToken - refresh token
 * @property {AuthenticationStatus} status - status if the user is logged in
 * @property {AuthenticationStrategy} strategy - strategy used to login
 * @property {string} token - authentication token
 */

/**
 * Input type for login with email and otp
 * @typedef {Object} LoginWithEmailAndCodeMutationInput
 * @property {string} code - Password of the user
 * @property {Email} email - Email of the user
 */

/**
 * Input type for login with email and password
 * @typedef {Object} LoginWithEmailAndPasswordMutationInput
 * @property {Email} email - Email of the user
 * @property {Password} password - Password of the user
 */

/**
 * Input type for login with phone number and otp
 * @typedef {Object} LoginWithPhoneNumberAndCodeMutationInput
 * @property {string} code - Password of the user
 * @property {PhoneNumber} phoneNumber - Phone number of the user
 */

/**
 * Input type for login with phone number and password
 * @typedef {Object} LoginWithPhoneNumberAndPasswordMutationInput
 * @property {Password} password - Password of the user
 * @property {PhoneNumber} phoneNumber - Phone number of the user
 */

/**
 * @typedef {Object} Mutation
 * @property {User} confirmEmailForVerification - Confirm the Email for verification
 * @property {User} confirmPhoneNumberForVerification - Confirm the Phone number for verification
 * @property {User} createUser - Mutation to create a new user
 * @property {User} deleteUser - Mutation to delete an existing user
 * @property {LoginResponse} loginWithEmailAndCode - Verify the verification code for the email and login the user
 * @property {LoginResponse} loginWithEmailAndPassword - Mutation to login a user using email and password
 * @property {LoginResponse} loginWithPhoneNumberAndCode - Verify the verification code for the phone number and login the user
 * @property {LoginResponse} loginWithPhoneNumberAndPassword - Mutation to login a user using phone number and password
 * @property {LoginResponse} refreshToken - Mutation to refresh token
 * @property {User} resetUserPassword - Mutation to reset a user's password when forgot
 * @property {CodeResponse} sendCodeToEmail - Mutation to send a verification code to the user's email
 * @property {CodeResponse} sendCodeToPhoneNumber - Mutation to send a verification code to the user's phone number
 * @property {CodeResponse} sendEmailForVerification - Verify email
 * @property {CodeResponse} sendMessageForPasswordReset - Mutation to send a verification code to the user's email/ phone number to reset password
 * @property {CodeResponse} sendTextMessageForVerification - Verify Phone number
 * @property {User} updateUser - Mutation to update an existing user
 * @property {User} updateUserPassword - Mutation to update the password for an existing user
 */

/**
 * A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character
 * @typedef {*} Password
 */

/**
 * A field whose value conforms to the standard Phone number format (based on Google's Phone Number Library) format. The very powerful {@link https://github.com/googlei18n/libphonenumber libphonenumber } library is available to take that format, parse and display it in whatever display format you want. It can also be used to parse user input and get the E.164 format to pass into a schema.
 * @typedef {*} PhoneNumber
 */

/**
 * A field whose value conforms to the Postal Code of the Address component
 * @typedef {*} PostalCode
 */

/**
 * @typedef {Object} Query
 * @property {User} [me] - Fetch user by token
 * @property {User} user - Fetch a user based on the details
 * @property {Array<User>} users - Fetch more than one or more users based on the query parameters
 */

/**
 * Input type for login with email and otp
 * @typedef {Object} ResetUserPasswordMutationInput
 * @property {string} clientContact - Email of the user
 * @property {string} code - Password of the user
 */

/**
 * Input type for changing configuration of the verification code
 * @typedef {Object} SendCodeMutationConfigurationInput
 * @property {number} [codeLength] - Length of the Code
 *
 * @default 4
 * @property {number} [expireTime] - Expire time of the code (in minutes)
 *
 * @default 10
 * @property {VerificationCodeType} [type] - Type of verification code.
 * * e.g numeric, alphanumeric, etc
 *
 * @default NUMERIC
 */

/**
 * Type of platform to send message to
 * @typedef {("SMS"|"WHATSAPP")} TextMessagePlatform
 */

/**
 * A field whose value conforms to the standard URL format as specified in {@link https://www.ietf.org/rfc/rfc3986.txt RFC3986}, and it uses real JavaScript URL objects.
 * @typedef {*} URL
 */

/**
 * @typedef {Object} UpdateUserInput
 * @property {Email} [email] - Email of the user.
 * @property {UpdateUserNameInput} [name] - Name of the user.
 * @property {PhoneNumber} [phoneNumber] - Phone number of the user.
 */

/**
 * @typedef {Object} UpdateUserMutationArgs
 * @property {string} _id - The ID of the user to update.
 */

/**
 * @typedef {Object} UpdateUserNameInput
 * @property {string} first - First name of the user.
 * @property {string} last - Last name of the user.
 */

/**
 * @typedef {Object} UpdateUserPasswordInput
 * @property {Password} newPassword - The new password for the user.
 * @property {Password} [oldPassword] - Existing password of the user.
 *
 * * Note: Leave it empty if there was no password before
 */

/**
 * @typedef {Object} UpdateUserPasswordMutationArgs
 * @property {string} _id - The ID of the user to update.
 */

/**
 * User object containing all the details relevant to the authentication and authorization of a user
 * @typedef {Object} User
 * @property {string} _id - Unique MongoDB Object ID for the record.
 * * Created using mongodb package
 * @property {Email} [email] - Email of the user.
 *
 * * Note: This is optional here but will be validated based on the type of authentication. So if any operation uses email, then this will have to exist
 * @property {Array<LoginHistory>} [loginHistory] - Login History of the user.
 * @property {UserName} name - First and last names of the user.
 *
 * * NOTE: This object can be changed to contain more such properties in the future. For instance, nickname, middle name, etc.
 * @property {PhoneNumber} [phoneNumber] - Phone number of the user.
 *
 * * Note: This is optional here but will be validated based on the type of authentication. So if any operation uses phone number, then this will have to exist.
 * @property {Array<AuthenticationStrategy>} strategies - List of authentication strategies that the user has enabled.
 * @property {VerificationList} [verified] - Details of the user's that are verified
 */

/**
 * @typedef {Object} UserName
 * @property {string} first - First name of the user.
 * @property {string} last - Last name of the user.
 */

/**
 * At-least one of the query arguments needs to be provided
 * @typedef {Object} UserQueryArgs
 * @property {string} [_id] - ID of the user
 * @property {Email} [email] - Email of the user
 * @property {PhoneNumber} [phoneNumber] - Phone number of the user
 */

/**
 * Type of code to send to user
 * @typedef {("ALPHABETIC"|"ALPHA_NUMERIC"|"NUMERIC")} VerificationCodeType
 */

/**
 * List of the accounts the user has verified
 * @typedef {Object} VerificationList
 * @property {boolean} [email]
 * @property {boolean} [phoneNumber]
 */

/**
 * @typedef {Object} AdditionalEntityFields
 * @property {string} [path]
 * @property {string} [type]
 */
