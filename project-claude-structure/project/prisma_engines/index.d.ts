
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model University
 * 
 */
export type University = $Result.DefaultSelection<Prisma.$UniversityPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model Career
 * 
 */
export type Career = $Result.DefaultSelection<Prisma.$CareerPayload>
/**
 * Model CareerSubject
 * 
 */
export type CareerSubject = $Result.DefaultSelection<Prisma.$CareerSubjectPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Question_Option
 * 
 */
export type Question_Option = $Result.DefaultSelection<Prisma.$Question_OptionPayload>
/**
 * Model ExamAttempt
 * 
 */
export type ExamAttempt = $Result.DefaultSelection<Prisma.$ExamAttemptPayload>
/**
 * Model StudentAnswer
 * 
 */
export type StudentAnswer = $Result.DefaultSelection<Prisma.$StudentAnswerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DifficultyLevel: {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel]


export const ExamAttemptStatus: {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ABANDONED: 'ABANDONED'
};

export type ExamAttemptStatus = (typeof ExamAttemptStatus)[keyof typeof ExamAttemptStatus]

}

export type DifficultyLevel = $Enums.DifficultyLevel

export const DifficultyLevel: typeof $Enums.DifficultyLevel

export type ExamAttemptStatus = $Enums.ExamAttemptStatus

export const ExamAttemptStatus: typeof $Enums.ExamAttemptStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.university`: Exposes CRUD operations for the **University** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Universities
    * const universities = await prisma.university.findMany()
    * ```
    */
  get university(): Prisma.UniversityDelegate<ExtArgs>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs>;

  /**
   * `prisma.career`: Exposes CRUD operations for the **Career** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Careers
    * const careers = await prisma.career.findMany()
    * ```
    */
  get career(): Prisma.CareerDelegate<ExtArgs>;

  /**
   * `prisma.careerSubject`: Exposes CRUD operations for the **CareerSubject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerSubjects
    * const careerSubjects = await prisma.careerSubject.findMany()
    * ```
    */
  get careerSubject(): Prisma.CareerSubjectDelegate<ExtArgs>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs>;

  /**
   * `prisma.question_Option`: Exposes CRUD operations for the **Question_Option** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Question_Options
    * const question_Options = await prisma.question_Option.findMany()
    * ```
    */
  get question_Option(): Prisma.Question_OptionDelegate<ExtArgs>;

  /**
   * `prisma.examAttempt`: Exposes CRUD operations for the **ExamAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamAttempts
    * const examAttempts = await prisma.examAttempt.findMany()
    * ```
    */
  get examAttempt(): Prisma.ExamAttemptDelegate<ExtArgs>;

  /**
   * `prisma.studentAnswer`: Exposes CRUD operations for the **StudentAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentAnswers
    * const studentAnswers = await prisma.studentAnswer.findMany()
    * ```
    */
  get studentAnswer(): Prisma.StudentAnswerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    University: 'University',
    Subject: 'Subject',
    Career: 'Career',
    CareerSubject: 'CareerSubject',
    Question: 'Question',
    Question_Option: 'Question_Option',
    ExamAttempt: 'ExamAttempt',
    StudentAnswer: 'StudentAnswer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "university" | "subject" | "career" | "careerSubject" | "question" | "question_Option" | "examAttempt" | "studentAnswer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      University: {
        payload: Prisma.$UniversityPayload<ExtArgs>
        fields: Prisma.UniversityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UniversityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UniversityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          findFirst: {
            args: Prisma.UniversityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UniversityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          findMany: {
            args: Prisma.UniversityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>[]
          }
          create: {
            args: Prisma.UniversityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          createMany: {
            args: Prisma.UniversityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UniversityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>[]
          }
          delete: {
            args: Prisma.UniversityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          update: {
            args: Prisma.UniversityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          deleteMany: {
            args: Prisma.UniversityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UniversityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UniversityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UniversityPayload>
          }
          aggregate: {
            args: Prisma.UniversityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUniversity>
          }
          groupBy: {
            args: Prisma.UniversityGroupByArgs<ExtArgs>
            result: $Utils.Optional<UniversityGroupByOutputType>[]
          }
          count: {
            args: Prisma.UniversityCountArgs<ExtArgs>
            result: $Utils.Optional<UniversityCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      Career: {
        payload: Prisma.$CareerPayload<ExtArgs>
        fields: Prisma.CareerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          findFirst: {
            args: Prisma.CareerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          findMany: {
            args: Prisma.CareerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>[]
          }
          create: {
            args: Prisma.CareerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          createMany: {
            args: Prisma.CareerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>[]
          }
          delete: {
            args: Prisma.CareerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          update: {
            args: Prisma.CareerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          deleteMany: {
            args: Prisma.CareerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          aggregate: {
            args: Prisma.CareerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareer>
          }
          groupBy: {
            args: Prisma.CareerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerCountArgs<ExtArgs>
            result: $Utils.Optional<CareerCountAggregateOutputType> | number
          }
        }
      }
      CareerSubject: {
        payload: Prisma.$CareerSubjectPayload<ExtArgs>
        fields: Prisma.CareerSubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerSubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerSubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          findFirst: {
            args: Prisma.CareerSubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerSubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          findMany: {
            args: Prisma.CareerSubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>[]
          }
          create: {
            args: Prisma.CareerSubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          createMany: {
            args: Prisma.CareerSubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerSubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>[]
          }
          delete: {
            args: Prisma.CareerSubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          update: {
            args: Prisma.CareerSubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          deleteMany: {
            args: Prisma.CareerSubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerSubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerSubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerSubjectPayload>
          }
          aggregate: {
            args: Prisma.CareerSubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerSubject>
          }
          groupBy: {
            args: Prisma.CareerSubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerSubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerSubjectCountArgs<ExtArgs>
            result: $Utils.Optional<CareerSubjectCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Question_Option: {
        payload: Prisma.$Question_OptionPayload<ExtArgs>
        fields: Prisma.Question_OptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Question_OptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Question_OptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          findFirst: {
            args: Prisma.Question_OptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Question_OptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          findMany: {
            args: Prisma.Question_OptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>[]
          }
          create: {
            args: Prisma.Question_OptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          createMany: {
            args: Prisma.Question_OptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Question_OptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>[]
          }
          delete: {
            args: Prisma.Question_OptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          update: {
            args: Prisma.Question_OptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          deleteMany: {
            args: Prisma.Question_OptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Question_OptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Question_OptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Question_OptionPayload>
          }
          aggregate: {
            args: Prisma.Question_OptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion_Option>
          }
          groupBy: {
            args: Prisma.Question_OptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Question_OptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.Question_OptionCountArgs<ExtArgs>
            result: $Utils.Optional<Question_OptionCountAggregateOutputType> | number
          }
        }
      }
      ExamAttempt: {
        payload: Prisma.$ExamAttemptPayload<ExtArgs>
        fields: Prisma.ExamAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          findFirst: {
            args: Prisma.ExamAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          findMany: {
            args: Prisma.ExamAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>[]
          }
          create: {
            args: Prisma.ExamAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          createMany: {
            args: Prisma.ExamAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>[]
          }
          delete: {
            args: Prisma.ExamAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          update: {
            args: Prisma.ExamAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          deleteMany: {
            args: Prisma.ExamAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExamAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          aggregate: {
            args: Prisma.ExamAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamAttempt>
          }
          groupBy: {
            args: Prisma.ExamAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<ExamAttemptCountAggregateOutputType> | number
          }
        }
      }
      StudentAnswer: {
        payload: Prisma.$StudentAnswerPayload<ExtArgs>
        fields: Prisma.StudentAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          findFirst: {
            args: Prisma.StudentAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          findMany: {
            args: Prisma.StudentAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>[]
          }
          create: {
            args: Prisma.StudentAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          createMany: {
            args: Prisma.StudentAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>[]
          }
          delete: {
            args: Prisma.StudentAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          update: {
            args: Prisma.StudentAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          deleteMany: {
            args: Prisma.StudentAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          aggregate: {
            args: Prisma.StudentAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentAnswer>
          }
          groupBy: {
            args: Prisma.StudentAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<StudentAnswerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    examAttempts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examAttempts?: boolean | UserCountOutputTypeCountExamAttemptsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExamAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
  }


  /**
   * Count Type UniversityCountOutputType
   */

  export type UniversityCountOutputType = {
    questions: number
    users: number
    examAttempts: number
  }

  export type UniversityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | UniversityCountOutputTypeCountQuestionsArgs
    users?: boolean | UniversityCountOutputTypeCountUsersArgs
    examAttempts?: boolean | UniversityCountOutputTypeCountExamAttemptsArgs
  }

  // Custom InputTypes
  /**
   * UniversityCountOutputType without action
   */
  export type UniversityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniversityCountOutputType
     */
    select?: UniversityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UniversityCountOutputType without action
   */
  export type UniversityCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * UniversityCountOutputType without action
   */
  export type UniversityCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UniversityCountOutputType without action
   */
  export type UniversityCountOutputTypeCountExamAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    questions: number
    careerSubjects: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | SubjectCountOutputTypeCountQuestionsArgs
    careerSubjects?: boolean | SubjectCountOutputTypeCountCareerSubjectsArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountCareerSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerSubjectWhereInput
  }


  /**
   * Count Type CareerCountOutputType
   */

  export type CareerCountOutputType = {
    questions: number
    careerSubjects: number
    targetUsers: number
  }

  export type CareerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | CareerCountOutputTypeCountQuestionsArgs
    careerSubjects?: boolean | CareerCountOutputTypeCountCareerSubjectsArgs
    targetUsers?: boolean | CareerCountOutputTypeCountTargetUsersArgs
  }

  // Custom InputTypes
  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerCountOutputType
     */
    select?: CareerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeCountCareerSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerSubjectWhereInput
  }

  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeCountTargetUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    options: number
    studentAnswers: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | QuestionCountOutputTypeCountOptionsArgs
    studentAnswers?: boolean | QuestionCountOutputTypeCountStudentAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Question_OptionWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountStudentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
  }


  /**
   * Count Type Question_OptionCountOutputType
   */

  export type Question_OptionCountOutputType = {
    studentAnswers: number
  }

  export type Question_OptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentAnswers?: boolean | Question_OptionCountOutputTypeCountStudentAnswersArgs
  }

  // Custom InputTypes
  /**
   * Question_OptionCountOutputType without action
   */
  export type Question_OptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_OptionCountOutputType
     */
    select?: Question_OptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Question_OptionCountOutputType without action
   */
  export type Question_OptionCountOutputTypeCountStudentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
  }


  /**
   * Count Type ExamAttemptCountOutputType
   */

  export type ExamAttemptCountOutputType = {
    studentAnswers: number
  }

  export type ExamAttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentAnswers?: boolean | ExamAttemptCountOutputTypeCountStudentAnswersArgs
  }

  // Custom InputTypes
  /**
   * ExamAttemptCountOutputType without action
   */
  export type ExamAttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttemptCountOutputType
     */
    select?: ExamAttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExamAttemptCountOutputType without action
   */
  export type ExamAttemptCountOutputTypeCountStudentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    country: string | null
    targetUniversityId: string | null
    targetCareerId: string | null
    hasCompletedOnboarding: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    country: string | null
    targetUniversityId: string | null
    targetCareerId: string | null
    hasCompletedOnboarding: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    country: number
    targetUniversityId: number
    targetCareerId: number
    hasCompletedOnboarding: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    country?: true
    targetUniversityId?: true
    targetCareerId?: true
    hasCompletedOnboarding?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    country?: true
    targetUniversityId?: true
    targetCareerId?: true
    hasCompletedOnboarding?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    country?: true
    targetUniversityId?: true
    targetCareerId?: true
    hasCompletedOnboarding?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    createdAt: Date
    updatedAt: Date
    firstName: string | null
    lastName: string | null
    country: string | null
    targetUniversityId: string | null
    targetCareerId: string | null
    hasCompletedOnboarding: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    country?: boolean
    targetUniversityId?: boolean
    targetCareerId?: boolean
    hasCompletedOnboarding?: boolean
    targetUniversity?: boolean | User$targetUniversityArgs<ExtArgs>
    targetCareer?: boolean | User$targetCareerArgs<ExtArgs>
    examAttempts?: boolean | User$examAttemptsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    country?: boolean
    targetUniversityId?: boolean
    targetCareerId?: boolean
    hasCompletedOnboarding?: boolean
    targetUniversity?: boolean | User$targetUniversityArgs<ExtArgs>
    targetCareer?: boolean | User$targetCareerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    country?: boolean
    targetUniversityId?: boolean
    targetCareerId?: boolean
    hasCompletedOnboarding?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targetUniversity?: boolean | User$targetUniversityArgs<ExtArgs>
    targetCareer?: boolean | User$targetCareerArgs<ExtArgs>
    examAttempts?: boolean | User$examAttemptsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targetUniversity?: boolean | User$targetUniversityArgs<ExtArgs>
    targetCareer?: boolean | User$targetCareerArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      targetUniversity: Prisma.$UniversityPayload<ExtArgs> | null
      targetCareer: Prisma.$CareerPayload<ExtArgs> | null
      examAttempts: Prisma.$ExamAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      createdAt: Date
      updatedAt: Date
      firstName: string | null
      lastName: string | null
      country: string | null
      targetUniversityId: string | null
      targetCareerId: string | null
      hasCompletedOnboarding: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    targetUniversity<T extends User$targetUniversityArgs<ExtArgs> = {}>(args?: Subset<T, User$targetUniversityArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    targetCareer<T extends User$targetCareerArgs<ExtArgs> = {}>(args?: Subset<T, User$targetCareerArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    examAttempts<T extends User$examAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$examAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly targetUniversityId: FieldRef<"User", 'String'>
    readonly targetCareerId: FieldRef<"User", 'String'>
    readonly hasCompletedOnboarding: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.targetUniversity
   */
  export type User$targetUniversityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    where?: UniversityWhereInput
  }

  /**
   * User.targetCareer
   */
  export type User$targetCareerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    where?: CareerWhereInput
  }

  /**
   * User.examAttempts
   */
  export type User$examAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    cursor?: ExamAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model University
   */

  export type AggregateUniversity = {
    _count: UniversityCountAggregateOutputType | null
    _min: UniversityMinAggregateOutputType | null
    _max: UniversityMaxAggregateOutputType | null
  }

  export type UniversityMinAggregateOutputType = {
    id: string | null
    name: string | null
    shortName: string | null
    city: string | null
    region: string | null
    country: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UniversityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    shortName: string | null
    city: string | null
    region: string | null
    country: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UniversityCountAggregateOutputType = {
    id: number
    name: number
    shortName: number
    city: number
    region: number
    country: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UniversityMinAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    city?: true
    region?: true
    country?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UniversityMaxAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    city?: true
    region?: true
    country?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UniversityCountAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    city?: true
    region?: true
    country?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UniversityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which University to aggregate.
     */
    where?: UniversityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Universities to fetch.
     */
    orderBy?: UniversityOrderByWithRelationInput | UniversityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UniversityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Universities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Universities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Universities
    **/
    _count?: true | UniversityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UniversityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UniversityMaxAggregateInputType
  }

  export type GetUniversityAggregateType<T extends UniversityAggregateArgs> = {
        [P in keyof T & keyof AggregateUniversity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUniversity[P]>
      : GetScalarType<T[P], AggregateUniversity[P]>
  }




  export type UniversityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UniversityWhereInput
    orderBy?: UniversityOrderByWithAggregationInput | UniversityOrderByWithAggregationInput[]
    by: UniversityScalarFieldEnum[] | UniversityScalarFieldEnum
    having?: UniversityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UniversityCountAggregateInputType | true
    _min?: UniversityMinAggregateInputType
    _max?: UniversityMaxAggregateInputType
  }

  export type UniversityGroupByOutputType = {
    id: string
    name: string
    shortName: string
    city: string
    region: string
    country: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UniversityCountAggregateOutputType | null
    _min: UniversityMinAggregateOutputType | null
    _max: UniversityMaxAggregateOutputType | null
  }

  type GetUniversityGroupByPayload<T extends UniversityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UniversityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UniversityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UniversityGroupByOutputType[P]>
            : GetScalarType<T[P], UniversityGroupByOutputType[P]>
        }
      >
    >


  export type UniversitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortName?: boolean
    city?: boolean
    region?: boolean
    country?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questions?: boolean | University$questionsArgs<ExtArgs>
    users?: boolean | University$usersArgs<ExtArgs>
    examAttempts?: boolean | University$examAttemptsArgs<ExtArgs>
    _count?: boolean | UniversityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["university"]>

  export type UniversitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortName?: boolean
    city?: boolean
    region?: boolean
    country?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["university"]>

  export type UniversitySelectScalar = {
    id?: boolean
    name?: boolean
    shortName?: boolean
    city?: boolean
    region?: boolean
    country?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UniversityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | University$questionsArgs<ExtArgs>
    users?: boolean | University$usersArgs<ExtArgs>
    examAttempts?: boolean | University$examAttemptsArgs<ExtArgs>
    _count?: boolean | UniversityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UniversityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UniversityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "University"
    objects: {
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
      examAttempts: Prisma.$ExamAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      shortName: string
      city: string
      region: string
      country: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["university"]>
    composites: {}
  }

  type UniversityGetPayload<S extends boolean | null | undefined | UniversityDefaultArgs> = $Result.GetResult<Prisma.$UniversityPayload, S>

  type UniversityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UniversityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UniversityCountAggregateInputType | true
    }

  export interface UniversityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['University'], meta: { name: 'University' } }
    /**
     * Find zero or one University that matches the filter.
     * @param {UniversityFindUniqueArgs} args - Arguments to find a University
     * @example
     * // Get one University
     * const university = await prisma.university.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UniversityFindUniqueArgs>(args: SelectSubset<T, UniversityFindUniqueArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one University that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UniversityFindUniqueOrThrowArgs} args - Arguments to find a University
     * @example
     * // Get one University
     * const university = await prisma.university.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UniversityFindUniqueOrThrowArgs>(args: SelectSubset<T, UniversityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first University that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityFindFirstArgs} args - Arguments to find a University
     * @example
     * // Get one University
     * const university = await prisma.university.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UniversityFindFirstArgs>(args?: SelectSubset<T, UniversityFindFirstArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first University that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityFindFirstOrThrowArgs} args - Arguments to find a University
     * @example
     * // Get one University
     * const university = await prisma.university.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UniversityFindFirstOrThrowArgs>(args?: SelectSubset<T, UniversityFindFirstOrThrowArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Universities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Universities
     * const universities = await prisma.university.findMany()
     * 
     * // Get first 10 Universities
     * const universities = await prisma.university.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const universityWithIdOnly = await prisma.university.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UniversityFindManyArgs>(args?: SelectSubset<T, UniversityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a University.
     * @param {UniversityCreateArgs} args - Arguments to create a University.
     * @example
     * // Create one University
     * const University = await prisma.university.create({
     *   data: {
     *     // ... data to create a University
     *   }
     * })
     * 
     */
    create<T extends UniversityCreateArgs>(args: SelectSubset<T, UniversityCreateArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Universities.
     * @param {UniversityCreateManyArgs} args - Arguments to create many Universities.
     * @example
     * // Create many Universities
     * const university = await prisma.university.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UniversityCreateManyArgs>(args?: SelectSubset<T, UniversityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Universities and returns the data saved in the database.
     * @param {UniversityCreateManyAndReturnArgs} args - Arguments to create many Universities.
     * @example
     * // Create many Universities
     * const university = await prisma.university.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Universities and only return the `id`
     * const universityWithIdOnly = await prisma.university.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UniversityCreateManyAndReturnArgs>(args?: SelectSubset<T, UniversityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a University.
     * @param {UniversityDeleteArgs} args - Arguments to delete one University.
     * @example
     * // Delete one University
     * const University = await prisma.university.delete({
     *   where: {
     *     // ... filter to delete one University
     *   }
     * })
     * 
     */
    delete<T extends UniversityDeleteArgs>(args: SelectSubset<T, UniversityDeleteArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one University.
     * @param {UniversityUpdateArgs} args - Arguments to update one University.
     * @example
     * // Update one University
     * const university = await prisma.university.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UniversityUpdateArgs>(args: SelectSubset<T, UniversityUpdateArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Universities.
     * @param {UniversityDeleteManyArgs} args - Arguments to filter Universities to delete.
     * @example
     * // Delete a few Universities
     * const { count } = await prisma.university.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UniversityDeleteManyArgs>(args?: SelectSubset<T, UniversityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Universities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Universities
     * const university = await prisma.university.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UniversityUpdateManyArgs>(args: SelectSubset<T, UniversityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one University.
     * @param {UniversityUpsertArgs} args - Arguments to update or create a University.
     * @example
     * // Update or create a University
     * const university = await prisma.university.upsert({
     *   create: {
     *     // ... data to create a University
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the University we want to update
     *   }
     * })
     */
    upsert<T extends UniversityUpsertArgs>(args: SelectSubset<T, UniversityUpsertArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Universities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityCountArgs} args - Arguments to filter Universities to count.
     * @example
     * // Count the number of Universities
     * const count = await prisma.university.count({
     *   where: {
     *     // ... the filter for the Universities we want to count
     *   }
     * })
    **/
    count<T extends UniversityCountArgs>(
      args?: Subset<T, UniversityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UniversityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a University.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UniversityAggregateArgs>(args: Subset<T, UniversityAggregateArgs>): Prisma.PrismaPromise<GetUniversityAggregateType<T>>

    /**
     * Group by University.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniversityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UniversityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UniversityGroupByArgs['orderBy'] }
        : { orderBy?: UniversityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UniversityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUniversityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the University model
   */
  readonly fields: UniversityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for University.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UniversityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends University$questionsArgs<ExtArgs> = {}>(args?: Subset<T, University$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    users<T extends University$usersArgs<ExtArgs> = {}>(args?: Subset<T, University$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    examAttempts<T extends University$examAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, University$examAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the University model
   */ 
  interface UniversityFieldRefs {
    readonly id: FieldRef<"University", 'String'>
    readonly name: FieldRef<"University", 'String'>
    readonly shortName: FieldRef<"University", 'String'>
    readonly city: FieldRef<"University", 'String'>
    readonly region: FieldRef<"University", 'String'>
    readonly country: FieldRef<"University", 'String'>
    readonly isActive: FieldRef<"University", 'Boolean'>
    readonly createdAt: FieldRef<"University", 'DateTime'>
    readonly updatedAt: FieldRef<"University", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * University findUnique
   */
  export type UniversityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter, which University to fetch.
     */
    where: UniversityWhereUniqueInput
  }

  /**
   * University findUniqueOrThrow
   */
  export type UniversityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter, which University to fetch.
     */
    where: UniversityWhereUniqueInput
  }

  /**
   * University findFirst
   */
  export type UniversityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter, which University to fetch.
     */
    where?: UniversityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Universities to fetch.
     */
    orderBy?: UniversityOrderByWithRelationInput | UniversityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Universities.
     */
    cursor?: UniversityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Universities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Universities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Universities.
     */
    distinct?: UniversityScalarFieldEnum | UniversityScalarFieldEnum[]
  }

  /**
   * University findFirstOrThrow
   */
  export type UniversityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter, which University to fetch.
     */
    where?: UniversityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Universities to fetch.
     */
    orderBy?: UniversityOrderByWithRelationInput | UniversityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Universities.
     */
    cursor?: UniversityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Universities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Universities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Universities.
     */
    distinct?: UniversityScalarFieldEnum | UniversityScalarFieldEnum[]
  }

  /**
   * University findMany
   */
  export type UniversityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter, which Universities to fetch.
     */
    where?: UniversityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Universities to fetch.
     */
    orderBy?: UniversityOrderByWithRelationInput | UniversityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Universities.
     */
    cursor?: UniversityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Universities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Universities.
     */
    skip?: number
    distinct?: UniversityScalarFieldEnum | UniversityScalarFieldEnum[]
  }

  /**
   * University create
   */
  export type UniversityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * The data needed to create a University.
     */
    data: XOR<UniversityCreateInput, UniversityUncheckedCreateInput>
  }

  /**
   * University createMany
   */
  export type UniversityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Universities.
     */
    data: UniversityCreateManyInput | UniversityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * University createManyAndReturn
   */
  export type UniversityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Universities.
     */
    data: UniversityCreateManyInput | UniversityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * University update
   */
  export type UniversityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * The data needed to update a University.
     */
    data: XOR<UniversityUpdateInput, UniversityUncheckedUpdateInput>
    /**
     * Choose, which University to update.
     */
    where: UniversityWhereUniqueInput
  }

  /**
   * University updateMany
   */
  export type UniversityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Universities.
     */
    data: XOR<UniversityUpdateManyMutationInput, UniversityUncheckedUpdateManyInput>
    /**
     * Filter which Universities to update
     */
    where?: UniversityWhereInput
  }

  /**
   * University upsert
   */
  export type UniversityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * The filter to search for the University to update in case it exists.
     */
    where: UniversityWhereUniqueInput
    /**
     * In case the University found by the `where` argument doesn't exist, create a new University with this data.
     */
    create: XOR<UniversityCreateInput, UniversityUncheckedCreateInput>
    /**
     * In case the University was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UniversityUpdateInput, UniversityUncheckedUpdateInput>
  }

  /**
   * University delete
   */
  export type UniversityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
    /**
     * Filter which University to delete.
     */
    where: UniversityWhereUniqueInput
  }

  /**
   * University deleteMany
   */
  export type UniversityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Universities to delete
     */
    where?: UniversityWhereInput
  }

  /**
   * University.questions
   */
  export type University$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * University.users
   */
  export type University$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * University.examAttempts
   */
  export type University$examAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    cursor?: ExamAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * University without action
   */
  export type UniversityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the University
     */
    select?: UniversitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UniversityInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questions?: boolean | Subject$questionsArgs<ExtArgs>
    careerSubjects?: boolean | Subject$careerSubjectsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | Subject$questionsArgs<ExtArgs>
    careerSubjects?: boolean | Subject$careerSubjectsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      careerSubjects: Prisma.$CareerSubjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends Subject$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    careerSubjects<T extends Subject$careerSubjectsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$careerSubjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */ 
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'String'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly description: FieldRef<"Subject", 'String'>
    readonly isActive: FieldRef<"Subject", 'Boolean'>
    readonly createdAt: FieldRef<"Subject", 'DateTime'>
    readonly updatedAt: FieldRef<"Subject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
  }

  /**
   * Subject.questions
   */
  export type Subject$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Subject.careerSubjects
   */
  export type Subject$careerSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    where?: CareerSubjectWhereInput
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    cursor?: CareerSubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareerSubjectScalarFieldEnum | CareerSubjectScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model Career
   */

  export type AggregateCareer = {
    _count: CareerCountAggregateOutputType | null
    _min: CareerMinAggregateOutputType | null
    _max: CareerMaxAggregateOutputType | null
  }

  export type CareerMinAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerCountAggregateOutputType = {
    id: number
    name: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CareerMinAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerMaxAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerCountAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CareerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Career to aggregate.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Careers
    **/
    _count?: true | CareerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerMaxAggregateInputType
  }

  export type GetCareerAggregateType<T extends CareerAggregateArgs> = {
        [P in keyof T & keyof AggregateCareer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareer[P]>
      : GetScalarType<T[P], AggregateCareer[P]>
  }




  export type CareerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerWhereInput
    orderBy?: CareerOrderByWithAggregationInput | CareerOrderByWithAggregationInput[]
    by: CareerScalarFieldEnum[] | CareerScalarFieldEnum
    having?: CareerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerCountAggregateInputType | true
    _min?: CareerMinAggregateInputType
    _max?: CareerMaxAggregateInputType
  }

  export type CareerGroupByOutputType = {
    id: string
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CareerCountAggregateOutputType | null
    _min: CareerMinAggregateOutputType | null
    _max: CareerMaxAggregateOutputType | null
  }

  type GetCareerGroupByPayload<T extends CareerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerGroupByOutputType[P]>
            : GetScalarType<T[P], CareerGroupByOutputType[P]>
        }
      >
    >


  export type CareerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questions?: boolean | Career$questionsArgs<ExtArgs>
    careerSubjects?: boolean | Career$careerSubjectsArgs<ExtArgs>
    targetUsers?: boolean | Career$targetUsersArgs<ExtArgs>
    _count?: boolean | CareerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["career"]>

  export type CareerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["career"]>

  export type CareerSelectScalar = {
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CareerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | Career$questionsArgs<ExtArgs>
    careerSubjects?: boolean | Career$careerSubjectsArgs<ExtArgs>
    targetUsers?: boolean | Career$targetUsersArgs<ExtArgs>
    _count?: boolean | CareerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CareerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CareerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Career"
    objects: {
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      careerSubjects: Prisma.$CareerSubjectPayload<ExtArgs>[]
      targetUsers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["career"]>
    composites: {}
  }

  type CareerGetPayload<S extends boolean | null | undefined | CareerDefaultArgs> = $Result.GetResult<Prisma.$CareerPayload, S>

  type CareerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerCountAggregateInputType | true
    }

  export interface CareerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Career'], meta: { name: 'Career' } }
    /**
     * Find zero or one Career that matches the filter.
     * @param {CareerFindUniqueArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerFindUniqueArgs>(args: SelectSubset<T, CareerFindUniqueArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Career that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerFindUniqueOrThrowArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Career that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindFirstArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerFindFirstArgs>(args?: SelectSubset<T, CareerFindFirstArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Career that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindFirstOrThrowArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Careers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Careers
     * const careers = await prisma.career.findMany()
     * 
     * // Get first 10 Careers
     * const careers = await prisma.career.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerWithIdOnly = await prisma.career.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerFindManyArgs>(args?: SelectSubset<T, CareerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Career.
     * @param {CareerCreateArgs} args - Arguments to create a Career.
     * @example
     * // Create one Career
     * const Career = await prisma.career.create({
     *   data: {
     *     // ... data to create a Career
     *   }
     * })
     * 
     */
    create<T extends CareerCreateArgs>(args: SelectSubset<T, CareerCreateArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Careers.
     * @param {CareerCreateManyArgs} args - Arguments to create many Careers.
     * @example
     * // Create many Careers
     * const career = await prisma.career.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerCreateManyArgs>(args?: SelectSubset<T, CareerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Careers and returns the data saved in the database.
     * @param {CareerCreateManyAndReturnArgs} args - Arguments to create many Careers.
     * @example
     * // Create many Careers
     * const career = await prisma.career.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Careers and only return the `id`
     * const careerWithIdOnly = await prisma.career.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Career.
     * @param {CareerDeleteArgs} args - Arguments to delete one Career.
     * @example
     * // Delete one Career
     * const Career = await prisma.career.delete({
     *   where: {
     *     // ... filter to delete one Career
     *   }
     * })
     * 
     */
    delete<T extends CareerDeleteArgs>(args: SelectSubset<T, CareerDeleteArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Career.
     * @param {CareerUpdateArgs} args - Arguments to update one Career.
     * @example
     * // Update one Career
     * const career = await prisma.career.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerUpdateArgs>(args: SelectSubset<T, CareerUpdateArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Careers.
     * @param {CareerDeleteManyArgs} args - Arguments to filter Careers to delete.
     * @example
     * // Delete a few Careers
     * const { count } = await prisma.career.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerDeleteManyArgs>(args?: SelectSubset<T, CareerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Careers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Careers
     * const career = await prisma.career.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerUpdateManyArgs>(args: SelectSubset<T, CareerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Career.
     * @param {CareerUpsertArgs} args - Arguments to update or create a Career.
     * @example
     * // Update or create a Career
     * const career = await prisma.career.upsert({
     *   create: {
     *     // ... data to create a Career
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Career we want to update
     *   }
     * })
     */
    upsert<T extends CareerUpsertArgs>(args: SelectSubset<T, CareerUpsertArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Careers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerCountArgs} args - Arguments to filter Careers to count.
     * @example
     * // Count the number of Careers
     * const count = await prisma.career.count({
     *   where: {
     *     // ... the filter for the Careers we want to count
     *   }
     * })
    **/
    count<T extends CareerCountArgs>(
      args?: Subset<T, CareerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Career.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerAggregateArgs>(args: Subset<T, CareerAggregateArgs>): Prisma.PrismaPromise<GetCareerAggregateType<T>>

    /**
     * Group by Career.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerGroupByArgs['orderBy'] }
        : { orderBy?: CareerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Career model
   */
  readonly fields: CareerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Career.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends Career$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Career$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    careerSubjects<T extends Career$careerSubjectsArgs<ExtArgs> = {}>(args?: Subset<T, Career$careerSubjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findMany"> | Null>
    targetUsers<T extends Career$targetUsersArgs<ExtArgs> = {}>(args?: Subset<T, Career$targetUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Career model
   */ 
  interface CareerFieldRefs {
    readonly id: FieldRef<"Career", 'String'>
    readonly name: FieldRef<"Career", 'String'>
    readonly isActive: FieldRef<"Career", 'Boolean'>
    readonly createdAt: FieldRef<"Career", 'DateTime'>
    readonly updatedAt: FieldRef<"Career", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Career findUnique
   */
  export type CareerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where: CareerWhereUniqueInput
  }

  /**
   * Career findUniqueOrThrow
   */
  export type CareerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where: CareerWhereUniqueInput
  }

  /**
   * Career findFirst
   */
  export type CareerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Careers.
     */
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }

  /**
   * Career findFirstOrThrow
   */
  export type CareerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Careers.
     */
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }

  /**
   * Career findMany
   */
  export type CareerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Careers to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }

  /**
   * Career create
   */
  export type CareerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The data needed to create a Career.
     */
    data: XOR<CareerCreateInput, CareerUncheckedCreateInput>
  }

  /**
   * Career createMany
   */
  export type CareerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Careers.
     */
    data: CareerCreateManyInput | CareerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Career createManyAndReturn
   */
  export type CareerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Careers.
     */
    data: CareerCreateManyInput | CareerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Career update
   */
  export type CareerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The data needed to update a Career.
     */
    data: XOR<CareerUpdateInput, CareerUncheckedUpdateInput>
    /**
     * Choose, which Career to update.
     */
    where: CareerWhereUniqueInput
  }

  /**
   * Career updateMany
   */
  export type CareerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Careers.
     */
    data: XOR<CareerUpdateManyMutationInput, CareerUncheckedUpdateManyInput>
    /**
     * Filter which Careers to update
     */
    where?: CareerWhereInput
  }

  /**
   * Career upsert
   */
  export type CareerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The filter to search for the Career to update in case it exists.
     */
    where: CareerWhereUniqueInput
    /**
     * In case the Career found by the `where` argument doesn't exist, create a new Career with this data.
     */
    create: XOR<CareerCreateInput, CareerUncheckedCreateInput>
    /**
     * In case the Career was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerUpdateInput, CareerUncheckedUpdateInput>
  }

  /**
   * Career delete
   */
  export type CareerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter which Career to delete.
     */
    where: CareerWhereUniqueInput
  }

  /**
   * Career deleteMany
   */
  export type CareerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Careers to delete
     */
    where?: CareerWhereInput
  }

  /**
   * Career.questions
   */
  export type Career$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Career.careerSubjects
   */
  export type Career$careerSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    where?: CareerSubjectWhereInput
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    cursor?: CareerSubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareerSubjectScalarFieldEnum | CareerSubjectScalarFieldEnum[]
  }

  /**
   * Career.targetUsers
   */
  export type Career$targetUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Career without action
   */
  export type CareerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerInclude<ExtArgs> | null
  }


  /**
   * Model CareerSubject
   */

  export type AggregateCareerSubject = {
    _count: CareerSubjectCountAggregateOutputType | null
    _min: CareerSubjectMinAggregateOutputType | null
    _max: CareerSubjectMaxAggregateOutputType | null
  }

  export type CareerSubjectMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    careerId: string | null
    subjectId: string | null
  }

  export type CareerSubjectMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    careerId: string | null
    subjectId: string | null
  }

  export type CareerSubjectCountAggregateOutputType = {
    id: number
    createdAt: number
    careerId: number
    subjectId: number
    _all: number
  }


  export type CareerSubjectMinAggregateInputType = {
    id?: true
    createdAt?: true
    careerId?: true
    subjectId?: true
  }

  export type CareerSubjectMaxAggregateInputType = {
    id?: true
    createdAt?: true
    careerId?: true
    subjectId?: true
  }

  export type CareerSubjectCountAggregateInputType = {
    id?: true
    createdAt?: true
    careerId?: true
    subjectId?: true
    _all?: true
  }

  export type CareerSubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerSubject to aggregate.
     */
    where?: CareerSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerSubjects to fetch.
     */
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerSubjects
    **/
    _count?: true | CareerSubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerSubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerSubjectMaxAggregateInputType
  }

  export type GetCareerSubjectAggregateType<T extends CareerSubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerSubject[P]>
      : GetScalarType<T[P], AggregateCareerSubject[P]>
  }




  export type CareerSubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerSubjectWhereInput
    orderBy?: CareerSubjectOrderByWithAggregationInput | CareerSubjectOrderByWithAggregationInput[]
    by: CareerSubjectScalarFieldEnum[] | CareerSubjectScalarFieldEnum
    having?: CareerSubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerSubjectCountAggregateInputType | true
    _min?: CareerSubjectMinAggregateInputType
    _max?: CareerSubjectMaxAggregateInputType
  }

  export type CareerSubjectGroupByOutputType = {
    id: string
    createdAt: Date
    careerId: string
    subjectId: string
    _count: CareerSubjectCountAggregateOutputType | null
    _min: CareerSubjectMinAggregateOutputType | null
    _max: CareerSubjectMaxAggregateOutputType | null
  }

  type GetCareerSubjectGroupByPayload<T extends CareerSubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerSubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerSubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerSubjectGroupByOutputType[P]>
            : GetScalarType<T[P], CareerSubjectGroupByOutputType[P]>
        }
      >
    >


  export type CareerSubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    careerId?: boolean
    subjectId?: boolean
    career?: boolean | CareerDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerSubject"]>

  export type CareerSubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    careerId?: boolean
    subjectId?: boolean
    career?: boolean | CareerDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerSubject"]>

  export type CareerSubjectSelectScalar = {
    id?: boolean
    createdAt?: boolean
    careerId?: boolean
    subjectId?: boolean
  }

  export type CareerSubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    career?: boolean | CareerDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type CareerSubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    career?: boolean | CareerDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $CareerSubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerSubject"
    objects: {
      career: Prisma.$CareerPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      careerId: string
      subjectId: string
    }, ExtArgs["result"]["careerSubject"]>
    composites: {}
  }

  type CareerSubjectGetPayload<S extends boolean | null | undefined | CareerSubjectDefaultArgs> = $Result.GetResult<Prisma.$CareerSubjectPayload, S>

  type CareerSubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerSubjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerSubjectCountAggregateInputType | true
    }

  export interface CareerSubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerSubject'], meta: { name: 'CareerSubject' } }
    /**
     * Find zero or one CareerSubject that matches the filter.
     * @param {CareerSubjectFindUniqueArgs} args - Arguments to find a CareerSubject
     * @example
     * // Get one CareerSubject
     * const careerSubject = await prisma.careerSubject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerSubjectFindUniqueArgs>(args: SelectSubset<T, CareerSubjectFindUniqueArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareerSubject that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerSubjectFindUniqueOrThrowArgs} args - Arguments to find a CareerSubject
     * @example
     * // Get one CareerSubject
     * const careerSubject = await prisma.careerSubject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerSubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerSubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareerSubject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectFindFirstArgs} args - Arguments to find a CareerSubject
     * @example
     * // Get one CareerSubject
     * const careerSubject = await prisma.careerSubject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerSubjectFindFirstArgs>(args?: SelectSubset<T, CareerSubjectFindFirstArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareerSubject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectFindFirstOrThrowArgs} args - Arguments to find a CareerSubject
     * @example
     * // Get one CareerSubject
     * const careerSubject = await prisma.careerSubject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerSubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerSubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareerSubjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerSubjects
     * const careerSubjects = await prisma.careerSubject.findMany()
     * 
     * // Get first 10 CareerSubjects
     * const careerSubjects = await prisma.careerSubject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerSubjectWithIdOnly = await prisma.careerSubject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerSubjectFindManyArgs>(args?: SelectSubset<T, CareerSubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareerSubject.
     * @param {CareerSubjectCreateArgs} args - Arguments to create a CareerSubject.
     * @example
     * // Create one CareerSubject
     * const CareerSubject = await prisma.careerSubject.create({
     *   data: {
     *     // ... data to create a CareerSubject
     *   }
     * })
     * 
     */
    create<T extends CareerSubjectCreateArgs>(args: SelectSubset<T, CareerSubjectCreateArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareerSubjects.
     * @param {CareerSubjectCreateManyArgs} args - Arguments to create many CareerSubjects.
     * @example
     * // Create many CareerSubjects
     * const careerSubject = await prisma.careerSubject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerSubjectCreateManyArgs>(args?: SelectSubset<T, CareerSubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerSubjects and returns the data saved in the database.
     * @param {CareerSubjectCreateManyAndReturnArgs} args - Arguments to create many CareerSubjects.
     * @example
     * // Create many CareerSubjects
     * const careerSubject = await prisma.careerSubject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerSubjects and only return the `id`
     * const careerSubjectWithIdOnly = await prisma.careerSubject.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerSubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerSubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CareerSubject.
     * @param {CareerSubjectDeleteArgs} args - Arguments to delete one CareerSubject.
     * @example
     * // Delete one CareerSubject
     * const CareerSubject = await prisma.careerSubject.delete({
     *   where: {
     *     // ... filter to delete one CareerSubject
     *   }
     * })
     * 
     */
    delete<T extends CareerSubjectDeleteArgs>(args: SelectSubset<T, CareerSubjectDeleteArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareerSubject.
     * @param {CareerSubjectUpdateArgs} args - Arguments to update one CareerSubject.
     * @example
     * // Update one CareerSubject
     * const careerSubject = await prisma.careerSubject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerSubjectUpdateArgs>(args: SelectSubset<T, CareerSubjectUpdateArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareerSubjects.
     * @param {CareerSubjectDeleteManyArgs} args - Arguments to filter CareerSubjects to delete.
     * @example
     * // Delete a few CareerSubjects
     * const { count } = await prisma.careerSubject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerSubjectDeleteManyArgs>(args?: SelectSubset<T, CareerSubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerSubjects
     * const careerSubject = await prisma.careerSubject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerSubjectUpdateManyArgs>(args: SelectSubset<T, CareerSubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareerSubject.
     * @param {CareerSubjectUpsertArgs} args - Arguments to update or create a CareerSubject.
     * @example
     * // Update or create a CareerSubject
     * const careerSubject = await prisma.careerSubject.upsert({
     *   create: {
     *     // ... data to create a CareerSubject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerSubject we want to update
     *   }
     * })
     */
    upsert<T extends CareerSubjectUpsertArgs>(args: SelectSubset<T, CareerSubjectUpsertArgs<ExtArgs>>): Prisma__CareerSubjectClient<$Result.GetResult<Prisma.$CareerSubjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareerSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectCountArgs} args - Arguments to filter CareerSubjects to count.
     * @example
     * // Count the number of CareerSubjects
     * const count = await prisma.careerSubject.count({
     *   where: {
     *     // ... the filter for the CareerSubjects we want to count
     *   }
     * })
    **/
    count<T extends CareerSubjectCountArgs>(
      args?: Subset<T, CareerSubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerSubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerSubjectAggregateArgs>(args: Subset<T, CareerSubjectAggregateArgs>): Prisma.PrismaPromise<GetCareerSubjectAggregateType<T>>

    /**
     * Group by CareerSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerSubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerSubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerSubjectGroupByArgs['orderBy'] }
        : { orderBy?: CareerSubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerSubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerSubject model
   */
  readonly fields: CareerSubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerSubject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerSubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    career<T extends CareerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareerDefaultArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerSubject model
   */ 
  interface CareerSubjectFieldRefs {
    readonly id: FieldRef<"CareerSubject", 'String'>
    readonly createdAt: FieldRef<"CareerSubject", 'DateTime'>
    readonly careerId: FieldRef<"CareerSubject", 'String'>
    readonly subjectId: FieldRef<"CareerSubject", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CareerSubject findUnique
   */
  export type CareerSubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CareerSubject to fetch.
     */
    where: CareerSubjectWhereUniqueInput
  }

  /**
   * CareerSubject findUniqueOrThrow
   */
  export type CareerSubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CareerSubject to fetch.
     */
    where: CareerSubjectWhereUniqueInput
  }

  /**
   * CareerSubject findFirst
   */
  export type CareerSubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CareerSubject to fetch.
     */
    where?: CareerSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerSubjects to fetch.
     */
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerSubjects.
     */
    cursor?: CareerSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerSubjects.
     */
    distinct?: CareerSubjectScalarFieldEnum | CareerSubjectScalarFieldEnum[]
  }

  /**
   * CareerSubject findFirstOrThrow
   */
  export type CareerSubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CareerSubject to fetch.
     */
    where?: CareerSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerSubjects to fetch.
     */
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerSubjects.
     */
    cursor?: CareerSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerSubjects.
     */
    distinct?: CareerSubjectScalarFieldEnum | CareerSubjectScalarFieldEnum[]
  }

  /**
   * CareerSubject findMany
   */
  export type CareerSubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CareerSubjects to fetch.
     */
    where?: CareerSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerSubjects to fetch.
     */
    orderBy?: CareerSubjectOrderByWithRelationInput | CareerSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerSubjects.
     */
    cursor?: CareerSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerSubjects.
     */
    skip?: number
    distinct?: CareerSubjectScalarFieldEnum | CareerSubjectScalarFieldEnum[]
  }

  /**
   * CareerSubject create
   */
  export type CareerSubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a CareerSubject.
     */
    data: XOR<CareerSubjectCreateInput, CareerSubjectUncheckedCreateInput>
  }

  /**
   * CareerSubject createMany
   */
  export type CareerSubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerSubjects.
     */
    data: CareerSubjectCreateManyInput | CareerSubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareerSubject createManyAndReturn
   */
  export type CareerSubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CareerSubjects.
     */
    data: CareerSubjectCreateManyInput | CareerSubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerSubject update
   */
  export type CareerSubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a CareerSubject.
     */
    data: XOR<CareerSubjectUpdateInput, CareerSubjectUncheckedUpdateInput>
    /**
     * Choose, which CareerSubject to update.
     */
    where: CareerSubjectWhereUniqueInput
  }

  /**
   * CareerSubject updateMany
   */
  export type CareerSubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerSubjects.
     */
    data: XOR<CareerSubjectUpdateManyMutationInput, CareerSubjectUncheckedUpdateManyInput>
    /**
     * Filter which CareerSubjects to update
     */
    where?: CareerSubjectWhereInput
  }

  /**
   * CareerSubject upsert
   */
  export type CareerSubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the CareerSubject to update in case it exists.
     */
    where: CareerSubjectWhereUniqueInput
    /**
     * In case the CareerSubject found by the `where` argument doesn't exist, create a new CareerSubject with this data.
     */
    create: XOR<CareerSubjectCreateInput, CareerSubjectUncheckedCreateInput>
    /**
     * In case the CareerSubject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerSubjectUpdateInput, CareerSubjectUncheckedUpdateInput>
  }

  /**
   * CareerSubject delete
   */
  export type CareerSubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
    /**
     * Filter which CareerSubject to delete.
     */
    where: CareerSubjectWhereUniqueInput
  }

  /**
   * CareerSubject deleteMany
   */
  export type CareerSubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerSubjects to delete
     */
    where?: CareerSubjectWhereInput
  }

  /**
   * CareerSubject without action
   */
  export type CareerSubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerSubject
     */
    select?: CareerSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerSubjectInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    examYear: number | null
  }

  export type QuestionSumAggregateOutputType = {
    examYear: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    difficulty: $Enums.DifficultyLevel | null
    examYear: number | null
    examPeriod: string | null
    explanation: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    universityId: string | null
    subjectId: string | null
    careerId: string | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    difficulty: $Enums.DifficultyLevel | null
    examYear: number | null
    examPeriod: string | null
    explanation: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    universityId: string | null
    subjectId: string | null
    careerId: string | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    text: number
    imageUrl: number
    difficulty: number
    examYear: number
    examPeriod: number
    explanation: number
    isActive: number
    createdAt: number
    updatedAt: number
    universityId: number
    subjectId: number
    careerId: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    examYear?: true
  }

  export type QuestionSumAggregateInputType = {
    examYear?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    difficulty?: true
    examYear?: true
    examPeriod?: true
    explanation?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    subjectId?: true
    careerId?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    difficulty?: true
    examYear?: true
    examPeriod?: true
    explanation?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    subjectId?: true
    careerId?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    difficulty?: true
    examYear?: true
    examPeriod?: true
    explanation?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    subjectId?: true
    careerId?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    text: string
    imageUrl: string | null
    difficulty: $Enums.DifficultyLevel
    examYear: number | null
    examPeriod: string | null
    explanation: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    universityId: string
    subjectId: string
    careerId: string
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    difficulty?: boolean
    examYear?: boolean
    examPeriod?: boolean
    explanation?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectId?: boolean
    careerId?: boolean
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    studentAnswers?: boolean | Question$studentAnswersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    difficulty?: boolean
    examYear?: boolean
    examPeriod?: boolean
    explanation?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectId?: boolean
    careerId?: boolean
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    difficulty?: boolean
    examYear?: boolean
    examPeriod?: boolean
    explanation?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectId?: boolean
    careerId?: boolean
  }

  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    studentAnswers?: boolean | Question$studentAnswersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      university: Prisma.$UniversityPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      career: Prisma.$CareerPayload<ExtArgs>
      options: Prisma.$Question_OptionPayload<ExtArgs>[]
      studentAnswers: Prisma.$StudentAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      imageUrl: string | null
      difficulty: $Enums.DifficultyLevel
      examYear: number | null
      examPeriod: string | null
      explanation: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      universityId: string
      subjectId: string
      careerId: string
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    university<T extends UniversityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UniversityDefaultArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    career<T extends CareerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareerDefaultArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    options<T extends Question$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Question$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findMany"> | Null>
    studentAnswers<T extends Question$studentAnswersArgs<ExtArgs> = {}>(args?: Subset<T, Question$studentAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */ 
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly text: FieldRef<"Question", 'String'>
    readonly imageUrl: FieldRef<"Question", 'String'>
    readonly difficulty: FieldRef<"Question", 'DifficultyLevel'>
    readonly examYear: FieldRef<"Question", 'Int'>
    readonly examPeriod: FieldRef<"Question", 'String'>
    readonly explanation: FieldRef<"Question", 'String'>
    readonly isActive: FieldRef<"Question", 'Boolean'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
    readonly universityId: FieldRef<"Question", 'String'>
    readonly subjectId: FieldRef<"Question", 'String'>
    readonly careerId: FieldRef<"Question", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question.options
   */
  export type Question$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    where?: Question_OptionWhereInput
    orderBy?: Question_OptionOrderByWithRelationInput | Question_OptionOrderByWithRelationInput[]
    cursor?: Question_OptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_OptionScalarFieldEnum | Question_OptionScalarFieldEnum[]
  }

  /**
   * Question.studentAnswers
   */
  export type Question$studentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    cursor?: StudentAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Question_Option
   */

  export type AggregateQuestion_Option = {
    _count: Question_OptionCountAggregateOutputType | null
    _avg: Question_OptionAvgAggregateOutputType | null
    _sum: Question_OptionSumAggregateOutputType | null
    _min: Question_OptionMinAggregateOutputType | null
    _max: Question_OptionMaxAggregateOutputType | null
  }

  export type Question_OptionAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type Question_OptionSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type Question_OptionMinAggregateOutputType = {
    id: string | null
    text: string | null
    isCorrect: boolean | null
    orderIndex: number | null
    questionId: string | null
  }

  export type Question_OptionMaxAggregateOutputType = {
    id: string | null
    text: string | null
    isCorrect: boolean | null
    orderIndex: number | null
    questionId: string | null
  }

  export type Question_OptionCountAggregateOutputType = {
    id: number
    text: number
    isCorrect: number
    orderIndex: number
    questionId: number
    _all: number
  }


  export type Question_OptionAvgAggregateInputType = {
    orderIndex?: true
  }

  export type Question_OptionSumAggregateInputType = {
    orderIndex?: true
  }

  export type Question_OptionMinAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    orderIndex?: true
    questionId?: true
  }

  export type Question_OptionMaxAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    orderIndex?: true
    questionId?: true
  }

  export type Question_OptionCountAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    orderIndex?: true
    questionId?: true
    _all?: true
  }

  export type Question_OptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question_Option to aggregate.
     */
    where?: Question_OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Question_Options to fetch.
     */
    orderBy?: Question_OptionOrderByWithRelationInput | Question_OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Question_OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Question_Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Question_Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Question_Options
    **/
    _count?: true | Question_OptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Question_OptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Question_OptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Question_OptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Question_OptionMaxAggregateInputType
  }

  export type GetQuestion_OptionAggregateType<T extends Question_OptionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion_Option]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion_Option[P]>
      : GetScalarType<T[P], AggregateQuestion_Option[P]>
  }




  export type Question_OptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Question_OptionWhereInput
    orderBy?: Question_OptionOrderByWithAggregationInput | Question_OptionOrderByWithAggregationInput[]
    by: Question_OptionScalarFieldEnum[] | Question_OptionScalarFieldEnum
    having?: Question_OptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Question_OptionCountAggregateInputType | true
    _avg?: Question_OptionAvgAggregateInputType
    _sum?: Question_OptionSumAggregateInputType
    _min?: Question_OptionMinAggregateInputType
    _max?: Question_OptionMaxAggregateInputType
  }

  export type Question_OptionGroupByOutputType = {
    id: string
    text: string
    isCorrect: boolean
    orderIndex: number
    questionId: string
    _count: Question_OptionCountAggregateOutputType | null
    _avg: Question_OptionAvgAggregateOutputType | null
    _sum: Question_OptionSumAggregateOutputType | null
    _min: Question_OptionMinAggregateOutputType | null
    _max: Question_OptionMaxAggregateOutputType | null
  }

  type GetQuestion_OptionGroupByPayload<T extends Question_OptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Question_OptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Question_OptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Question_OptionGroupByOutputType[P]>
            : GetScalarType<T[P], Question_OptionGroupByOutputType[P]>
        }
      >
    >


  export type Question_OptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    isCorrect?: boolean
    orderIndex?: boolean
    questionId?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    studentAnswers?: boolean | Question_Option$studentAnswersArgs<ExtArgs>
    _count?: boolean | Question_OptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_Option"]>

  export type Question_OptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    isCorrect?: boolean
    orderIndex?: boolean
    questionId?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_Option"]>

  export type Question_OptionSelectScalar = {
    id?: boolean
    text?: boolean
    isCorrect?: boolean
    orderIndex?: boolean
    questionId?: boolean
  }

  export type Question_OptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    studentAnswers?: boolean | Question_Option$studentAnswersArgs<ExtArgs>
    _count?: boolean | Question_OptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type Question_OptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $Question_OptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question_Option"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
      studentAnswers: Prisma.$StudentAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      isCorrect: boolean
      orderIndex: number
      questionId: string
    }, ExtArgs["result"]["question_Option"]>
    composites: {}
  }

  type Question_OptionGetPayload<S extends boolean | null | undefined | Question_OptionDefaultArgs> = $Result.GetResult<Prisma.$Question_OptionPayload, S>

  type Question_OptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Question_OptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Question_OptionCountAggregateInputType | true
    }

  export interface Question_OptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question_Option'], meta: { name: 'Question_Option' } }
    /**
     * Find zero or one Question_Option that matches the filter.
     * @param {Question_OptionFindUniqueArgs} args - Arguments to find a Question_Option
     * @example
     * // Get one Question_Option
     * const question_Option = await prisma.question_Option.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Question_OptionFindUniqueArgs>(args: SelectSubset<T, Question_OptionFindUniqueArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Question_Option that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Question_OptionFindUniqueOrThrowArgs} args - Arguments to find a Question_Option
     * @example
     * // Get one Question_Option
     * const question_Option = await prisma.question_Option.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Question_OptionFindUniqueOrThrowArgs>(args: SelectSubset<T, Question_OptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Question_Option that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionFindFirstArgs} args - Arguments to find a Question_Option
     * @example
     * // Get one Question_Option
     * const question_Option = await prisma.question_Option.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Question_OptionFindFirstArgs>(args?: SelectSubset<T, Question_OptionFindFirstArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Question_Option that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionFindFirstOrThrowArgs} args - Arguments to find a Question_Option
     * @example
     * // Get one Question_Option
     * const question_Option = await prisma.question_Option.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Question_OptionFindFirstOrThrowArgs>(args?: SelectSubset<T, Question_OptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Question_Options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Question_Options
     * const question_Options = await prisma.question_Option.findMany()
     * 
     * // Get first 10 Question_Options
     * const question_Options = await prisma.question_Option.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const question_OptionWithIdOnly = await prisma.question_Option.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Question_OptionFindManyArgs>(args?: SelectSubset<T, Question_OptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Question_Option.
     * @param {Question_OptionCreateArgs} args - Arguments to create a Question_Option.
     * @example
     * // Create one Question_Option
     * const Question_Option = await prisma.question_Option.create({
     *   data: {
     *     // ... data to create a Question_Option
     *   }
     * })
     * 
     */
    create<T extends Question_OptionCreateArgs>(args: SelectSubset<T, Question_OptionCreateArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Question_Options.
     * @param {Question_OptionCreateManyArgs} args - Arguments to create many Question_Options.
     * @example
     * // Create many Question_Options
     * const question_Option = await prisma.question_Option.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Question_OptionCreateManyArgs>(args?: SelectSubset<T, Question_OptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Question_Options and returns the data saved in the database.
     * @param {Question_OptionCreateManyAndReturnArgs} args - Arguments to create many Question_Options.
     * @example
     * // Create many Question_Options
     * const question_Option = await prisma.question_Option.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Question_Options and only return the `id`
     * const question_OptionWithIdOnly = await prisma.question_Option.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Question_OptionCreateManyAndReturnArgs>(args?: SelectSubset<T, Question_OptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Question_Option.
     * @param {Question_OptionDeleteArgs} args - Arguments to delete one Question_Option.
     * @example
     * // Delete one Question_Option
     * const Question_Option = await prisma.question_Option.delete({
     *   where: {
     *     // ... filter to delete one Question_Option
     *   }
     * })
     * 
     */
    delete<T extends Question_OptionDeleteArgs>(args: SelectSubset<T, Question_OptionDeleteArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Question_Option.
     * @param {Question_OptionUpdateArgs} args - Arguments to update one Question_Option.
     * @example
     * // Update one Question_Option
     * const question_Option = await prisma.question_Option.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Question_OptionUpdateArgs>(args: SelectSubset<T, Question_OptionUpdateArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Question_Options.
     * @param {Question_OptionDeleteManyArgs} args - Arguments to filter Question_Options to delete.
     * @example
     * // Delete a few Question_Options
     * const { count } = await prisma.question_Option.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Question_OptionDeleteManyArgs>(args?: SelectSubset<T, Question_OptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Question_Options
     * const question_Option = await prisma.question_Option.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Question_OptionUpdateManyArgs>(args: SelectSubset<T, Question_OptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question_Option.
     * @param {Question_OptionUpsertArgs} args - Arguments to update or create a Question_Option.
     * @example
     * // Update or create a Question_Option
     * const question_Option = await prisma.question_Option.upsert({
     *   create: {
     *     // ... data to create a Question_Option
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question_Option we want to update
     *   }
     * })
     */
    upsert<T extends Question_OptionUpsertArgs>(args: SelectSubset<T, Question_OptionUpsertArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Question_Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionCountArgs} args - Arguments to filter Question_Options to count.
     * @example
     * // Count the number of Question_Options
     * const count = await prisma.question_Option.count({
     *   where: {
     *     // ... the filter for the Question_Options we want to count
     *   }
     * })
    **/
    count<T extends Question_OptionCountArgs>(
      args?: Subset<T, Question_OptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Question_OptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question_Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Question_OptionAggregateArgs>(args: Subset<T, Question_OptionAggregateArgs>): Prisma.PrismaPromise<GetQuestion_OptionAggregateType<T>>

    /**
     * Group by Question_Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_OptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Question_OptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Question_OptionGroupByArgs['orderBy'] }
        : { orderBy?: Question_OptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Question_OptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestion_OptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question_Option model
   */
  readonly fields: Question_OptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question_Option.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Question_OptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    studentAnswers<T extends Question_Option$studentAnswersArgs<ExtArgs> = {}>(args?: Subset<T, Question_Option$studentAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question_Option model
   */ 
  interface Question_OptionFieldRefs {
    readonly id: FieldRef<"Question_Option", 'String'>
    readonly text: FieldRef<"Question_Option", 'String'>
    readonly isCorrect: FieldRef<"Question_Option", 'Boolean'>
    readonly orderIndex: FieldRef<"Question_Option", 'Int'>
    readonly questionId: FieldRef<"Question_Option", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Question_Option findUnique
   */
  export type Question_OptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter, which Question_Option to fetch.
     */
    where: Question_OptionWhereUniqueInput
  }

  /**
   * Question_Option findUniqueOrThrow
   */
  export type Question_OptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter, which Question_Option to fetch.
     */
    where: Question_OptionWhereUniqueInput
  }

  /**
   * Question_Option findFirst
   */
  export type Question_OptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter, which Question_Option to fetch.
     */
    where?: Question_OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Question_Options to fetch.
     */
    orderBy?: Question_OptionOrderByWithRelationInput | Question_OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Question_Options.
     */
    cursor?: Question_OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Question_Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Question_Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Question_Options.
     */
    distinct?: Question_OptionScalarFieldEnum | Question_OptionScalarFieldEnum[]
  }

  /**
   * Question_Option findFirstOrThrow
   */
  export type Question_OptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter, which Question_Option to fetch.
     */
    where?: Question_OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Question_Options to fetch.
     */
    orderBy?: Question_OptionOrderByWithRelationInput | Question_OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Question_Options.
     */
    cursor?: Question_OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Question_Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Question_Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Question_Options.
     */
    distinct?: Question_OptionScalarFieldEnum | Question_OptionScalarFieldEnum[]
  }

  /**
   * Question_Option findMany
   */
  export type Question_OptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter, which Question_Options to fetch.
     */
    where?: Question_OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Question_Options to fetch.
     */
    orderBy?: Question_OptionOrderByWithRelationInput | Question_OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Question_Options.
     */
    cursor?: Question_OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Question_Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Question_Options.
     */
    skip?: number
    distinct?: Question_OptionScalarFieldEnum | Question_OptionScalarFieldEnum[]
  }

  /**
   * Question_Option create
   */
  export type Question_OptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question_Option.
     */
    data: XOR<Question_OptionCreateInput, Question_OptionUncheckedCreateInput>
  }

  /**
   * Question_Option createMany
   */
  export type Question_OptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Question_Options.
     */
    data: Question_OptionCreateManyInput | Question_OptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question_Option createManyAndReturn
   */
  export type Question_OptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Question_Options.
     */
    data: Question_OptionCreateManyInput | Question_OptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question_Option update
   */
  export type Question_OptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question_Option.
     */
    data: XOR<Question_OptionUpdateInput, Question_OptionUncheckedUpdateInput>
    /**
     * Choose, which Question_Option to update.
     */
    where: Question_OptionWhereUniqueInput
  }

  /**
   * Question_Option updateMany
   */
  export type Question_OptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Question_Options.
     */
    data: XOR<Question_OptionUpdateManyMutationInput, Question_OptionUncheckedUpdateManyInput>
    /**
     * Filter which Question_Options to update
     */
    where?: Question_OptionWhereInput
  }

  /**
   * Question_Option upsert
   */
  export type Question_OptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question_Option to update in case it exists.
     */
    where: Question_OptionWhereUniqueInput
    /**
     * In case the Question_Option found by the `where` argument doesn't exist, create a new Question_Option with this data.
     */
    create: XOR<Question_OptionCreateInput, Question_OptionUncheckedCreateInput>
    /**
     * In case the Question_Option was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Question_OptionUpdateInput, Question_OptionUncheckedUpdateInput>
  }

  /**
   * Question_Option delete
   */
  export type Question_OptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    /**
     * Filter which Question_Option to delete.
     */
    where: Question_OptionWhereUniqueInput
  }

  /**
   * Question_Option deleteMany
   */
  export type Question_OptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question_Options to delete
     */
    where?: Question_OptionWhereInput
  }

  /**
   * Question_Option.studentAnswers
   */
  export type Question_Option$studentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    cursor?: StudentAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * Question_Option without action
   */
  export type Question_OptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
  }


  /**
   * Model ExamAttempt
   */

  export type AggregateExamAttempt = {
    _count: ExamAttemptCountAggregateOutputType | null
    _avg: ExamAttemptAvgAggregateOutputType | null
    _sum: ExamAttemptSumAggregateOutputType | null
    _min: ExamAttemptMinAggregateOutputType | null
    _max: ExamAttemptMaxAggregateOutputType | null
  }

  export type ExamAttemptAvgAggregateOutputType = {
    score: number | null
    totalQuestions: number | null
    correctAnswers: number | null
    examYears: number | null
  }

  export type ExamAttemptSumAggregateOutputType = {
    score: number | null
    totalQuestions: number | null
    correctAnswers: number | null
    examYears: number[]
  }

  export type ExamAttemptMinAggregateOutputType = {
    id: string | null
    status: $Enums.ExamAttemptStatus | null
    score: number | null
    totalQuestions: number | null
    correctAnswers: number | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    universityId: string | null
    difficulty: $Enums.DifficultyLevel | null
    userId: string | null
  }

  export type ExamAttemptMaxAggregateOutputType = {
    id: string | null
    status: $Enums.ExamAttemptStatus | null
    score: number | null
    totalQuestions: number | null
    correctAnswers: number | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    universityId: string | null
    difficulty: $Enums.DifficultyLevel | null
    userId: string | null
  }

  export type ExamAttemptCountAggregateOutputType = {
    id: number
    status: number
    score: number
    totalQuestions: number
    correctAnswers: number
    startedAt: number
    completedAt: number
    createdAt: number
    updatedAt: number
    universityId: number
    subjectIds: number
    careerIds: number
    difficulty: number
    examYears: number
    userId: number
    _all: number
  }


  export type ExamAttemptAvgAggregateInputType = {
    score?: true
    totalQuestions?: true
    correctAnswers?: true
    examYears?: true
  }

  export type ExamAttemptSumAggregateInputType = {
    score?: true
    totalQuestions?: true
    correctAnswers?: true
    examYears?: true
  }

  export type ExamAttemptMinAggregateInputType = {
    id?: true
    status?: true
    score?: true
    totalQuestions?: true
    correctAnswers?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    difficulty?: true
    userId?: true
  }

  export type ExamAttemptMaxAggregateInputType = {
    id?: true
    status?: true
    score?: true
    totalQuestions?: true
    correctAnswers?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    difficulty?: true
    userId?: true
  }

  export type ExamAttemptCountAggregateInputType = {
    id?: true
    status?: true
    score?: true
    totalQuestions?: true
    correctAnswers?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    universityId?: true
    subjectIds?: true
    careerIds?: true
    difficulty?: true
    examYears?: true
    userId?: true
    _all?: true
  }

  export type ExamAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamAttempt to aggregate.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamAttempts
    **/
    _count?: true | ExamAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamAttemptMaxAggregateInputType
  }

  export type GetExamAttemptAggregateType<T extends ExamAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateExamAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamAttempt[P]>
      : GetScalarType<T[P], AggregateExamAttempt[P]>
  }




  export type ExamAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithAggregationInput | ExamAttemptOrderByWithAggregationInput[]
    by: ExamAttemptScalarFieldEnum[] | ExamAttemptScalarFieldEnum
    having?: ExamAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamAttemptCountAggregateInputType | true
    _avg?: ExamAttemptAvgAggregateInputType
    _sum?: ExamAttemptSumAggregateInputType
    _min?: ExamAttemptMinAggregateInputType
    _max?: ExamAttemptMaxAggregateInputType
  }

  export type ExamAttemptGroupByOutputType = {
    id: string
    status: $Enums.ExamAttemptStatus
    score: number | null
    totalQuestions: number
    correctAnswers: number
    startedAt: Date
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    universityId: string
    subjectIds: string[]
    careerIds: string[]
    difficulty: $Enums.DifficultyLevel | null
    examYears: number[]
    userId: string
    _count: ExamAttemptCountAggregateOutputType | null
    _avg: ExamAttemptAvgAggregateOutputType | null
    _sum: ExamAttemptSumAggregateOutputType | null
    _min: ExamAttemptMinAggregateOutputType | null
    _max: ExamAttemptMaxAggregateOutputType | null
  }

  type GetExamAttemptGroupByPayload<T extends ExamAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], ExamAttemptGroupByOutputType[P]>
        }
      >
    >


  export type ExamAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    score?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectIds?: boolean
    careerIds?: boolean
    difficulty?: boolean
    examYears?: boolean
    userId?: boolean
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    studentAnswers?: boolean | ExamAttempt$studentAnswersArgs<ExtArgs>
    _count?: boolean | ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examAttempt"]>

  export type ExamAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    score?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectIds?: boolean
    careerIds?: boolean
    difficulty?: boolean
    examYears?: boolean
    userId?: boolean
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examAttempt"]>

  export type ExamAttemptSelectScalar = {
    id?: boolean
    status?: boolean
    score?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    universityId?: boolean
    subjectIds?: boolean
    careerIds?: boolean
    difficulty?: boolean
    examYears?: boolean
    userId?: boolean
  }

  export type ExamAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    studentAnswers?: boolean | ExamAttempt$studentAnswersArgs<ExtArgs>
    _count?: boolean | ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExamAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    university?: boolean | UniversityDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExamAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExamAttempt"
    objects: {
      university: Prisma.$UniversityPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      studentAnswers: Prisma.$StudentAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.ExamAttemptStatus
      score: number | null
      totalQuestions: number
      correctAnswers: number
      startedAt: Date
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
      universityId: string
      subjectIds: string[]
      careerIds: string[]
      difficulty: $Enums.DifficultyLevel | null
      examYears: number[]
      userId: string
    }, ExtArgs["result"]["examAttempt"]>
    composites: {}
  }

  type ExamAttemptGetPayload<S extends boolean | null | undefined | ExamAttemptDefaultArgs> = $Result.GetResult<Prisma.$ExamAttemptPayload, S>

  type ExamAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExamAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExamAttemptCountAggregateInputType | true
    }

  export interface ExamAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExamAttempt'], meta: { name: 'ExamAttempt' } }
    /**
     * Find zero or one ExamAttempt that matches the filter.
     * @param {ExamAttemptFindUniqueArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamAttemptFindUniqueArgs>(args: SelectSubset<T, ExamAttemptFindUniqueArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExamAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExamAttemptFindUniqueOrThrowArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExamAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindFirstArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamAttemptFindFirstArgs>(args?: SelectSubset<T, ExamAttemptFindFirstArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExamAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindFirstOrThrowArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExamAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamAttempts
     * const examAttempts = await prisma.examAttempt.findMany()
     * 
     * // Get first 10 ExamAttempts
     * const examAttempts = await prisma.examAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examAttemptWithIdOnly = await prisma.examAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamAttemptFindManyArgs>(args?: SelectSubset<T, ExamAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExamAttempt.
     * @param {ExamAttemptCreateArgs} args - Arguments to create a ExamAttempt.
     * @example
     * // Create one ExamAttempt
     * const ExamAttempt = await prisma.examAttempt.create({
     *   data: {
     *     // ... data to create a ExamAttempt
     *   }
     * })
     * 
     */
    create<T extends ExamAttemptCreateArgs>(args: SelectSubset<T, ExamAttemptCreateArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExamAttempts.
     * @param {ExamAttemptCreateManyArgs} args - Arguments to create many ExamAttempts.
     * @example
     * // Create many ExamAttempts
     * const examAttempt = await prisma.examAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamAttemptCreateManyArgs>(args?: SelectSubset<T, ExamAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExamAttempts and returns the data saved in the database.
     * @param {ExamAttemptCreateManyAndReturnArgs} args - Arguments to create many ExamAttempts.
     * @example
     * // Create many ExamAttempts
     * const examAttempt = await prisma.examAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExamAttempts and only return the `id`
     * const examAttemptWithIdOnly = await prisma.examAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExamAttempt.
     * @param {ExamAttemptDeleteArgs} args - Arguments to delete one ExamAttempt.
     * @example
     * // Delete one ExamAttempt
     * const ExamAttempt = await prisma.examAttempt.delete({
     *   where: {
     *     // ... filter to delete one ExamAttempt
     *   }
     * })
     * 
     */
    delete<T extends ExamAttemptDeleteArgs>(args: SelectSubset<T, ExamAttemptDeleteArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExamAttempt.
     * @param {ExamAttemptUpdateArgs} args - Arguments to update one ExamAttempt.
     * @example
     * // Update one ExamAttempt
     * const examAttempt = await prisma.examAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamAttemptUpdateArgs>(args: SelectSubset<T, ExamAttemptUpdateArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExamAttempts.
     * @param {ExamAttemptDeleteManyArgs} args - Arguments to filter ExamAttempts to delete.
     * @example
     * // Delete a few ExamAttempts
     * const { count } = await prisma.examAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamAttemptDeleteManyArgs>(args?: SelectSubset<T, ExamAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamAttempts
     * const examAttempt = await prisma.examAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamAttemptUpdateManyArgs>(args: SelectSubset<T, ExamAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamAttempt.
     * @param {ExamAttemptUpsertArgs} args - Arguments to update or create a ExamAttempt.
     * @example
     * // Update or create a ExamAttempt
     * const examAttempt = await prisma.examAttempt.upsert({
     *   create: {
     *     // ... data to create a ExamAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamAttempt we want to update
     *   }
     * })
     */
    upsert<T extends ExamAttemptUpsertArgs>(args: SelectSubset<T, ExamAttemptUpsertArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExamAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptCountArgs} args - Arguments to filter ExamAttempts to count.
     * @example
     * // Count the number of ExamAttempts
     * const count = await prisma.examAttempt.count({
     *   where: {
     *     // ... the filter for the ExamAttempts we want to count
     *   }
     * })
    **/
    count<T extends ExamAttemptCountArgs>(
      args?: Subset<T, ExamAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAttemptAggregateArgs>(args: Subset<T, ExamAttemptAggregateArgs>): Prisma.PrismaPromise<GetExamAttemptAggregateType<T>>

    /**
     * Group by ExamAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamAttemptGroupByArgs['orderBy'] }
        : { orderBy?: ExamAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExamAttempt model
   */
  readonly fields: ExamAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    university<T extends UniversityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UniversityDefaultArgs<ExtArgs>>): Prisma__UniversityClient<$Result.GetResult<Prisma.$UniversityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    studentAnswers<T extends ExamAttempt$studentAnswersArgs<ExtArgs> = {}>(args?: Subset<T, ExamAttempt$studentAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExamAttempt model
   */ 
  interface ExamAttemptFieldRefs {
    readonly id: FieldRef<"ExamAttempt", 'String'>
    readonly status: FieldRef<"ExamAttempt", 'ExamAttemptStatus'>
    readonly score: FieldRef<"ExamAttempt", 'Float'>
    readonly totalQuestions: FieldRef<"ExamAttempt", 'Int'>
    readonly correctAnswers: FieldRef<"ExamAttempt", 'Int'>
    readonly startedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly completedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly createdAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly updatedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly universityId: FieldRef<"ExamAttempt", 'String'>
    readonly subjectIds: FieldRef<"ExamAttempt", 'String[]'>
    readonly careerIds: FieldRef<"ExamAttempt", 'String[]'>
    readonly difficulty: FieldRef<"ExamAttempt", 'DifficultyLevel'>
    readonly examYears: FieldRef<"ExamAttempt", 'Int[]'>
    readonly userId: FieldRef<"ExamAttempt", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExamAttempt findUnique
   */
  export type ExamAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt findUniqueOrThrow
   */
  export type ExamAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt findFirst
   */
  export type ExamAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamAttempts.
     */
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt findFirstOrThrow
   */
  export type ExamAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamAttempts.
     */
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt findMany
   */
  export type ExamAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempts to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt create
   */
  export type ExamAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a ExamAttempt.
     */
    data: XOR<ExamAttemptCreateInput, ExamAttemptUncheckedCreateInput>
  }

  /**
   * ExamAttempt createMany
   */
  export type ExamAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExamAttempts.
     */
    data: ExamAttemptCreateManyInput | ExamAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExamAttempt createManyAndReturn
   */
  export type ExamAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExamAttempts.
     */
    data: ExamAttemptCreateManyInput | ExamAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamAttempt update
   */
  export type ExamAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a ExamAttempt.
     */
    data: XOR<ExamAttemptUpdateInput, ExamAttemptUncheckedUpdateInput>
    /**
     * Choose, which ExamAttempt to update.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt updateMany
   */
  export type ExamAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExamAttempts.
     */
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyInput>
    /**
     * Filter which ExamAttempts to update
     */
    where?: ExamAttemptWhereInput
  }

  /**
   * ExamAttempt upsert
   */
  export type ExamAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the ExamAttempt to update in case it exists.
     */
    where: ExamAttemptWhereUniqueInput
    /**
     * In case the ExamAttempt found by the `where` argument doesn't exist, create a new ExamAttempt with this data.
     */
    create: XOR<ExamAttemptCreateInput, ExamAttemptUncheckedCreateInput>
    /**
     * In case the ExamAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamAttemptUpdateInput, ExamAttemptUncheckedUpdateInput>
  }

  /**
   * ExamAttempt delete
   */
  export type ExamAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter which ExamAttempt to delete.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt deleteMany
   */
  export type ExamAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamAttempts to delete
     */
    where?: ExamAttemptWhereInput
  }

  /**
   * ExamAttempt.studentAnswers
   */
  export type ExamAttempt$studentAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    cursor?: StudentAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * ExamAttempt without action
   */
  export type ExamAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
  }


  /**
   * Model StudentAnswer
   */

  export type AggregateStudentAnswer = {
    _count: StudentAnswerCountAggregateOutputType | null
    _min: StudentAnswerMinAggregateOutputType | null
    _max: StudentAnswerMaxAggregateOutputType | null
  }

  export type StudentAnswerMinAggregateOutputType = {
    id: string | null
    isCorrect: boolean | null
    answeredAt: Date | null
    examAttemptId: string | null
    questionId: string | null
    selectedOptionId: string | null
  }

  export type StudentAnswerMaxAggregateOutputType = {
    id: string | null
    isCorrect: boolean | null
    answeredAt: Date | null
    examAttemptId: string | null
    questionId: string | null
    selectedOptionId: string | null
  }

  export type StudentAnswerCountAggregateOutputType = {
    id: number
    isCorrect: number
    answeredAt: number
    examAttemptId: number
    questionId: number
    selectedOptionId: number
    _all: number
  }


  export type StudentAnswerMinAggregateInputType = {
    id?: true
    isCorrect?: true
    answeredAt?: true
    examAttemptId?: true
    questionId?: true
    selectedOptionId?: true
  }

  export type StudentAnswerMaxAggregateInputType = {
    id?: true
    isCorrect?: true
    answeredAt?: true
    examAttemptId?: true
    questionId?: true
    selectedOptionId?: true
  }

  export type StudentAnswerCountAggregateInputType = {
    id?: true
    isCorrect?: true
    answeredAt?: true
    examAttemptId?: true
    questionId?: true
    selectedOptionId?: true
    _all?: true
  }

  export type StudentAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAnswer to aggregate.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentAnswers
    **/
    _count?: true | StudentAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentAnswerMaxAggregateInputType
  }

  export type GetStudentAnswerAggregateType<T extends StudentAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentAnswer[P]>
      : GetScalarType<T[P], AggregateStudentAnswer[P]>
  }




  export type StudentAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithAggregationInput | StudentAnswerOrderByWithAggregationInput[]
    by: StudentAnswerScalarFieldEnum[] | StudentAnswerScalarFieldEnum
    having?: StudentAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentAnswerCountAggregateInputType | true
    _min?: StudentAnswerMinAggregateInputType
    _max?: StudentAnswerMaxAggregateInputType
  }

  export type StudentAnswerGroupByOutputType = {
    id: string
    isCorrect: boolean
    answeredAt: Date
    examAttemptId: string
    questionId: string
    selectedOptionId: string | null
    _count: StudentAnswerCountAggregateOutputType | null
    _min: StudentAnswerMinAggregateOutputType | null
    _max: StudentAnswerMaxAggregateOutputType | null
  }

  type GetStudentAnswerGroupByPayload<T extends StudentAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], StudentAnswerGroupByOutputType[P]>
        }
      >
    >


  export type StudentAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isCorrect?: boolean
    answeredAt?: boolean
    examAttemptId?: boolean
    questionId?: boolean
    selectedOptionId?: boolean
    examAttempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    selectedOption?: boolean | StudentAnswer$selectedOptionArgs<ExtArgs>
  }, ExtArgs["result"]["studentAnswer"]>

  export type StudentAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isCorrect?: boolean
    answeredAt?: boolean
    examAttemptId?: boolean
    questionId?: boolean
    selectedOptionId?: boolean
    examAttempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    selectedOption?: boolean | StudentAnswer$selectedOptionArgs<ExtArgs>
  }, ExtArgs["result"]["studentAnswer"]>

  export type StudentAnswerSelectScalar = {
    id?: boolean
    isCorrect?: boolean
    answeredAt?: boolean
    examAttemptId?: boolean
    questionId?: boolean
    selectedOptionId?: boolean
  }

  export type StudentAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examAttempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    selectedOption?: boolean | StudentAnswer$selectedOptionArgs<ExtArgs>
  }
  export type StudentAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examAttempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    selectedOption?: boolean | StudentAnswer$selectedOptionArgs<ExtArgs>
  }

  export type $StudentAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentAnswer"
    objects: {
      examAttempt: Prisma.$ExamAttemptPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
      selectedOption: Prisma.$Question_OptionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      isCorrect: boolean
      answeredAt: Date
      examAttemptId: string
      questionId: string
      selectedOptionId: string | null
    }, ExtArgs["result"]["studentAnswer"]>
    composites: {}
  }

  type StudentAnswerGetPayload<S extends boolean | null | undefined | StudentAnswerDefaultArgs> = $Result.GetResult<Prisma.$StudentAnswerPayload, S>

  type StudentAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentAnswerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentAnswerCountAggregateInputType | true
    }

  export interface StudentAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentAnswer'], meta: { name: 'StudentAnswer' } }
    /**
     * Find zero or one StudentAnswer that matches the filter.
     * @param {StudentAnswerFindUniqueArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentAnswerFindUniqueArgs>(args: SelectSubset<T, StudentAnswerFindUniqueArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StudentAnswer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentAnswerFindUniqueOrThrowArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StudentAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindFirstArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentAnswerFindFirstArgs>(args?: SelectSubset<T, StudentAnswerFindFirstArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StudentAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindFirstOrThrowArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StudentAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentAnswers
     * const studentAnswers = await prisma.studentAnswer.findMany()
     * 
     * // Get first 10 StudentAnswers
     * const studentAnswers = await prisma.studentAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentAnswerWithIdOnly = await prisma.studentAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentAnswerFindManyArgs>(args?: SelectSubset<T, StudentAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StudentAnswer.
     * @param {StudentAnswerCreateArgs} args - Arguments to create a StudentAnswer.
     * @example
     * // Create one StudentAnswer
     * const StudentAnswer = await prisma.studentAnswer.create({
     *   data: {
     *     // ... data to create a StudentAnswer
     *   }
     * })
     * 
     */
    create<T extends StudentAnswerCreateArgs>(args: SelectSubset<T, StudentAnswerCreateArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StudentAnswers.
     * @param {StudentAnswerCreateManyArgs} args - Arguments to create many StudentAnswers.
     * @example
     * // Create many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentAnswerCreateManyArgs>(args?: SelectSubset<T, StudentAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentAnswers and returns the data saved in the database.
     * @param {StudentAnswerCreateManyAndReturnArgs} args - Arguments to create many StudentAnswers.
     * @example
     * // Create many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentAnswers and only return the `id`
     * const studentAnswerWithIdOnly = await prisma.studentAnswer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StudentAnswer.
     * @param {StudentAnswerDeleteArgs} args - Arguments to delete one StudentAnswer.
     * @example
     * // Delete one StudentAnswer
     * const StudentAnswer = await prisma.studentAnswer.delete({
     *   where: {
     *     // ... filter to delete one StudentAnswer
     *   }
     * })
     * 
     */
    delete<T extends StudentAnswerDeleteArgs>(args: SelectSubset<T, StudentAnswerDeleteArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StudentAnswer.
     * @param {StudentAnswerUpdateArgs} args - Arguments to update one StudentAnswer.
     * @example
     * // Update one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentAnswerUpdateArgs>(args: SelectSubset<T, StudentAnswerUpdateArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StudentAnswers.
     * @param {StudentAnswerDeleteManyArgs} args - Arguments to filter StudentAnswers to delete.
     * @example
     * // Delete a few StudentAnswers
     * const { count } = await prisma.studentAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentAnswerDeleteManyArgs>(args?: SelectSubset<T, StudentAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentAnswerUpdateManyArgs>(args: SelectSubset<T, StudentAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StudentAnswer.
     * @param {StudentAnswerUpsertArgs} args - Arguments to update or create a StudentAnswer.
     * @example
     * // Update or create a StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.upsert({
     *   create: {
     *     // ... data to create a StudentAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentAnswer we want to update
     *   }
     * })
     */
    upsert<T extends StudentAnswerUpsertArgs>(args: SelectSubset<T, StudentAnswerUpsertArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StudentAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerCountArgs} args - Arguments to filter StudentAnswers to count.
     * @example
     * // Count the number of StudentAnswers
     * const count = await prisma.studentAnswer.count({
     *   where: {
     *     // ... the filter for the StudentAnswers we want to count
     *   }
     * })
    **/
    count<T extends StudentAnswerCountArgs>(
      args?: Subset<T, StudentAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAnswerAggregateArgs>(args: Subset<T, StudentAnswerAggregateArgs>): Prisma.PrismaPromise<GetStudentAnswerAggregateType<T>>

    /**
     * Group by StudentAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentAnswerGroupByArgs['orderBy'] }
        : { orderBy?: StudentAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentAnswer model
   */
  readonly fields: StudentAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    examAttempt<T extends ExamAttemptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamAttemptDefaultArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    selectedOption<T extends StudentAnswer$selectedOptionArgs<ExtArgs> = {}>(args?: Subset<T, StudentAnswer$selectedOptionArgs<ExtArgs>>): Prisma__Question_OptionClient<$Result.GetResult<Prisma.$Question_OptionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentAnswer model
   */ 
  interface StudentAnswerFieldRefs {
    readonly id: FieldRef<"StudentAnswer", 'String'>
    readonly isCorrect: FieldRef<"StudentAnswer", 'Boolean'>
    readonly answeredAt: FieldRef<"StudentAnswer", 'DateTime'>
    readonly examAttemptId: FieldRef<"StudentAnswer", 'String'>
    readonly questionId: FieldRef<"StudentAnswer", 'String'>
    readonly selectedOptionId: FieldRef<"StudentAnswer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StudentAnswer findUnique
   */
  export type StudentAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer findUniqueOrThrow
   */
  export type StudentAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer findFirst
   */
  export type StudentAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAnswers.
     */
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer findFirstOrThrow
   */
  export type StudentAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAnswers.
     */
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer findMany
   */
  export type StudentAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswers to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer create
   */
  export type StudentAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentAnswer.
     */
    data: XOR<StudentAnswerCreateInput, StudentAnswerUncheckedCreateInput>
  }

  /**
   * StudentAnswer createMany
   */
  export type StudentAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentAnswers.
     */
    data: StudentAnswerCreateManyInput | StudentAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentAnswer createManyAndReturn
   */
  export type StudentAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StudentAnswers.
     */
    data: StudentAnswerCreateManyInput | StudentAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentAnswer update
   */
  export type StudentAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentAnswer.
     */
    data: XOR<StudentAnswerUpdateInput, StudentAnswerUncheckedUpdateInput>
    /**
     * Choose, which StudentAnswer to update.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer updateMany
   */
  export type StudentAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentAnswers.
     */
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyInput>
    /**
     * Filter which StudentAnswers to update
     */
    where?: StudentAnswerWhereInput
  }

  /**
   * StudentAnswer upsert
   */
  export type StudentAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentAnswer to update in case it exists.
     */
    where: StudentAnswerWhereUniqueInput
    /**
     * In case the StudentAnswer found by the `where` argument doesn't exist, create a new StudentAnswer with this data.
     */
    create: XOR<StudentAnswerCreateInput, StudentAnswerUncheckedCreateInput>
    /**
     * In case the StudentAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentAnswerUpdateInput, StudentAnswerUncheckedUpdateInput>
  }

  /**
   * StudentAnswer delete
   */
  export type StudentAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter which StudentAnswer to delete.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer deleteMany
   */
  export type StudentAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAnswers to delete
     */
    where?: StudentAnswerWhereInput
  }

  /**
   * StudentAnswer.selectedOption
   */
  export type StudentAnswer$selectedOptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_Option
     */
    select?: Question_OptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Question_OptionInclude<ExtArgs> | null
    where?: Question_OptionWhereInput
  }

  /**
   * StudentAnswer without action
   */
  export type StudentAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    country: 'country',
    targetUniversityId: 'targetUniversityId',
    targetCareerId: 'targetCareerId',
    hasCompletedOnboarding: 'hasCompletedOnboarding'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UniversityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    shortName: 'shortName',
    city: 'city',
    region: 'region',
    country: 'country',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UniversityScalarFieldEnum = (typeof UniversityScalarFieldEnum)[keyof typeof UniversityScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const CareerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CareerScalarFieldEnum = (typeof CareerScalarFieldEnum)[keyof typeof CareerScalarFieldEnum]


  export const CareerSubjectScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    careerId: 'careerId',
    subjectId: 'subjectId'
  };

  export type CareerSubjectScalarFieldEnum = (typeof CareerSubjectScalarFieldEnum)[keyof typeof CareerSubjectScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    imageUrl: 'imageUrl',
    difficulty: 'difficulty',
    examYear: 'examYear',
    examPeriod: 'examPeriod',
    explanation: 'explanation',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    universityId: 'universityId',
    subjectId: 'subjectId',
    careerId: 'careerId'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const Question_OptionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    isCorrect: 'isCorrect',
    orderIndex: 'orderIndex',
    questionId: 'questionId'
  };

  export type Question_OptionScalarFieldEnum = (typeof Question_OptionScalarFieldEnum)[keyof typeof Question_OptionScalarFieldEnum]


  export const ExamAttemptScalarFieldEnum: {
    id: 'id',
    status: 'status',
    score: 'score',
    totalQuestions: 'totalQuestions',
    correctAnswers: 'correctAnswers',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    universityId: 'universityId',
    subjectIds: 'subjectIds',
    careerIds: 'careerIds',
    difficulty: 'difficulty',
    examYears: 'examYears',
    userId: 'userId'
  };

  export type ExamAttemptScalarFieldEnum = (typeof ExamAttemptScalarFieldEnum)[keyof typeof ExamAttemptScalarFieldEnum]


  export const StudentAnswerScalarFieldEnum: {
    id: 'id',
    isCorrect: 'isCorrect',
    answeredAt: 'answeredAt',
    examAttemptId: 'examAttemptId',
    questionId: 'questionId',
    selectedOptionId: 'selectedOptionId'
  };

  export type StudentAnswerScalarFieldEnum = (typeof StudentAnswerScalarFieldEnum)[keyof typeof StudentAnswerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DifficultyLevel'
   */
  export type EnumDifficultyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DifficultyLevel'>
    


  /**
   * Reference to a field of type 'DifficultyLevel[]'
   */
  export type ListEnumDifficultyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DifficultyLevel[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ExamAttemptStatus'
   */
  export type EnumExamAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamAttemptStatus'>
    


  /**
   * Reference to a field of type 'ExamAttemptStatus[]'
   */
  export type ListEnumExamAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamAttemptStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    targetUniversityId?: StringNullableFilter<"User"> | string | null
    targetCareerId?: StringNullableFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolFilter<"User"> | boolean
    targetUniversity?: XOR<UniversityNullableRelationFilter, UniversityWhereInput> | null
    targetCareer?: XOR<CareerNullableRelationFilter, CareerWhereInput> | null
    examAttempts?: ExamAttemptListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    targetUniversityId?: SortOrderInput | SortOrder
    targetCareerId?: SortOrderInput | SortOrder
    hasCompletedOnboarding?: SortOrder
    targetUniversity?: UniversityOrderByWithRelationInput
    targetCareer?: CareerOrderByWithRelationInput
    examAttempts?: ExamAttemptOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    targetUniversityId?: StringNullableFilter<"User"> | string | null
    targetCareerId?: StringNullableFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolFilter<"User"> | boolean
    targetUniversity?: XOR<UniversityNullableRelationFilter, UniversityWhereInput> | null
    targetCareer?: XOR<CareerNullableRelationFilter, CareerWhereInput> | null
    examAttempts?: ExamAttemptListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    targetUniversityId?: SortOrderInput | SortOrder
    targetCareerId?: SortOrderInput | SortOrder
    hasCompletedOnboarding?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    targetUniversityId?: StringNullableWithAggregatesFilter<"User"> | string | null
    targetCareerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type UniversityWhereInput = {
    AND?: UniversityWhereInput | UniversityWhereInput[]
    OR?: UniversityWhereInput[]
    NOT?: UniversityWhereInput | UniversityWhereInput[]
    id?: StringFilter<"University"> | string
    name?: StringFilter<"University"> | string
    shortName?: StringFilter<"University"> | string
    city?: StringFilter<"University"> | string
    region?: StringFilter<"University"> | string
    country?: StringFilter<"University"> | string
    isActive?: BoolFilter<"University"> | boolean
    createdAt?: DateTimeFilter<"University"> | Date | string
    updatedAt?: DateTimeFilter<"University"> | Date | string
    questions?: QuestionListRelationFilter
    users?: UserListRelationFilter
    examAttempts?: ExamAttemptListRelationFilter
  }

  export type UniversityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    city?: SortOrder
    region?: SortOrder
    country?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questions?: QuestionOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
    examAttempts?: ExamAttemptOrderByRelationAggregateInput
  }

  export type UniversityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    shortName?: string
    AND?: UniversityWhereInput | UniversityWhereInput[]
    OR?: UniversityWhereInput[]
    NOT?: UniversityWhereInput | UniversityWhereInput[]
    city?: StringFilter<"University"> | string
    region?: StringFilter<"University"> | string
    country?: StringFilter<"University"> | string
    isActive?: BoolFilter<"University"> | boolean
    createdAt?: DateTimeFilter<"University"> | Date | string
    updatedAt?: DateTimeFilter<"University"> | Date | string
    questions?: QuestionListRelationFilter
    users?: UserListRelationFilter
    examAttempts?: ExamAttemptListRelationFilter
  }, "id" | "name" | "shortName">

  export type UniversityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    city?: SortOrder
    region?: SortOrder
    country?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UniversityCountOrderByAggregateInput
    _max?: UniversityMaxOrderByAggregateInput
    _min?: UniversityMinOrderByAggregateInput
  }

  export type UniversityScalarWhereWithAggregatesInput = {
    AND?: UniversityScalarWhereWithAggregatesInput | UniversityScalarWhereWithAggregatesInput[]
    OR?: UniversityScalarWhereWithAggregatesInput[]
    NOT?: UniversityScalarWhereWithAggregatesInput | UniversityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"University"> | string
    name?: StringWithAggregatesFilter<"University"> | string
    shortName?: StringWithAggregatesFilter<"University"> | string
    city?: StringWithAggregatesFilter<"University"> | string
    region?: StringWithAggregatesFilter<"University"> | string
    country?: StringWithAggregatesFilter<"University"> | string
    isActive?: BoolWithAggregatesFilter<"University"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"University"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"University"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    isActive?: BoolFilter<"Subject"> | boolean
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    questions?: QuestionListRelationFilter
    careerSubjects?: CareerSubjectListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questions?: QuestionOrderByRelationAggregateInput
    careerSubjects?: CareerSubjectOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    description?: StringNullableFilter<"Subject"> | string | null
    isActive?: BoolFilter<"Subject"> | boolean
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    questions?: QuestionListRelationFilter
    careerSubjects?: CareerSubjectListRelationFilter
  }, "id" | "name">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subject"> | string
    name?: StringWithAggregatesFilter<"Subject"> | string
    description?: StringNullableWithAggregatesFilter<"Subject"> | string | null
    isActive?: BoolWithAggregatesFilter<"Subject"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
  }

  export type CareerWhereInput = {
    AND?: CareerWhereInput | CareerWhereInput[]
    OR?: CareerWhereInput[]
    NOT?: CareerWhereInput | CareerWhereInput[]
    id?: StringFilter<"Career"> | string
    name?: StringFilter<"Career"> | string
    isActive?: BoolFilter<"Career"> | boolean
    createdAt?: DateTimeFilter<"Career"> | Date | string
    updatedAt?: DateTimeFilter<"Career"> | Date | string
    questions?: QuestionListRelationFilter
    careerSubjects?: CareerSubjectListRelationFilter
    targetUsers?: UserListRelationFilter
  }

  export type CareerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questions?: QuestionOrderByRelationAggregateInput
    careerSubjects?: CareerSubjectOrderByRelationAggregateInput
    targetUsers?: UserOrderByRelationAggregateInput
  }

  export type CareerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CareerWhereInput | CareerWhereInput[]
    OR?: CareerWhereInput[]
    NOT?: CareerWhereInput | CareerWhereInput[]
    isActive?: BoolFilter<"Career"> | boolean
    createdAt?: DateTimeFilter<"Career"> | Date | string
    updatedAt?: DateTimeFilter<"Career"> | Date | string
    questions?: QuestionListRelationFilter
    careerSubjects?: CareerSubjectListRelationFilter
    targetUsers?: UserListRelationFilter
  }, "id" | "name">

  export type CareerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CareerCountOrderByAggregateInput
    _max?: CareerMaxOrderByAggregateInput
    _min?: CareerMinOrderByAggregateInput
  }

  export type CareerScalarWhereWithAggregatesInput = {
    AND?: CareerScalarWhereWithAggregatesInput | CareerScalarWhereWithAggregatesInput[]
    OR?: CareerScalarWhereWithAggregatesInput[]
    NOT?: CareerScalarWhereWithAggregatesInput | CareerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Career"> | string
    name?: StringWithAggregatesFilter<"Career"> | string
    isActive?: BoolWithAggregatesFilter<"Career"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Career"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Career"> | Date | string
  }

  export type CareerSubjectWhereInput = {
    AND?: CareerSubjectWhereInput | CareerSubjectWhereInput[]
    OR?: CareerSubjectWhereInput[]
    NOT?: CareerSubjectWhereInput | CareerSubjectWhereInput[]
    id?: StringFilter<"CareerSubject"> | string
    createdAt?: DateTimeFilter<"CareerSubject"> | Date | string
    careerId?: StringFilter<"CareerSubject"> | string
    subjectId?: StringFilter<"CareerSubject"> | string
    career?: XOR<CareerRelationFilter, CareerWhereInput>
    subject?: XOR<SubjectRelationFilter, SubjectWhereInput>
  }

  export type CareerSubjectOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    careerId?: SortOrder
    subjectId?: SortOrder
    career?: CareerOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type CareerSubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    careerId_subjectId?: CareerSubjectCareerIdSubjectIdCompoundUniqueInput
    AND?: CareerSubjectWhereInput | CareerSubjectWhereInput[]
    OR?: CareerSubjectWhereInput[]
    NOT?: CareerSubjectWhereInput | CareerSubjectWhereInput[]
    createdAt?: DateTimeFilter<"CareerSubject"> | Date | string
    careerId?: StringFilter<"CareerSubject"> | string
    subjectId?: StringFilter<"CareerSubject"> | string
    career?: XOR<CareerRelationFilter, CareerWhereInput>
    subject?: XOR<SubjectRelationFilter, SubjectWhereInput>
  }, "id" | "careerId_subjectId">

  export type CareerSubjectOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    careerId?: SortOrder
    subjectId?: SortOrder
    _count?: CareerSubjectCountOrderByAggregateInput
    _max?: CareerSubjectMaxOrderByAggregateInput
    _min?: CareerSubjectMinOrderByAggregateInput
  }

  export type CareerSubjectScalarWhereWithAggregatesInput = {
    AND?: CareerSubjectScalarWhereWithAggregatesInput | CareerSubjectScalarWhereWithAggregatesInput[]
    OR?: CareerSubjectScalarWhereWithAggregatesInput[]
    NOT?: CareerSubjectScalarWhereWithAggregatesInput | CareerSubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareerSubject"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareerSubject"> | Date | string
    careerId?: StringWithAggregatesFilter<"CareerSubject"> | string
    subjectId?: StringWithAggregatesFilter<"CareerSubject"> | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    imageUrl?: StringNullableFilter<"Question"> | string | null
    difficulty?: EnumDifficultyLevelFilter<"Question"> | $Enums.DifficultyLevel
    examYear?: IntNullableFilter<"Question"> | number | null
    examPeriod?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    isActive?: BoolFilter<"Question"> | boolean
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    universityId?: StringFilter<"Question"> | string
    subjectId?: StringFilter<"Question"> | string
    careerId?: StringFilter<"Question"> | string
    university?: XOR<UniversityRelationFilter, UniversityWhereInput>
    subject?: XOR<SubjectRelationFilter, SubjectWhereInput>
    career?: XOR<CareerRelationFilter, CareerWhereInput>
    options?: Question_OptionListRelationFilter
    studentAnswers?: StudentAnswerListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    examYear?: SortOrderInput | SortOrder
    examPeriod?: SortOrderInput | SortOrder
    explanation?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectId?: SortOrder
    careerId?: SortOrder
    university?: UniversityOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    career?: CareerOrderByWithRelationInput
    options?: Question_OptionOrderByRelationAggregateInput
    studentAnswers?: StudentAnswerOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    text?: StringFilter<"Question"> | string
    imageUrl?: StringNullableFilter<"Question"> | string | null
    difficulty?: EnumDifficultyLevelFilter<"Question"> | $Enums.DifficultyLevel
    examYear?: IntNullableFilter<"Question"> | number | null
    examPeriod?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    isActive?: BoolFilter<"Question"> | boolean
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    universityId?: StringFilter<"Question"> | string
    subjectId?: StringFilter<"Question"> | string
    careerId?: StringFilter<"Question"> | string
    university?: XOR<UniversityRelationFilter, UniversityWhereInput>
    subject?: XOR<SubjectRelationFilter, SubjectWhereInput>
    career?: XOR<CareerRelationFilter, CareerWhereInput>
    options?: Question_OptionListRelationFilter
    studentAnswers?: StudentAnswerListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    examYear?: SortOrderInput | SortOrder
    examPeriod?: SortOrderInput | SortOrder
    explanation?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectId?: SortOrder
    careerId?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    text?: StringWithAggregatesFilter<"Question"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Question"> | string | null
    difficulty?: EnumDifficultyLevelWithAggregatesFilter<"Question"> | $Enums.DifficultyLevel
    examYear?: IntNullableWithAggregatesFilter<"Question"> | number | null
    examPeriod?: StringNullableWithAggregatesFilter<"Question"> | string | null
    explanation?: StringNullableWithAggregatesFilter<"Question"> | string | null
    isActive?: BoolWithAggregatesFilter<"Question"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    universityId?: StringWithAggregatesFilter<"Question"> | string
    subjectId?: StringWithAggregatesFilter<"Question"> | string
    careerId?: StringWithAggregatesFilter<"Question"> | string
  }

  export type Question_OptionWhereInput = {
    AND?: Question_OptionWhereInput | Question_OptionWhereInput[]
    OR?: Question_OptionWhereInput[]
    NOT?: Question_OptionWhereInput | Question_OptionWhereInput[]
    id?: StringFilter<"Question_Option"> | string
    text?: StringFilter<"Question_Option"> | string
    isCorrect?: BoolFilter<"Question_Option"> | boolean
    orderIndex?: IntFilter<"Question_Option"> | number
    questionId?: StringFilter<"Question_Option"> | string
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
    studentAnswers?: StudentAnswerListRelationFilter
  }

  export type Question_OptionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    orderIndex?: SortOrder
    questionId?: SortOrder
    question?: QuestionOrderByWithRelationInput
    studentAnswers?: StudentAnswerOrderByRelationAggregateInput
  }

  export type Question_OptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    questionId_orderIndex?: Question_OptionQuestionIdOrderIndexCompoundUniqueInput
    AND?: Question_OptionWhereInput | Question_OptionWhereInput[]
    OR?: Question_OptionWhereInput[]
    NOT?: Question_OptionWhereInput | Question_OptionWhereInput[]
    text?: StringFilter<"Question_Option"> | string
    isCorrect?: BoolFilter<"Question_Option"> | boolean
    orderIndex?: IntFilter<"Question_Option"> | number
    questionId?: StringFilter<"Question_Option"> | string
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
    studentAnswers?: StudentAnswerListRelationFilter
  }, "id" | "questionId_orderIndex">

  export type Question_OptionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    orderIndex?: SortOrder
    questionId?: SortOrder
    _count?: Question_OptionCountOrderByAggregateInput
    _avg?: Question_OptionAvgOrderByAggregateInput
    _max?: Question_OptionMaxOrderByAggregateInput
    _min?: Question_OptionMinOrderByAggregateInput
    _sum?: Question_OptionSumOrderByAggregateInput
  }

  export type Question_OptionScalarWhereWithAggregatesInput = {
    AND?: Question_OptionScalarWhereWithAggregatesInput | Question_OptionScalarWhereWithAggregatesInput[]
    OR?: Question_OptionScalarWhereWithAggregatesInput[]
    NOT?: Question_OptionScalarWhereWithAggregatesInput | Question_OptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question_Option"> | string
    text?: StringWithAggregatesFilter<"Question_Option"> | string
    isCorrect?: BoolWithAggregatesFilter<"Question_Option"> | boolean
    orderIndex?: IntWithAggregatesFilter<"Question_Option"> | number
    questionId?: StringWithAggregatesFilter<"Question_Option"> | string
  }

  export type ExamAttemptWhereInput = {
    AND?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    OR?: ExamAttemptWhereInput[]
    NOT?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    id?: StringFilter<"ExamAttempt"> | string
    status?: EnumExamAttemptStatusFilter<"ExamAttempt"> | $Enums.ExamAttemptStatus
    score?: FloatNullableFilter<"ExamAttempt"> | number | null
    totalQuestions?: IntFilter<"ExamAttempt"> | number
    correctAnswers?: IntFilter<"ExamAttempt"> | number
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    universityId?: StringFilter<"ExamAttempt"> | string
    subjectIds?: StringNullableListFilter<"ExamAttempt">
    careerIds?: StringNullableListFilter<"ExamAttempt">
    difficulty?: EnumDifficultyLevelNullableFilter<"ExamAttempt"> | $Enums.DifficultyLevel | null
    examYears?: IntNullableListFilter<"ExamAttempt">
    userId?: UuidFilter<"ExamAttempt"> | string
    university?: XOR<UniversityRelationFilter, UniversityWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    studentAnswers?: StudentAnswerListRelationFilter
  }

  export type ExamAttemptOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    score?: SortOrderInput | SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectIds?: SortOrder
    careerIds?: SortOrder
    difficulty?: SortOrderInput | SortOrder
    examYears?: SortOrder
    userId?: SortOrder
    university?: UniversityOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    studentAnswers?: StudentAnswerOrderByRelationAggregateInput
  }

  export type ExamAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    OR?: ExamAttemptWhereInput[]
    NOT?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    status?: EnumExamAttemptStatusFilter<"ExamAttempt"> | $Enums.ExamAttemptStatus
    score?: FloatNullableFilter<"ExamAttempt"> | number | null
    totalQuestions?: IntFilter<"ExamAttempt"> | number
    correctAnswers?: IntFilter<"ExamAttempt"> | number
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    universityId?: StringFilter<"ExamAttempt"> | string
    subjectIds?: StringNullableListFilter<"ExamAttempt">
    careerIds?: StringNullableListFilter<"ExamAttempt">
    difficulty?: EnumDifficultyLevelNullableFilter<"ExamAttempt"> | $Enums.DifficultyLevel | null
    examYears?: IntNullableListFilter<"ExamAttempt">
    userId?: UuidFilter<"ExamAttempt"> | string
    university?: XOR<UniversityRelationFilter, UniversityWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    studentAnswers?: StudentAnswerListRelationFilter
  }, "id">

  export type ExamAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    score?: SortOrderInput | SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectIds?: SortOrder
    careerIds?: SortOrder
    difficulty?: SortOrderInput | SortOrder
    examYears?: SortOrder
    userId?: SortOrder
    _count?: ExamAttemptCountOrderByAggregateInput
    _avg?: ExamAttemptAvgOrderByAggregateInput
    _max?: ExamAttemptMaxOrderByAggregateInput
    _min?: ExamAttemptMinOrderByAggregateInput
    _sum?: ExamAttemptSumOrderByAggregateInput
  }

  export type ExamAttemptScalarWhereWithAggregatesInput = {
    AND?: ExamAttemptScalarWhereWithAggregatesInput | ExamAttemptScalarWhereWithAggregatesInput[]
    OR?: ExamAttemptScalarWhereWithAggregatesInput[]
    NOT?: ExamAttemptScalarWhereWithAggregatesInput | ExamAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExamAttempt"> | string
    status?: EnumExamAttemptStatusWithAggregatesFilter<"ExamAttempt"> | $Enums.ExamAttemptStatus
    score?: FloatNullableWithAggregatesFilter<"ExamAttempt"> | number | null
    totalQuestions?: IntWithAggregatesFilter<"ExamAttempt"> | number
    correctAnswers?: IntWithAggregatesFilter<"ExamAttempt"> | number
    startedAt?: DateTimeWithAggregatesFilter<"ExamAttempt"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ExamAttempt"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExamAttempt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExamAttempt"> | Date | string
    universityId?: StringWithAggregatesFilter<"ExamAttempt"> | string
    subjectIds?: StringNullableListFilter<"ExamAttempt">
    careerIds?: StringNullableListFilter<"ExamAttempt">
    difficulty?: EnumDifficultyLevelNullableWithAggregatesFilter<"ExamAttempt"> | $Enums.DifficultyLevel | null
    examYears?: IntNullableListFilter<"ExamAttempt">
    userId?: UuidWithAggregatesFilter<"ExamAttempt"> | string
  }

  export type StudentAnswerWhereInput = {
    AND?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    OR?: StudentAnswerWhereInput[]
    NOT?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    id?: StringFilter<"StudentAnswer"> | string
    isCorrect?: BoolFilter<"StudentAnswer"> | boolean
    answeredAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    examAttemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOptionId?: StringNullableFilter<"StudentAnswer"> | string | null
    examAttempt?: XOR<ExamAttemptRelationFilter, ExamAttemptWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
    selectedOption?: XOR<Question_OptionNullableRelationFilter, Question_OptionWhereInput> | null
  }

  export type StudentAnswerOrderByWithRelationInput = {
    id?: SortOrder
    isCorrect?: SortOrder
    answeredAt?: SortOrder
    examAttemptId?: SortOrder
    questionId?: SortOrder
    selectedOptionId?: SortOrderInput | SortOrder
    examAttempt?: ExamAttemptOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
    selectedOption?: Question_OptionOrderByWithRelationInput
  }

  export type StudentAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    examAttemptId_questionId?: StudentAnswerExamAttemptIdQuestionIdCompoundUniqueInput
    AND?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    OR?: StudentAnswerWhereInput[]
    NOT?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    isCorrect?: BoolFilter<"StudentAnswer"> | boolean
    answeredAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    examAttemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOptionId?: StringNullableFilter<"StudentAnswer"> | string | null
    examAttempt?: XOR<ExamAttemptRelationFilter, ExamAttemptWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
    selectedOption?: XOR<Question_OptionNullableRelationFilter, Question_OptionWhereInput> | null
  }, "id" | "examAttemptId_questionId">

  export type StudentAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    isCorrect?: SortOrder
    answeredAt?: SortOrder
    examAttemptId?: SortOrder
    questionId?: SortOrder
    selectedOptionId?: SortOrderInput | SortOrder
    _count?: StudentAnswerCountOrderByAggregateInput
    _max?: StudentAnswerMaxOrderByAggregateInput
    _min?: StudentAnswerMinOrderByAggregateInput
  }

  export type StudentAnswerScalarWhereWithAggregatesInput = {
    AND?: StudentAnswerScalarWhereWithAggregatesInput | StudentAnswerScalarWhereWithAggregatesInput[]
    OR?: StudentAnswerScalarWhereWithAggregatesInput[]
    NOT?: StudentAnswerScalarWhereWithAggregatesInput | StudentAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentAnswer"> | string
    isCorrect?: BoolWithAggregatesFilter<"StudentAnswer"> | boolean
    answeredAt?: DateTimeWithAggregatesFilter<"StudentAnswer"> | Date | string
    examAttemptId?: StringWithAggregatesFilter<"StudentAnswer"> | string
    questionId?: StringWithAggregatesFilter<"StudentAnswer"> | string
    selectedOptionId?: StringNullableWithAggregatesFilter<"StudentAnswer"> | string | null
  }

  export type UserCreateInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    hasCompletedOnboarding?: boolean
    targetUniversity?: UniversityCreateNestedOneWithoutUsersInput
    targetCareer?: CareerCreateNestedOneWithoutTargetUsersInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetUniversityId?: string | null
    targetCareerId?: string | null
    hasCompletedOnboarding?: boolean
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    targetUniversity?: UniversityUpdateOneWithoutUsersNestedInput
    targetCareer?: CareerUpdateOneWithoutTargetUsersNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetUniversityId?: NullableStringFieldUpdateOperationsInput | string | null
    targetCareerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetUniversityId?: string | null
    targetCareerId?: string | null
    hasCompletedOnboarding?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetUniversityId?: NullableStringFieldUpdateOperationsInput | string | null
    targetCareerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UniversityCreateInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutUniversityInput
    users?: UserCreateNestedManyWithoutTargetUniversityInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUniversityInput
  }

  export type UniversityUncheckedCreateInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutUniversityInput
    users?: UserUncheckedCreateNestedManyWithoutTargetUniversityInput
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUniversityInput
  }

  export type UniversityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutUniversityNestedInput
    users?: UserUpdateManyWithoutTargetUniversityNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUniversityNestedInput
  }

  export type UniversityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutUniversityNestedInput
    users?: UserUncheckedUpdateManyWithoutTargetUniversityNestedInput
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUniversityNestedInput
  }

  export type UniversityCreateManyInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UniversityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UniversityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutSubjectInput
    careerSubjects?: CareerSubjectCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutSubjectInput
    careerSubjects?: CareerSubjectUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutSubjectNestedInput
    careerSubjects?: CareerSubjectUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutSubjectNestedInput
    careerSubjects?: CareerSubjectUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutCareerInput
    careerSubjects?: CareerSubjectCreateNestedManyWithoutCareerInput
    targetUsers?: UserCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerUncheckedCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutCareerInput
    careerSubjects?: CareerSubjectUncheckedCreateNestedManyWithoutCareerInput
    targetUsers?: UserUncheckedCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutCareerNestedInput
    careerSubjects?: CareerSubjectUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUpdateManyWithoutTargetCareerNestedInput
  }

  export type CareerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutCareerNestedInput
    careerSubjects?: CareerSubjectUncheckedUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUncheckedUpdateManyWithoutTargetCareerNestedInput
  }

  export type CareerCreateManyInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerSubjectCreateInput = {
    id?: string
    createdAt?: Date | string
    career: CareerCreateNestedOneWithoutCareerSubjectsInput
    subject: SubjectCreateNestedOneWithoutCareerSubjectsInput
  }

  export type CareerSubjectUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    careerId: string
    subjectId: string
  }

  export type CareerSubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    career?: CareerUpdateOneRequiredWithoutCareerSubjectsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutCareerSubjectsNestedInput
  }

  export type CareerSubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type CareerSubjectCreateManyInput = {
    id?: string
    createdAt?: Date | string
    careerId: string
    subjectId: string
  }

  export type CareerSubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerSubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    university: UniversityCreateNestedOneWithoutQuestionsInput
    subject: SubjectCreateNestedOneWithoutQuestionsInput
    career: CareerCreateNestedOneWithoutQuestionsInput
    options?: Question_OptionCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
    careerId: string
    options?: Question_OptionUncheckedCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    university?: UniversityUpdateOneRequiredWithoutQuestionsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutQuestionsNestedInput
    career?: CareerUpdateOneRequiredWithoutQuestionsNestedInput
    options?: Question_OptionUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
    options?: Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
    careerId: string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
  }

  export type Question_OptionCreateInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    question: QuestionCreateNestedOneWithoutOptionsInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutSelectedOptionInput
  }

  export type Question_OptionUncheckedCreateInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    questionId: string
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput
  }

  export type Question_OptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    question?: QuestionUpdateOneRequiredWithoutOptionsNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutSelectedOptionNestedInput
  }

  export type Question_OptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    questionId?: StringFieldUpdateOperationsInput | string
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput
  }

  export type Question_OptionCreateManyInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    questionId: string
  }

  export type Question_OptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type Question_OptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    questionId?: StringFieldUpdateOperationsInput | string
  }

  export type ExamAttemptCreateInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    university: UniversityCreateNestedOneWithoutExamAttemptsInput
    user: UserCreateNestedOneWithoutExamAttemptsInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptUncheckedCreateInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    userId: string
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    university?: UniversityUpdateOneRequiredWithoutExamAttemptsNestedInput
    user?: UserUpdateOneRequiredWithoutExamAttemptsNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptCreateManyInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    userId: string
  }

  export type ExamAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
  }

  export type ExamAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentAnswerCreateInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttempt: ExamAttemptCreateNestedOneWithoutStudentAnswersInput
    question: QuestionCreateNestedOneWithoutStudentAnswersInput
    selectedOption?: Question_OptionCreateNestedOneWithoutStudentAnswersInput
  }

  export type StudentAnswerUncheckedCreateInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    questionId: string
    selectedOptionId?: string | null
  }

  export type StudentAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttempt?: ExamAttemptUpdateOneRequiredWithoutStudentAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutStudentAnswersNestedInput
    selectedOption?: Question_OptionUpdateOneWithoutStudentAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentAnswerCreateManyInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    questionId: string
    selectedOptionId?: string | null
  }

  export type StudentAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UniversityNullableRelationFilter = {
    is?: UniversityWhereInput | null
    isNot?: UniversityWhereInput | null
  }

  export type CareerNullableRelationFilter = {
    is?: CareerWhereInput | null
    isNot?: CareerWhereInput | null
  }

  export type ExamAttemptListRelationFilter = {
    every?: ExamAttemptWhereInput
    some?: ExamAttemptWhereInput
    none?: ExamAttemptWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExamAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    country?: SortOrder
    targetUniversityId?: SortOrder
    targetCareerId?: SortOrder
    hasCompletedOnboarding?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    country?: SortOrder
    targetUniversityId?: SortOrder
    targetCareerId?: SortOrder
    hasCompletedOnboarding?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    country?: SortOrder
    targetUniversityId?: SortOrder
    targetCareerId?: SortOrder
    hasCompletedOnboarding?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UniversityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    city?: SortOrder
    region?: SortOrder
    country?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UniversityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    city?: SortOrder
    region?: SortOrder
    country?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UniversityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    city?: SortOrder
    region?: SortOrder
    country?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerSubjectListRelationFilter = {
    every?: CareerSubjectWhereInput
    some?: CareerSubjectWhereInput
    none?: CareerSubjectWhereInput
  }

  export type CareerSubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerRelationFilter = {
    is?: CareerWhereInput
    isNot?: CareerWhereInput
  }

  export type SubjectRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type CareerSubjectCareerIdSubjectIdCompoundUniqueInput = {
    careerId: string
    subjectId: string
  }

  export type CareerSubjectCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    careerId?: SortOrder
    subjectId?: SortOrder
  }

  export type CareerSubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    careerId?: SortOrder
    subjectId?: SortOrder
  }

  export type CareerSubjectMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    careerId?: SortOrder
    subjectId?: SortOrder
  }

  export type EnumDifficultyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyLevelFilter<$PrismaModel> | $Enums.DifficultyLevel
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UniversityRelationFilter = {
    is?: UniversityWhereInput
    isNot?: UniversityWhereInput
  }

  export type Question_OptionListRelationFilter = {
    every?: Question_OptionWhereInput
    some?: Question_OptionWhereInput
    none?: Question_OptionWhereInput
  }

  export type StudentAnswerListRelationFilter = {
    every?: StudentAnswerWhereInput
    some?: StudentAnswerWhereInput
    none?: StudentAnswerWhereInput
  }

  export type Question_OptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    difficulty?: SortOrder
    examYear?: SortOrder
    examPeriod?: SortOrder
    explanation?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectId?: SortOrder
    careerId?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    examYear?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    difficulty?: SortOrder
    examYear?: SortOrder
    examPeriod?: SortOrder
    explanation?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectId?: SortOrder
    careerId?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    difficulty?: SortOrder
    examYear?: SortOrder
    examPeriod?: SortOrder
    explanation?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectId?: SortOrder
    careerId?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    examYear?: SortOrder
  }

  export type EnumDifficultyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyLevelWithAggregatesFilter<$PrismaModel> | $Enums.DifficultyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyLevelFilter<$PrismaModel>
    _max?: NestedEnumDifficultyLevelFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type QuestionRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type Question_OptionQuestionIdOrderIndexCompoundUniqueInput = {
    questionId: string
    orderIndex: number
  }

  export type Question_OptionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    orderIndex?: SortOrder
    questionId?: SortOrder
  }

  export type Question_OptionAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type Question_OptionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    orderIndex?: SortOrder
    questionId?: SortOrder
  }

  export type Question_OptionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    orderIndex?: SortOrder
    questionId?: SortOrder
  }

  export type Question_OptionSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumExamAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamAttemptStatus | EnumExamAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamAttemptStatusFilter<$PrismaModel> | $Enums.ExamAttemptStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumDifficultyLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel> | $Enums.DifficultyLevel | null
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ExamAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    subjectIds?: SortOrder
    careerIds?: SortOrder
    difficulty?: SortOrder
    examYears?: SortOrder
    userId?: SortOrder
  }

  export type ExamAttemptAvgOrderByAggregateInput = {
    score?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    examYears?: SortOrder
  }

  export type ExamAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    difficulty?: SortOrder
    userId?: SortOrder
  }

  export type ExamAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    score?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    universityId?: SortOrder
    difficulty?: SortOrder
    userId?: SortOrder
  }

  export type ExamAttemptSumOrderByAggregateInput = {
    score?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    examYears?: SortOrder
  }

  export type EnumExamAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamAttemptStatus | EnumExamAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumExamAttemptStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumDifficultyLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDifficultyLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.DifficultyLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel>
  }

  export type ExamAttemptRelationFilter = {
    is?: ExamAttemptWhereInput
    isNot?: ExamAttemptWhereInput
  }

  export type Question_OptionNullableRelationFilter = {
    is?: Question_OptionWhereInput | null
    isNot?: Question_OptionWhereInput | null
  }

  export type StudentAnswerExamAttemptIdQuestionIdCompoundUniqueInput = {
    examAttemptId: string
    questionId: string
  }

  export type StudentAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    isCorrect?: SortOrder
    answeredAt?: SortOrder
    examAttemptId?: SortOrder
    questionId?: SortOrder
    selectedOptionId?: SortOrder
  }

  export type StudentAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    isCorrect?: SortOrder
    answeredAt?: SortOrder
    examAttemptId?: SortOrder
    questionId?: SortOrder
    selectedOptionId?: SortOrder
  }

  export type StudentAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    isCorrect?: SortOrder
    answeredAt?: SortOrder
    examAttemptId?: SortOrder
    questionId?: SortOrder
    selectedOptionId?: SortOrder
  }

  export type UniversityCreateNestedOneWithoutUsersInput = {
    create?: XOR<UniversityCreateWithoutUsersInput, UniversityUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutUsersInput
    connect?: UniversityWhereUniqueInput
  }

  export type CareerCreateNestedOneWithoutTargetUsersInput = {
    create?: XOR<CareerCreateWithoutTargetUsersInput, CareerUncheckedCreateWithoutTargetUsersInput>
    connectOrCreate?: CareerCreateOrConnectWithoutTargetUsersInput
    connect?: CareerWhereUniqueInput
  }

  export type ExamAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput> | ExamAttemptCreateWithoutUserInput[] | ExamAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUserInput | ExamAttemptCreateOrConnectWithoutUserInput[]
    createMany?: ExamAttemptCreateManyUserInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type ExamAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput> | ExamAttemptCreateWithoutUserInput[] | ExamAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUserInput | ExamAttemptCreateOrConnectWithoutUserInput[]
    createMany?: ExamAttemptCreateManyUserInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UniversityUpdateOneWithoutUsersNestedInput = {
    create?: XOR<UniversityCreateWithoutUsersInput, UniversityUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutUsersInput
    upsert?: UniversityUpsertWithoutUsersInput
    disconnect?: UniversityWhereInput | boolean
    delete?: UniversityWhereInput | boolean
    connect?: UniversityWhereUniqueInput
    update?: XOR<XOR<UniversityUpdateToOneWithWhereWithoutUsersInput, UniversityUpdateWithoutUsersInput>, UniversityUncheckedUpdateWithoutUsersInput>
  }

  export type CareerUpdateOneWithoutTargetUsersNestedInput = {
    create?: XOR<CareerCreateWithoutTargetUsersInput, CareerUncheckedCreateWithoutTargetUsersInput>
    connectOrCreate?: CareerCreateOrConnectWithoutTargetUsersInput
    upsert?: CareerUpsertWithoutTargetUsersInput
    disconnect?: CareerWhereInput | boolean
    delete?: CareerWhereInput | boolean
    connect?: CareerWhereUniqueInput
    update?: XOR<XOR<CareerUpdateToOneWithWhereWithoutTargetUsersInput, CareerUpdateWithoutTargetUsersInput>, CareerUncheckedUpdateWithoutTargetUsersInput>
  }

  export type ExamAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput> | ExamAttemptCreateWithoutUserInput[] | ExamAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUserInput | ExamAttemptCreateOrConnectWithoutUserInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutUserInput | ExamAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExamAttemptCreateManyUserInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutUserInput | ExamAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutUserInput | ExamAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type ExamAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput> | ExamAttemptCreateWithoutUserInput[] | ExamAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUserInput | ExamAttemptCreateOrConnectWithoutUserInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutUserInput | ExamAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExamAttemptCreateManyUserInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutUserInput | ExamAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutUserInput | ExamAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type QuestionCreateNestedManyWithoutUniversityInput = {
    create?: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput> | QuestionCreateWithoutUniversityInput[] | QuestionUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutUniversityInput | QuestionCreateOrConnectWithoutUniversityInput[]
    createMany?: QuestionCreateManyUniversityInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutTargetUniversityInput = {
    create?: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput> | UserCreateWithoutTargetUniversityInput[] | UserUncheckedCreateWithoutTargetUniversityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetUniversityInput | UserCreateOrConnectWithoutTargetUniversityInput[]
    createMany?: UserCreateManyTargetUniversityInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ExamAttemptCreateNestedManyWithoutUniversityInput = {
    create?: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput> | ExamAttemptCreateWithoutUniversityInput[] | ExamAttemptUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUniversityInput | ExamAttemptCreateOrConnectWithoutUniversityInput[]
    createMany?: ExamAttemptCreateManyUniversityInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutUniversityInput = {
    create?: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput> | QuestionCreateWithoutUniversityInput[] | QuestionUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutUniversityInput | QuestionCreateOrConnectWithoutUniversityInput[]
    createMany?: QuestionCreateManyUniversityInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTargetUniversityInput = {
    create?: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput> | UserCreateWithoutTargetUniversityInput[] | UserUncheckedCreateWithoutTargetUniversityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetUniversityInput | UserCreateOrConnectWithoutTargetUniversityInput[]
    createMany?: UserCreateManyTargetUniversityInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ExamAttemptUncheckedCreateNestedManyWithoutUniversityInput = {
    create?: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput> | ExamAttemptCreateWithoutUniversityInput[] | ExamAttemptUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUniversityInput | ExamAttemptCreateOrConnectWithoutUniversityInput[]
    createMany?: ExamAttemptCreateManyUniversityInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type QuestionUpdateManyWithoutUniversityNestedInput = {
    create?: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput> | QuestionCreateWithoutUniversityInput[] | QuestionUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutUniversityInput | QuestionCreateOrConnectWithoutUniversityInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutUniversityInput | QuestionUpsertWithWhereUniqueWithoutUniversityInput[]
    createMany?: QuestionCreateManyUniversityInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutUniversityInput | QuestionUpdateWithWhereUniqueWithoutUniversityInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutUniversityInput | QuestionUpdateManyWithWhereWithoutUniversityInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type UserUpdateManyWithoutTargetUniversityNestedInput = {
    create?: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput> | UserCreateWithoutTargetUniversityInput[] | UserUncheckedCreateWithoutTargetUniversityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetUniversityInput | UserCreateOrConnectWithoutTargetUniversityInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTargetUniversityInput | UserUpsertWithWhereUniqueWithoutTargetUniversityInput[]
    createMany?: UserCreateManyTargetUniversityInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTargetUniversityInput | UserUpdateWithWhereUniqueWithoutTargetUniversityInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTargetUniversityInput | UserUpdateManyWithWhereWithoutTargetUniversityInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ExamAttemptUpdateManyWithoutUniversityNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput> | ExamAttemptCreateWithoutUniversityInput[] | ExamAttemptUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUniversityInput | ExamAttemptCreateOrConnectWithoutUniversityInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutUniversityInput | ExamAttemptUpsertWithWhereUniqueWithoutUniversityInput[]
    createMany?: ExamAttemptCreateManyUniversityInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutUniversityInput | ExamAttemptUpdateWithWhereUniqueWithoutUniversityInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutUniversityInput | ExamAttemptUpdateManyWithWhereWithoutUniversityInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutUniversityNestedInput = {
    create?: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput> | QuestionCreateWithoutUniversityInput[] | QuestionUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutUniversityInput | QuestionCreateOrConnectWithoutUniversityInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutUniversityInput | QuestionUpsertWithWhereUniqueWithoutUniversityInput[]
    createMany?: QuestionCreateManyUniversityInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutUniversityInput | QuestionUpdateWithWhereUniqueWithoutUniversityInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutUniversityInput | QuestionUpdateManyWithWhereWithoutUniversityInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTargetUniversityNestedInput = {
    create?: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput> | UserCreateWithoutTargetUniversityInput[] | UserUncheckedCreateWithoutTargetUniversityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetUniversityInput | UserCreateOrConnectWithoutTargetUniversityInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTargetUniversityInput | UserUpsertWithWhereUniqueWithoutTargetUniversityInput[]
    createMany?: UserCreateManyTargetUniversityInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTargetUniversityInput | UserUpdateWithWhereUniqueWithoutTargetUniversityInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTargetUniversityInput | UserUpdateManyWithWhereWithoutTargetUniversityInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ExamAttemptUncheckedUpdateManyWithoutUniversityNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput> | ExamAttemptCreateWithoutUniversityInput[] | ExamAttemptUncheckedCreateWithoutUniversityInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutUniversityInput | ExamAttemptCreateOrConnectWithoutUniversityInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutUniversityInput | ExamAttemptUpsertWithWhereUniqueWithoutUniversityInput[]
    createMany?: ExamAttemptCreateManyUniversityInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutUniversityInput | ExamAttemptUpdateWithWhereUniqueWithoutUniversityInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutUniversityInput | ExamAttemptUpdateManyWithWhereWithoutUniversityInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type QuestionCreateNestedManyWithoutSubjectInput = {
    create?: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput> | QuestionCreateWithoutSubjectInput[] | QuestionUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutSubjectInput | QuestionCreateOrConnectWithoutSubjectInput[]
    createMany?: QuestionCreateManySubjectInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type CareerSubjectCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput> | CareerSubjectCreateWithoutSubjectInput[] | CareerSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutSubjectInput | CareerSubjectCreateOrConnectWithoutSubjectInput[]
    createMany?: CareerSubjectCreateManySubjectInputEnvelope
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput> | QuestionCreateWithoutSubjectInput[] | QuestionUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutSubjectInput | QuestionCreateOrConnectWithoutSubjectInput[]
    createMany?: QuestionCreateManySubjectInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type CareerSubjectUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput> | CareerSubjectCreateWithoutSubjectInput[] | CareerSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutSubjectInput | CareerSubjectCreateOrConnectWithoutSubjectInput[]
    createMany?: CareerSubjectCreateManySubjectInputEnvelope
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
  }

  export type QuestionUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput> | QuestionCreateWithoutSubjectInput[] | QuestionUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutSubjectInput | QuestionCreateOrConnectWithoutSubjectInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutSubjectInput | QuestionUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: QuestionCreateManySubjectInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutSubjectInput | QuestionUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutSubjectInput | QuestionUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type CareerSubjectUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput> | CareerSubjectCreateWithoutSubjectInput[] | CareerSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutSubjectInput | CareerSubjectCreateOrConnectWithoutSubjectInput[]
    upsert?: CareerSubjectUpsertWithWhereUniqueWithoutSubjectInput | CareerSubjectUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CareerSubjectCreateManySubjectInputEnvelope
    set?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    disconnect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    delete?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    update?: CareerSubjectUpdateWithWhereUniqueWithoutSubjectInput | CareerSubjectUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CareerSubjectUpdateManyWithWhereWithoutSubjectInput | CareerSubjectUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput> | QuestionCreateWithoutSubjectInput[] | QuestionUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutSubjectInput | QuestionCreateOrConnectWithoutSubjectInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutSubjectInput | QuestionUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: QuestionCreateManySubjectInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutSubjectInput | QuestionUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutSubjectInput | QuestionUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type CareerSubjectUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput> | CareerSubjectCreateWithoutSubjectInput[] | CareerSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutSubjectInput | CareerSubjectCreateOrConnectWithoutSubjectInput[]
    upsert?: CareerSubjectUpsertWithWhereUniqueWithoutSubjectInput | CareerSubjectUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CareerSubjectCreateManySubjectInputEnvelope
    set?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    disconnect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    delete?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    update?: CareerSubjectUpdateWithWhereUniqueWithoutSubjectInput | CareerSubjectUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CareerSubjectUpdateManyWithWhereWithoutSubjectInput | CareerSubjectUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
  }

  export type QuestionCreateNestedManyWithoutCareerInput = {
    create?: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput> | QuestionCreateWithoutCareerInput[] | QuestionUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCareerInput | QuestionCreateOrConnectWithoutCareerInput[]
    createMany?: QuestionCreateManyCareerInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type CareerSubjectCreateNestedManyWithoutCareerInput = {
    create?: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput> | CareerSubjectCreateWithoutCareerInput[] | CareerSubjectUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutCareerInput | CareerSubjectCreateOrConnectWithoutCareerInput[]
    createMany?: CareerSubjectCreateManyCareerInputEnvelope
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutTargetCareerInput = {
    create?: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput> | UserCreateWithoutTargetCareerInput[] | UserUncheckedCreateWithoutTargetCareerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetCareerInput | UserCreateOrConnectWithoutTargetCareerInput[]
    createMany?: UserCreateManyTargetCareerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutCareerInput = {
    create?: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput> | QuestionCreateWithoutCareerInput[] | QuestionUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCareerInput | QuestionCreateOrConnectWithoutCareerInput[]
    createMany?: QuestionCreateManyCareerInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type CareerSubjectUncheckedCreateNestedManyWithoutCareerInput = {
    create?: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput> | CareerSubjectCreateWithoutCareerInput[] | CareerSubjectUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutCareerInput | CareerSubjectCreateOrConnectWithoutCareerInput[]
    createMany?: CareerSubjectCreateManyCareerInputEnvelope
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTargetCareerInput = {
    create?: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput> | UserCreateWithoutTargetCareerInput[] | UserUncheckedCreateWithoutTargetCareerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetCareerInput | UserCreateOrConnectWithoutTargetCareerInput[]
    createMany?: UserCreateManyTargetCareerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type QuestionUpdateManyWithoutCareerNestedInput = {
    create?: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput> | QuestionCreateWithoutCareerInput[] | QuestionUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCareerInput | QuestionCreateOrConnectWithoutCareerInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutCareerInput | QuestionUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: QuestionCreateManyCareerInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutCareerInput | QuestionUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutCareerInput | QuestionUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type CareerSubjectUpdateManyWithoutCareerNestedInput = {
    create?: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput> | CareerSubjectCreateWithoutCareerInput[] | CareerSubjectUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutCareerInput | CareerSubjectCreateOrConnectWithoutCareerInput[]
    upsert?: CareerSubjectUpsertWithWhereUniqueWithoutCareerInput | CareerSubjectUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: CareerSubjectCreateManyCareerInputEnvelope
    set?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    disconnect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    delete?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    update?: CareerSubjectUpdateWithWhereUniqueWithoutCareerInput | CareerSubjectUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: CareerSubjectUpdateManyWithWhereWithoutCareerInput | CareerSubjectUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
  }

  export type UserUpdateManyWithoutTargetCareerNestedInput = {
    create?: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput> | UserCreateWithoutTargetCareerInput[] | UserUncheckedCreateWithoutTargetCareerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetCareerInput | UserCreateOrConnectWithoutTargetCareerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTargetCareerInput | UserUpsertWithWhereUniqueWithoutTargetCareerInput[]
    createMany?: UserCreateManyTargetCareerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTargetCareerInput | UserUpdateWithWhereUniqueWithoutTargetCareerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTargetCareerInput | UserUpdateManyWithWhereWithoutTargetCareerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutCareerNestedInput = {
    create?: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput> | QuestionCreateWithoutCareerInput[] | QuestionUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCareerInput | QuestionCreateOrConnectWithoutCareerInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutCareerInput | QuestionUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: QuestionCreateManyCareerInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutCareerInput | QuestionUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutCareerInput | QuestionUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type CareerSubjectUncheckedUpdateManyWithoutCareerNestedInput = {
    create?: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput> | CareerSubjectCreateWithoutCareerInput[] | CareerSubjectUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: CareerSubjectCreateOrConnectWithoutCareerInput | CareerSubjectCreateOrConnectWithoutCareerInput[]
    upsert?: CareerSubjectUpsertWithWhereUniqueWithoutCareerInput | CareerSubjectUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: CareerSubjectCreateManyCareerInputEnvelope
    set?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    disconnect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    delete?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    connect?: CareerSubjectWhereUniqueInput | CareerSubjectWhereUniqueInput[]
    update?: CareerSubjectUpdateWithWhereUniqueWithoutCareerInput | CareerSubjectUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: CareerSubjectUpdateManyWithWhereWithoutCareerInput | CareerSubjectUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTargetCareerNestedInput = {
    create?: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput> | UserCreateWithoutTargetCareerInput[] | UserUncheckedCreateWithoutTargetCareerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTargetCareerInput | UserCreateOrConnectWithoutTargetCareerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTargetCareerInput | UserUpsertWithWhereUniqueWithoutTargetCareerInput[]
    createMany?: UserCreateManyTargetCareerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTargetCareerInput | UserUpdateWithWhereUniqueWithoutTargetCareerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTargetCareerInput | UserUpdateManyWithWhereWithoutTargetCareerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CareerCreateNestedOneWithoutCareerSubjectsInput = {
    create?: XOR<CareerCreateWithoutCareerSubjectsInput, CareerUncheckedCreateWithoutCareerSubjectsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutCareerSubjectsInput
    connect?: CareerWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutCareerSubjectsInput = {
    create?: XOR<SubjectCreateWithoutCareerSubjectsInput, SubjectUncheckedCreateWithoutCareerSubjectsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCareerSubjectsInput
    connect?: SubjectWhereUniqueInput
  }

  export type CareerUpdateOneRequiredWithoutCareerSubjectsNestedInput = {
    create?: XOR<CareerCreateWithoutCareerSubjectsInput, CareerUncheckedCreateWithoutCareerSubjectsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutCareerSubjectsInput
    upsert?: CareerUpsertWithoutCareerSubjectsInput
    connect?: CareerWhereUniqueInput
    update?: XOR<XOR<CareerUpdateToOneWithWhereWithoutCareerSubjectsInput, CareerUpdateWithoutCareerSubjectsInput>, CareerUncheckedUpdateWithoutCareerSubjectsInput>
  }

  export type SubjectUpdateOneRequiredWithoutCareerSubjectsNestedInput = {
    create?: XOR<SubjectCreateWithoutCareerSubjectsInput, SubjectUncheckedCreateWithoutCareerSubjectsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCareerSubjectsInput
    upsert?: SubjectUpsertWithoutCareerSubjectsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutCareerSubjectsInput, SubjectUpdateWithoutCareerSubjectsInput>, SubjectUncheckedUpdateWithoutCareerSubjectsInput>
  }

  export type UniversityCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<UniversityCreateWithoutQuestionsInput, UniversityUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutQuestionsInput
    connect?: UniversityWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<SubjectCreateWithoutQuestionsInput, SubjectUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutQuestionsInput
    connect?: SubjectWhereUniqueInput
  }

  export type CareerCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<CareerCreateWithoutQuestionsInput, CareerUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutQuestionsInput
    connect?: CareerWhereUniqueInput
  }

  export type Question_OptionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput> | Question_OptionCreateWithoutQuestionInput[] | Question_OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: Question_OptionCreateOrConnectWithoutQuestionInput | Question_OptionCreateOrConnectWithoutQuestionInput[]
    createMany?: Question_OptionCreateManyQuestionInputEnvelope
    connect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
  }

  export type StudentAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type Question_OptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput> | Question_OptionCreateWithoutQuestionInput[] | Question_OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: Question_OptionCreateOrConnectWithoutQuestionInput | Question_OptionCreateOrConnectWithoutQuestionInput[]
    createMany?: Question_OptionCreateManyQuestionInputEnvelope
    connect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
  }

  export type StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type EnumDifficultyLevelFieldUpdateOperationsInput = {
    set?: $Enums.DifficultyLevel
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UniversityUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<UniversityCreateWithoutQuestionsInput, UniversityUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutQuestionsInput
    upsert?: UniversityUpsertWithoutQuestionsInput
    connect?: UniversityWhereUniqueInput
    update?: XOR<XOR<UniversityUpdateToOneWithWhereWithoutQuestionsInput, UniversityUpdateWithoutQuestionsInput>, UniversityUncheckedUpdateWithoutQuestionsInput>
  }

  export type SubjectUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<SubjectCreateWithoutQuestionsInput, SubjectUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutQuestionsInput
    upsert?: SubjectUpsertWithoutQuestionsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutQuestionsInput, SubjectUpdateWithoutQuestionsInput>, SubjectUncheckedUpdateWithoutQuestionsInput>
  }

  export type CareerUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<CareerCreateWithoutQuestionsInput, CareerUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutQuestionsInput
    upsert?: CareerUpsertWithoutQuestionsInput
    connect?: CareerWhereUniqueInput
    update?: XOR<XOR<CareerUpdateToOneWithWhereWithoutQuestionsInput, CareerUpdateWithoutQuestionsInput>, CareerUncheckedUpdateWithoutQuestionsInput>
  }

  export type Question_OptionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput> | Question_OptionCreateWithoutQuestionInput[] | Question_OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: Question_OptionCreateOrConnectWithoutQuestionInput | Question_OptionCreateOrConnectWithoutQuestionInput[]
    upsert?: Question_OptionUpsertWithWhereUniqueWithoutQuestionInput | Question_OptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: Question_OptionCreateManyQuestionInputEnvelope
    set?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    disconnect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    delete?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    connect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    update?: Question_OptionUpdateWithWhereUniqueWithoutQuestionInput | Question_OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: Question_OptionUpdateManyWithWhereWithoutQuestionInput | Question_OptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: Question_OptionScalarWhereInput | Question_OptionScalarWhereInput[]
  }

  export type StudentAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput | StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput | StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutQuestionInput | StudentAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput> | Question_OptionCreateWithoutQuestionInput[] | Question_OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: Question_OptionCreateOrConnectWithoutQuestionInput | Question_OptionCreateOrConnectWithoutQuestionInput[]
    upsert?: Question_OptionUpsertWithWhereUniqueWithoutQuestionInput | Question_OptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: Question_OptionCreateManyQuestionInputEnvelope
    set?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    disconnect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    delete?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    connect?: Question_OptionWhereUniqueInput | Question_OptionWhereUniqueInput[]
    update?: Question_OptionUpdateWithWhereUniqueWithoutQuestionInput | Question_OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: Question_OptionUpdateManyWithWhereWithoutQuestionInput | Question_OptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: Question_OptionScalarWhereInput | Question_OptionScalarWhereInput[]
  }

  export type StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput | StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput | StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutQuestionInput | StudentAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type QuestionCreateNestedOneWithoutOptionsInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
  }

  export type StudentAnswerCreateNestedManyWithoutSelectedOptionInput = {
    create?: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput> | StudentAnswerCreateWithoutSelectedOptionInput[] | StudentAnswerUncheckedCreateWithoutSelectedOptionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutSelectedOptionInput | StudentAnswerCreateOrConnectWithoutSelectedOptionInput[]
    createMany?: StudentAnswerCreateManySelectedOptionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type StudentAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput = {
    create?: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput> | StudentAnswerCreateWithoutSelectedOptionInput[] | StudentAnswerUncheckedCreateWithoutSelectedOptionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutSelectedOptionInput | StudentAnswerCreateOrConnectWithoutSelectedOptionInput[]
    createMany?: StudentAnswerCreateManySelectedOptionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    upsert?: QuestionUpsertWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutOptionsInput, QuestionUpdateWithoutOptionsInput>, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type StudentAnswerUpdateManyWithoutSelectedOptionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput> | StudentAnswerCreateWithoutSelectedOptionInput[] | StudentAnswerUncheckedCreateWithoutSelectedOptionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutSelectedOptionInput | StudentAnswerCreateOrConnectWithoutSelectedOptionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput | StudentAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput[]
    createMany?: StudentAnswerCreateManySelectedOptionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput | StudentAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutSelectedOptionInput | StudentAnswerUpdateManyWithWhereWithoutSelectedOptionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type StudentAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput> | StudentAnswerCreateWithoutSelectedOptionInput[] | StudentAnswerUncheckedCreateWithoutSelectedOptionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutSelectedOptionInput | StudentAnswerCreateOrConnectWithoutSelectedOptionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput | StudentAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput[]
    createMany?: StudentAnswerCreateManySelectedOptionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput | StudentAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutSelectedOptionInput | StudentAnswerUpdateManyWithWhereWithoutSelectedOptionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type ExamAttemptCreatesubjectIdsInput = {
    set: string[]
  }

  export type ExamAttemptCreatecareerIdsInput = {
    set: string[]
  }

  export type ExamAttemptCreateexamYearsInput = {
    set: number[]
  }

  export type UniversityCreateNestedOneWithoutExamAttemptsInput = {
    create?: XOR<UniversityCreateWithoutExamAttemptsInput, UniversityUncheckedCreateWithoutExamAttemptsInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutExamAttemptsInput
    connect?: UniversityWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExamAttemptsInput = {
    create?: XOR<UserCreateWithoutExamAttemptsInput, UserUncheckedCreateWithoutExamAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExamAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type StudentAnswerCreateNestedManyWithoutExamAttemptInput = {
    create?: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput> | StudentAnswerCreateWithoutExamAttemptInput[] | StudentAnswerUncheckedCreateWithoutExamAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutExamAttemptInput | StudentAnswerCreateOrConnectWithoutExamAttemptInput[]
    createMany?: StudentAnswerCreateManyExamAttemptInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type StudentAnswerUncheckedCreateNestedManyWithoutExamAttemptInput = {
    create?: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput> | StudentAnswerCreateWithoutExamAttemptInput[] | StudentAnswerUncheckedCreateWithoutExamAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutExamAttemptInput | StudentAnswerCreateOrConnectWithoutExamAttemptInput[]
    createMany?: StudentAnswerCreateManyExamAttemptInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type EnumExamAttemptStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExamAttemptStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ExamAttemptUpdatesubjectIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ExamAttemptUpdatecareerIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableEnumDifficultyLevelFieldUpdateOperationsInput = {
    set?: $Enums.DifficultyLevel | null
  }

  export type ExamAttemptUpdateexamYearsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type UniversityUpdateOneRequiredWithoutExamAttemptsNestedInput = {
    create?: XOR<UniversityCreateWithoutExamAttemptsInput, UniversityUncheckedCreateWithoutExamAttemptsInput>
    connectOrCreate?: UniversityCreateOrConnectWithoutExamAttemptsInput
    upsert?: UniversityUpsertWithoutExamAttemptsInput
    connect?: UniversityWhereUniqueInput
    update?: XOR<XOR<UniversityUpdateToOneWithWhereWithoutExamAttemptsInput, UniversityUpdateWithoutExamAttemptsInput>, UniversityUncheckedUpdateWithoutExamAttemptsInput>
  }

  export type UserUpdateOneRequiredWithoutExamAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutExamAttemptsInput, UserUncheckedCreateWithoutExamAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExamAttemptsInput
    upsert?: UserUpsertWithoutExamAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExamAttemptsInput, UserUpdateWithoutExamAttemptsInput>, UserUncheckedUpdateWithoutExamAttemptsInput>
  }

  export type StudentAnswerUpdateManyWithoutExamAttemptNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput> | StudentAnswerCreateWithoutExamAttemptInput[] | StudentAnswerUncheckedCreateWithoutExamAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutExamAttemptInput | StudentAnswerCreateOrConnectWithoutExamAttemptInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutExamAttemptInput | StudentAnswerUpsertWithWhereUniqueWithoutExamAttemptInput[]
    createMany?: StudentAnswerCreateManyExamAttemptInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutExamAttemptInput | StudentAnswerUpdateWithWhereUniqueWithoutExamAttemptInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutExamAttemptInput | StudentAnswerUpdateManyWithWhereWithoutExamAttemptInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type StudentAnswerUncheckedUpdateManyWithoutExamAttemptNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput> | StudentAnswerCreateWithoutExamAttemptInput[] | StudentAnswerUncheckedCreateWithoutExamAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutExamAttemptInput | StudentAnswerCreateOrConnectWithoutExamAttemptInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutExamAttemptInput | StudentAnswerUpsertWithWhereUniqueWithoutExamAttemptInput[]
    createMany?: StudentAnswerCreateManyExamAttemptInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutExamAttemptInput | StudentAnswerUpdateWithWhereUniqueWithoutExamAttemptInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutExamAttemptInput | StudentAnswerUpdateManyWithWhereWithoutExamAttemptInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type ExamAttemptCreateNestedOneWithoutStudentAnswersInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentAnswersInput, ExamAttemptUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentAnswersInput
    connect?: ExamAttemptWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutStudentAnswersInput = {
    create?: XOR<QuestionCreateWithoutStudentAnswersInput, QuestionUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutStudentAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type Question_OptionCreateNestedOneWithoutStudentAnswersInput = {
    create?: XOR<Question_OptionCreateWithoutStudentAnswersInput, Question_OptionUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: Question_OptionCreateOrConnectWithoutStudentAnswersInput
    connect?: Question_OptionWhereUniqueInput
  }

  export type ExamAttemptUpdateOneRequiredWithoutStudentAnswersNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentAnswersInput, ExamAttemptUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentAnswersInput
    upsert?: ExamAttemptUpsertWithoutStudentAnswersInput
    connect?: ExamAttemptWhereUniqueInput
    update?: XOR<XOR<ExamAttemptUpdateToOneWithWhereWithoutStudentAnswersInput, ExamAttemptUpdateWithoutStudentAnswersInput>, ExamAttemptUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type QuestionUpdateOneRequiredWithoutStudentAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutStudentAnswersInput, QuestionUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutStudentAnswersInput
    upsert?: QuestionUpsertWithoutStudentAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutStudentAnswersInput, QuestionUpdateWithoutStudentAnswersInput>, QuestionUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type Question_OptionUpdateOneWithoutStudentAnswersNestedInput = {
    create?: XOR<Question_OptionCreateWithoutStudentAnswersInput, Question_OptionUncheckedCreateWithoutStudentAnswersInput>
    connectOrCreate?: Question_OptionCreateOrConnectWithoutStudentAnswersInput
    upsert?: Question_OptionUpsertWithoutStudentAnswersInput
    disconnect?: Question_OptionWhereInput | boolean
    delete?: Question_OptionWhereInput | boolean
    connect?: Question_OptionWhereUniqueInput
    update?: XOR<XOR<Question_OptionUpdateToOneWithWhereWithoutStudentAnswersInput, Question_OptionUpdateWithoutStudentAnswersInput>, Question_OptionUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyLevelFilter<$PrismaModel> | $Enums.DifficultyLevel
  }

  export type NestedEnumDifficultyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyLevelWithAggregatesFilter<$PrismaModel> | $Enums.DifficultyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyLevelFilter<$PrismaModel>
    _max?: NestedEnumDifficultyLevelFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumExamAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamAttemptStatus | EnumExamAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamAttemptStatusFilter<$PrismaModel> | $Enums.ExamAttemptStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumDifficultyLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel> | $Enums.DifficultyLevel | null
  }

  export type NestedEnumExamAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamAttemptStatus | EnumExamAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamAttemptStatus[] | ListEnumExamAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumExamAttemptStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DifficultyLevel | EnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DifficultyLevel[] | ListEnumDifficultyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDifficultyLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.DifficultyLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumDifficultyLevelNullableFilter<$PrismaModel>
  }

  export type UniversityCreateWithoutUsersInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutUniversityInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUniversityInput
  }

  export type UniversityUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutUniversityInput
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUniversityInput
  }

  export type UniversityCreateOrConnectWithoutUsersInput = {
    where: UniversityWhereUniqueInput
    create: XOR<UniversityCreateWithoutUsersInput, UniversityUncheckedCreateWithoutUsersInput>
  }

  export type CareerCreateWithoutTargetUsersInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutCareerInput
    careerSubjects?: CareerSubjectCreateNestedManyWithoutCareerInput
  }

  export type CareerUncheckedCreateWithoutTargetUsersInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutCareerInput
    careerSubjects?: CareerSubjectUncheckedCreateNestedManyWithoutCareerInput
  }

  export type CareerCreateOrConnectWithoutTargetUsersInput = {
    where: CareerWhereUniqueInput
    create: XOR<CareerCreateWithoutTargetUsersInput, CareerUncheckedCreateWithoutTargetUsersInput>
  }

  export type ExamAttemptCreateWithoutUserInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    university: UniversityCreateNestedOneWithoutExamAttemptsInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptUncheckedCreateWithoutUserInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptCreateOrConnectWithoutUserInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput>
  }

  export type ExamAttemptCreateManyUserInputEnvelope = {
    data: ExamAttemptCreateManyUserInput | ExamAttemptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UniversityUpsertWithoutUsersInput = {
    update: XOR<UniversityUpdateWithoutUsersInput, UniversityUncheckedUpdateWithoutUsersInput>
    create: XOR<UniversityCreateWithoutUsersInput, UniversityUncheckedCreateWithoutUsersInput>
    where?: UniversityWhereInput
  }

  export type UniversityUpdateToOneWithWhereWithoutUsersInput = {
    where?: UniversityWhereInput
    data: XOR<UniversityUpdateWithoutUsersInput, UniversityUncheckedUpdateWithoutUsersInput>
  }

  export type UniversityUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutUniversityNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUniversityNestedInput
  }

  export type UniversityUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutUniversityNestedInput
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUniversityNestedInput
  }

  export type CareerUpsertWithoutTargetUsersInput = {
    update: XOR<CareerUpdateWithoutTargetUsersInput, CareerUncheckedUpdateWithoutTargetUsersInput>
    create: XOR<CareerCreateWithoutTargetUsersInput, CareerUncheckedCreateWithoutTargetUsersInput>
    where?: CareerWhereInput
  }

  export type CareerUpdateToOneWithWhereWithoutTargetUsersInput = {
    where?: CareerWhereInput
    data: XOR<CareerUpdateWithoutTargetUsersInput, CareerUncheckedUpdateWithoutTargetUsersInput>
  }

  export type CareerUpdateWithoutTargetUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutCareerNestedInput
    careerSubjects?: CareerSubjectUpdateManyWithoutCareerNestedInput
  }

  export type CareerUncheckedUpdateWithoutTargetUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutCareerNestedInput
    careerSubjects?: CareerSubjectUncheckedUpdateManyWithoutCareerNestedInput
  }

  export type ExamAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: ExamAttemptWhereUniqueInput
    update: XOR<ExamAttemptUpdateWithoutUserInput, ExamAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<ExamAttemptCreateWithoutUserInput, ExamAttemptUncheckedCreateWithoutUserInput>
  }

  export type ExamAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: ExamAttemptWhereUniqueInput
    data: XOR<ExamAttemptUpdateWithoutUserInput, ExamAttemptUncheckedUpdateWithoutUserInput>
  }

  export type ExamAttemptUpdateManyWithWhereWithoutUserInput = {
    where: ExamAttemptScalarWhereInput
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyWithoutUserInput>
  }

  export type ExamAttemptScalarWhereInput = {
    AND?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
    OR?: ExamAttemptScalarWhereInput[]
    NOT?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
    id?: StringFilter<"ExamAttempt"> | string
    status?: EnumExamAttemptStatusFilter<"ExamAttempt"> | $Enums.ExamAttemptStatus
    score?: FloatNullableFilter<"ExamAttempt"> | number | null
    totalQuestions?: IntFilter<"ExamAttempt"> | number
    correctAnswers?: IntFilter<"ExamAttempt"> | number
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    universityId?: StringFilter<"ExamAttempt"> | string
    subjectIds?: StringNullableListFilter<"ExamAttempt">
    careerIds?: StringNullableListFilter<"ExamAttempt">
    difficulty?: EnumDifficultyLevelNullableFilter<"ExamAttempt"> | $Enums.DifficultyLevel | null
    examYears?: IntNullableListFilter<"ExamAttempt">
    userId?: UuidFilter<"ExamAttempt"> | string
  }

  export type QuestionCreateWithoutUniversityInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutQuestionsInput
    career: CareerCreateNestedOneWithoutQuestionsInput
    options?: Question_OptionCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutUniversityInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
    careerId: string
    options?: Question_OptionUncheckedCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutUniversityInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput>
  }

  export type QuestionCreateManyUniversityInputEnvelope = {
    data: QuestionCreateManyUniversityInput | QuestionCreateManyUniversityInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTargetUniversityInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    hasCompletedOnboarding?: boolean
    targetCareer?: CareerCreateNestedOneWithoutTargetUsersInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTargetUniversityInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetCareerId?: string | null
    hasCompletedOnboarding?: boolean
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTargetUniversityInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput>
  }

  export type UserCreateManyTargetUniversityInputEnvelope = {
    data: UserCreateManyTargetUniversityInput | UserCreateManyTargetUniversityInput[]
    skipDuplicates?: boolean
  }

  export type ExamAttemptCreateWithoutUniversityInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    user: UserCreateNestedOneWithoutExamAttemptsInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptUncheckedCreateWithoutUniversityInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    userId: string
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutExamAttemptInput
  }

  export type ExamAttemptCreateOrConnectWithoutUniversityInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput>
  }

  export type ExamAttemptCreateManyUniversityInputEnvelope = {
    data: ExamAttemptCreateManyUniversityInput | ExamAttemptCreateManyUniversityInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithWhereUniqueWithoutUniversityInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutUniversityInput, QuestionUncheckedUpdateWithoutUniversityInput>
    create: XOR<QuestionCreateWithoutUniversityInput, QuestionUncheckedCreateWithoutUniversityInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutUniversityInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutUniversityInput, QuestionUncheckedUpdateWithoutUniversityInput>
  }

  export type QuestionUpdateManyWithWhereWithoutUniversityInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutUniversityInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    imageUrl?: StringNullableFilter<"Question"> | string | null
    difficulty?: EnumDifficultyLevelFilter<"Question"> | $Enums.DifficultyLevel
    examYear?: IntNullableFilter<"Question"> | number | null
    examPeriod?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    isActive?: BoolFilter<"Question"> | boolean
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    universityId?: StringFilter<"Question"> | string
    subjectId?: StringFilter<"Question"> | string
    careerId?: StringFilter<"Question"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutTargetUniversityInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTargetUniversityInput, UserUncheckedUpdateWithoutTargetUniversityInput>
    create: XOR<UserCreateWithoutTargetUniversityInput, UserUncheckedCreateWithoutTargetUniversityInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTargetUniversityInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTargetUniversityInput, UserUncheckedUpdateWithoutTargetUniversityInput>
  }

  export type UserUpdateManyWithWhereWithoutTargetUniversityInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTargetUniversityInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    targetUniversityId?: StringNullableFilter<"User"> | string | null
    targetCareerId?: StringNullableFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolFilter<"User"> | boolean
  }

  export type ExamAttemptUpsertWithWhereUniqueWithoutUniversityInput = {
    where: ExamAttemptWhereUniqueInput
    update: XOR<ExamAttemptUpdateWithoutUniversityInput, ExamAttemptUncheckedUpdateWithoutUniversityInput>
    create: XOR<ExamAttemptCreateWithoutUniversityInput, ExamAttemptUncheckedCreateWithoutUniversityInput>
  }

  export type ExamAttemptUpdateWithWhereUniqueWithoutUniversityInput = {
    where: ExamAttemptWhereUniqueInput
    data: XOR<ExamAttemptUpdateWithoutUniversityInput, ExamAttemptUncheckedUpdateWithoutUniversityInput>
  }

  export type ExamAttemptUpdateManyWithWhereWithoutUniversityInput = {
    where: ExamAttemptScalarWhereInput
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyWithoutUniversityInput>
  }

  export type QuestionCreateWithoutSubjectInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    university: UniversityCreateNestedOneWithoutQuestionsInput
    career: CareerCreateNestedOneWithoutQuestionsInput
    options?: Question_OptionCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutSubjectInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    careerId: string
    options?: Question_OptionUncheckedCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutSubjectInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput>
  }

  export type QuestionCreateManySubjectInputEnvelope = {
    data: QuestionCreateManySubjectInput | QuestionCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type CareerSubjectCreateWithoutSubjectInput = {
    id?: string
    createdAt?: Date | string
    career: CareerCreateNestedOneWithoutCareerSubjectsInput
  }

  export type CareerSubjectUncheckedCreateWithoutSubjectInput = {
    id?: string
    createdAt?: Date | string
    careerId: string
  }

  export type CareerSubjectCreateOrConnectWithoutSubjectInput = {
    where: CareerSubjectWhereUniqueInput
    create: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput>
  }

  export type CareerSubjectCreateManySubjectInputEnvelope = {
    data: CareerSubjectCreateManySubjectInput | CareerSubjectCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithWhereUniqueWithoutSubjectInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutSubjectInput, QuestionUncheckedUpdateWithoutSubjectInput>
    create: XOR<QuestionCreateWithoutSubjectInput, QuestionUncheckedCreateWithoutSubjectInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutSubjectInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutSubjectInput, QuestionUncheckedUpdateWithoutSubjectInput>
  }

  export type QuestionUpdateManyWithWhereWithoutSubjectInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutSubjectInput>
  }

  export type CareerSubjectUpsertWithWhereUniqueWithoutSubjectInput = {
    where: CareerSubjectWhereUniqueInput
    update: XOR<CareerSubjectUpdateWithoutSubjectInput, CareerSubjectUncheckedUpdateWithoutSubjectInput>
    create: XOR<CareerSubjectCreateWithoutSubjectInput, CareerSubjectUncheckedCreateWithoutSubjectInput>
  }

  export type CareerSubjectUpdateWithWhereUniqueWithoutSubjectInput = {
    where: CareerSubjectWhereUniqueInput
    data: XOR<CareerSubjectUpdateWithoutSubjectInput, CareerSubjectUncheckedUpdateWithoutSubjectInput>
  }

  export type CareerSubjectUpdateManyWithWhereWithoutSubjectInput = {
    where: CareerSubjectScalarWhereInput
    data: XOR<CareerSubjectUpdateManyMutationInput, CareerSubjectUncheckedUpdateManyWithoutSubjectInput>
  }

  export type CareerSubjectScalarWhereInput = {
    AND?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
    OR?: CareerSubjectScalarWhereInput[]
    NOT?: CareerSubjectScalarWhereInput | CareerSubjectScalarWhereInput[]
    id?: StringFilter<"CareerSubject"> | string
    createdAt?: DateTimeFilter<"CareerSubject"> | Date | string
    careerId?: StringFilter<"CareerSubject"> | string
    subjectId?: StringFilter<"CareerSubject"> | string
  }

  export type QuestionCreateWithoutCareerInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    university: UniversityCreateNestedOneWithoutQuestionsInput
    subject: SubjectCreateNestedOneWithoutQuestionsInput
    options?: Question_OptionCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutCareerInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
    options?: Question_OptionUncheckedCreateNestedManyWithoutQuestionInput
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutCareerInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput>
  }

  export type QuestionCreateManyCareerInputEnvelope = {
    data: QuestionCreateManyCareerInput | QuestionCreateManyCareerInput[]
    skipDuplicates?: boolean
  }

  export type CareerSubjectCreateWithoutCareerInput = {
    id?: string
    createdAt?: Date | string
    subject: SubjectCreateNestedOneWithoutCareerSubjectsInput
  }

  export type CareerSubjectUncheckedCreateWithoutCareerInput = {
    id?: string
    createdAt?: Date | string
    subjectId: string
  }

  export type CareerSubjectCreateOrConnectWithoutCareerInput = {
    where: CareerSubjectWhereUniqueInput
    create: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput>
  }

  export type CareerSubjectCreateManyCareerInputEnvelope = {
    data: CareerSubjectCreateManyCareerInput | CareerSubjectCreateManyCareerInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTargetCareerInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    hasCompletedOnboarding?: boolean
    targetUniversity?: UniversityCreateNestedOneWithoutUsersInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTargetCareerInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetUniversityId?: string | null
    hasCompletedOnboarding?: boolean
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTargetCareerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput>
  }

  export type UserCreateManyTargetCareerInputEnvelope = {
    data: UserCreateManyTargetCareerInput | UserCreateManyTargetCareerInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithWhereUniqueWithoutCareerInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutCareerInput, QuestionUncheckedUpdateWithoutCareerInput>
    create: XOR<QuestionCreateWithoutCareerInput, QuestionUncheckedCreateWithoutCareerInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutCareerInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutCareerInput, QuestionUncheckedUpdateWithoutCareerInput>
  }

  export type QuestionUpdateManyWithWhereWithoutCareerInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutCareerInput>
  }

  export type CareerSubjectUpsertWithWhereUniqueWithoutCareerInput = {
    where: CareerSubjectWhereUniqueInput
    update: XOR<CareerSubjectUpdateWithoutCareerInput, CareerSubjectUncheckedUpdateWithoutCareerInput>
    create: XOR<CareerSubjectCreateWithoutCareerInput, CareerSubjectUncheckedCreateWithoutCareerInput>
  }

  export type CareerSubjectUpdateWithWhereUniqueWithoutCareerInput = {
    where: CareerSubjectWhereUniqueInput
    data: XOR<CareerSubjectUpdateWithoutCareerInput, CareerSubjectUncheckedUpdateWithoutCareerInput>
  }

  export type CareerSubjectUpdateManyWithWhereWithoutCareerInput = {
    where: CareerSubjectScalarWhereInput
    data: XOR<CareerSubjectUpdateManyMutationInput, CareerSubjectUncheckedUpdateManyWithoutCareerInput>
  }

  export type UserUpsertWithWhereUniqueWithoutTargetCareerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTargetCareerInput, UserUncheckedUpdateWithoutTargetCareerInput>
    create: XOR<UserCreateWithoutTargetCareerInput, UserUncheckedCreateWithoutTargetCareerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTargetCareerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTargetCareerInput, UserUncheckedUpdateWithoutTargetCareerInput>
  }

  export type UserUpdateManyWithWhereWithoutTargetCareerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTargetCareerInput>
  }

  export type CareerCreateWithoutCareerSubjectsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutCareerInput
    targetUsers?: UserCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerUncheckedCreateWithoutCareerSubjectsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutCareerInput
    targetUsers?: UserUncheckedCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerCreateOrConnectWithoutCareerSubjectsInput = {
    where: CareerWhereUniqueInput
    create: XOR<CareerCreateWithoutCareerSubjectsInput, CareerUncheckedCreateWithoutCareerSubjectsInput>
  }

  export type SubjectCreateWithoutCareerSubjectsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutCareerSubjectsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutCareerSubjectsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutCareerSubjectsInput, SubjectUncheckedCreateWithoutCareerSubjectsInput>
  }

  export type CareerUpsertWithoutCareerSubjectsInput = {
    update: XOR<CareerUpdateWithoutCareerSubjectsInput, CareerUncheckedUpdateWithoutCareerSubjectsInput>
    create: XOR<CareerCreateWithoutCareerSubjectsInput, CareerUncheckedCreateWithoutCareerSubjectsInput>
    where?: CareerWhereInput
  }

  export type CareerUpdateToOneWithWhereWithoutCareerSubjectsInput = {
    where?: CareerWhereInput
    data: XOR<CareerUpdateWithoutCareerSubjectsInput, CareerUncheckedUpdateWithoutCareerSubjectsInput>
  }

  export type CareerUpdateWithoutCareerSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUpdateManyWithoutTargetCareerNestedInput
  }

  export type CareerUncheckedUpdateWithoutCareerSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUncheckedUpdateManyWithoutTargetCareerNestedInput
  }

  export type SubjectUpsertWithoutCareerSubjectsInput = {
    update: XOR<SubjectUpdateWithoutCareerSubjectsInput, SubjectUncheckedUpdateWithoutCareerSubjectsInput>
    create: XOR<SubjectCreateWithoutCareerSubjectsInput, SubjectUncheckedCreateWithoutCareerSubjectsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutCareerSubjectsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutCareerSubjectsInput, SubjectUncheckedUpdateWithoutCareerSubjectsInput>
  }

  export type SubjectUpdateWithoutCareerSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutCareerSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type UniversityCreateWithoutQuestionsInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTargetUniversityInput
    examAttempts?: ExamAttemptCreateNestedManyWithoutUniversityInput
  }

  export type UniversityUncheckedCreateWithoutQuestionsInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTargetUniversityInput
    examAttempts?: ExamAttemptUncheckedCreateNestedManyWithoutUniversityInput
  }

  export type UniversityCreateOrConnectWithoutQuestionsInput = {
    where: UniversityWhereUniqueInput
    create: XOR<UniversityCreateWithoutQuestionsInput, UniversityUncheckedCreateWithoutQuestionsInput>
  }

  export type SubjectCreateWithoutQuestionsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    careerSubjects?: CareerSubjectCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutQuestionsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    careerSubjects?: CareerSubjectUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutQuestionsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutQuestionsInput, SubjectUncheckedCreateWithoutQuestionsInput>
  }

  export type CareerCreateWithoutQuestionsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    careerSubjects?: CareerSubjectCreateNestedManyWithoutCareerInput
    targetUsers?: UserCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerUncheckedCreateWithoutQuestionsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    careerSubjects?: CareerSubjectUncheckedCreateNestedManyWithoutCareerInput
    targetUsers?: UserUncheckedCreateNestedManyWithoutTargetCareerInput
  }

  export type CareerCreateOrConnectWithoutQuestionsInput = {
    where: CareerWhereUniqueInput
    create: XOR<CareerCreateWithoutQuestionsInput, CareerUncheckedCreateWithoutQuestionsInput>
  }

  export type Question_OptionCreateWithoutQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    studentAnswers?: StudentAnswerCreateNestedManyWithoutSelectedOptionInput
  }

  export type Question_OptionUncheckedCreateWithoutQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutSelectedOptionInput
  }

  export type Question_OptionCreateOrConnectWithoutQuestionInput = {
    where: Question_OptionWhereUniqueInput
    create: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput>
  }

  export type Question_OptionCreateManyQuestionInputEnvelope = {
    data: Question_OptionCreateManyQuestionInput | Question_OptionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type StudentAnswerCreateWithoutQuestionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttempt: ExamAttemptCreateNestedOneWithoutStudentAnswersInput
    selectedOption?: Question_OptionCreateNestedOneWithoutStudentAnswersInput
  }

  export type StudentAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    selectedOptionId?: string | null
  }

  export type StudentAnswerCreateOrConnectWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    create: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type StudentAnswerCreateManyQuestionInputEnvelope = {
    data: StudentAnswerCreateManyQuestionInput | StudentAnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type UniversityUpsertWithoutQuestionsInput = {
    update: XOR<UniversityUpdateWithoutQuestionsInput, UniversityUncheckedUpdateWithoutQuestionsInput>
    create: XOR<UniversityCreateWithoutQuestionsInput, UniversityUncheckedCreateWithoutQuestionsInput>
    where?: UniversityWhereInput
  }

  export type UniversityUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: UniversityWhereInput
    data: XOR<UniversityUpdateWithoutQuestionsInput, UniversityUncheckedUpdateWithoutQuestionsInput>
  }

  export type UniversityUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTargetUniversityNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUniversityNestedInput
  }

  export type UniversityUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTargetUniversityNestedInput
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUniversityNestedInput
  }

  export type SubjectUpsertWithoutQuestionsInput = {
    update: XOR<SubjectUpdateWithoutQuestionsInput, SubjectUncheckedUpdateWithoutQuestionsInput>
    create: XOR<SubjectCreateWithoutQuestionsInput, SubjectUncheckedCreateWithoutQuestionsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutQuestionsInput, SubjectUncheckedUpdateWithoutQuestionsInput>
  }

  export type SubjectUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerSubjects?: CareerSubjectUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerSubjects?: CareerSubjectUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type CareerUpsertWithoutQuestionsInput = {
    update: XOR<CareerUpdateWithoutQuestionsInput, CareerUncheckedUpdateWithoutQuestionsInput>
    create: XOR<CareerCreateWithoutQuestionsInput, CareerUncheckedCreateWithoutQuestionsInput>
    where?: CareerWhereInput
  }

  export type CareerUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: CareerWhereInput
    data: XOR<CareerUpdateWithoutQuestionsInput, CareerUncheckedUpdateWithoutQuestionsInput>
  }

  export type CareerUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerSubjects?: CareerSubjectUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUpdateManyWithoutTargetCareerNestedInput
  }

  export type CareerUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerSubjects?: CareerSubjectUncheckedUpdateManyWithoutCareerNestedInput
    targetUsers?: UserUncheckedUpdateManyWithoutTargetCareerNestedInput
  }

  export type Question_OptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Question_OptionWhereUniqueInput
    update: XOR<Question_OptionUpdateWithoutQuestionInput, Question_OptionUncheckedUpdateWithoutQuestionInput>
    create: XOR<Question_OptionCreateWithoutQuestionInput, Question_OptionUncheckedCreateWithoutQuestionInput>
  }

  export type Question_OptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Question_OptionWhereUniqueInput
    data: XOR<Question_OptionUpdateWithoutQuestionInput, Question_OptionUncheckedUpdateWithoutQuestionInput>
  }

  export type Question_OptionUpdateManyWithWhereWithoutQuestionInput = {
    where: Question_OptionScalarWhereInput
    data: XOR<Question_OptionUpdateManyMutationInput, Question_OptionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type Question_OptionScalarWhereInput = {
    AND?: Question_OptionScalarWhereInput | Question_OptionScalarWhereInput[]
    OR?: Question_OptionScalarWhereInput[]
    NOT?: Question_OptionScalarWhereInput | Question_OptionScalarWhereInput[]
    id?: StringFilter<"Question_Option"> | string
    text?: StringFilter<"Question_Option"> | string
    isCorrect?: BoolFilter<"Question_Option"> | boolean
    orderIndex?: IntFilter<"Question_Option"> | number
    questionId?: StringFilter<"Question_Option"> | string
  }

  export type StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    update: XOR<StudentAnswerUpdateWithoutQuestionInput, StudentAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    data: XOR<StudentAnswerUpdateWithoutQuestionInput, StudentAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type StudentAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: StudentAnswerScalarWhereInput
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type StudentAnswerScalarWhereInput = {
    AND?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
    OR?: StudentAnswerScalarWhereInput[]
    NOT?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
    id?: StringFilter<"StudentAnswer"> | string
    isCorrect?: BoolFilter<"StudentAnswer"> | boolean
    answeredAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    examAttemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOptionId?: StringNullableFilter<"StudentAnswer"> | string | null
  }

  export type QuestionCreateWithoutOptionsInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    university: UniversityCreateNestedOneWithoutQuestionsInput
    subject: SubjectCreateNestedOneWithoutQuestionsInput
    career: CareerCreateNestedOneWithoutQuestionsInput
    studentAnswers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutOptionsInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
    careerId: string
    studentAnswers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutOptionsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
  }

  export type StudentAnswerCreateWithoutSelectedOptionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttempt: ExamAttemptCreateNestedOneWithoutStudentAnswersInput
    question: QuestionCreateNestedOneWithoutStudentAnswersInput
  }

  export type StudentAnswerUncheckedCreateWithoutSelectedOptionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    questionId: string
  }

  export type StudentAnswerCreateOrConnectWithoutSelectedOptionInput = {
    where: StudentAnswerWhereUniqueInput
    create: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput>
  }

  export type StudentAnswerCreateManySelectedOptionInputEnvelope = {
    data: StudentAnswerCreateManySelectedOptionInput | StudentAnswerCreateManySelectedOptionInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithoutOptionsInput = {
    update: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type QuestionUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    university?: UniversityUpdateOneRequiredWithoutQuestionsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutQuestionsNestedInput
    career?: CareerUpdateOneRequiredWithoutQuestionsNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type StudentAnswerUpsertWithWhereUniqueWithoutSelectedOptionInput = {
    where: StudentAnswerWhereUniqueInput
    update: XOR<StudentAnswerUpdateWithoutSelectedOptionInput, StudentAnswerUncheckedUpdateWithoutSelectedOptionInput>
    create: XOR<StudentAnswerCreateWithoutSelectedOptionInput, StudentAnswerUncheckedCreateWithoutSelectedOptionInput>
  }

  export type StudentAnswerUpdateWithWhereUniqueWithoutSelectedOptionInput = {
    where: StudentAnswerWhereUniqueInput
    data: XOR<StudentAnswerUpdateWithoutSelectedOptionInput, StudentAnswerUncheckedUpdateWithoutSelectedOptionInput>
  }

  export type StudentAnswerUpdateManyWithWhereWithoutSelectedOptionInput = {
    where: StudentAnswerScalarWhereInput
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyWithoutSelectedOptionInput>
  }

  export type UniversityCreateWithoutExamAttemptsInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutUniversityInput
    users?: UserCreateNestedManyWithoutTargetUniversityInput
  }

  export type UniversityUncheckedCreateWithoutExamAttemptsInput = {
    id?: string
    name: string
    shortName: string
    city: string
    region: string
    country?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutUniversityInput
    users?: UserUncheckedCreateNestedManyWithoutTargetUniversityInput
  }

  export type UniversityCreateOrConnectWithoutExamAttemptsInput = {
    where: UniversityWhereUniqueInput
    create: XOR<UniversityCreateWithoutExamAttemptsInput, UniversityUncheckedCreateWithoutExamAttemptsInput>
  }

  export type UserCreateWithoutExamAttemptsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    hasCompletedOnboarding?: boolean
    targetUniversity?: UniversityCreateNestedOneWithoutUsersInput
    targetCareer?: CareerCreateNestedOneWithoutTargetUsersInput
  }

  export type UserUncheckedCreateWithoutExamAttemptsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetUniversityId?: string | null
    targetCareerId?: string | null
    hasCompletedOnboarding?: boolean
  }

  export type UserCreateOrConnectWithoutExamAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExamAttemptsInput, UserUncheckedCreateWithoutExamAttemptsInput>
  }

  export type StudentAnswerCreateWithoutExamAttemptInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    question: QuestionCreateNestedOneWithoutStudentAnswersInput
    selectedOption?: Question_OptionCreateNestedOneWithoutStudentAnswersInput
  }

  export type StudentAnswerUncheckedCreateWithoutExamAttemptInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    questionId: string
    selectedOptionId?: string | null
  }

  export type StudentAnswerCreateOrConnectWithoutExamAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    create: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput>
  }

  export type StudentAnswerCreateManyExamAttemptInputEnvelope = {
    data: StudentAnswerCreateManyExamAttemptInput | StudentAnswerCreateManyExamAttemptInput[]
    skipDuplicates?: boolean
  }

  export type UniversityUpsertWithoutExamAttemptsInput = {
    update: XOR<UniversityUpdateWithoutExamAttemptsInput, UniversityUncheckedUpdateWithoutExamAttemptsInput>
    create: XOR<UniversityCreateWithoutExamAttemptsInput, UniversityUncheckedCreateWithoutExamAttemptsInput>
    where?: UniversityWhereInput
  }

  export type UniversityUpdateToOneWithWhereWithoutExamAttemptsInput = {
    where?: UniversityWhereInput
    data: XOR<UniversityUpdateWithoutExamAttemptsInput, UniversityUncheckedUpdateWithoutExamAttemptsInput>
  }

  export type UniversityUpdateWithoutExamAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutUniversityNestedInput
    users?: UserUpdateManyWithoutTargetUniversityNestedInput
  }

  export type UniversityUncheckedUpdateWithoutExamAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutUniversityNestedInput
    users?: UserUncheckedUpdateManyWithoutTargetUniversityNestedInput
  }

  export type UserUpsertWithoutExamAttemptsInput = {
    update: XOR<UserUpdateWithoutExamAttemptsInput, UserUncheckedUpdateWithoutExamAttemptsInput>
    create: XOR<UserCreateWithoutExamAttemptsInput, UserUncheckedCreateWithoutExamAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExamAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExamAttemptsInput, UserUncheckedUpdateWithoutExamAttemptsInput>
  }

  export type UserUpdateWithoutExamAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    targetUniversity?: UniversityUpdateOneWithoutUsersNestedInput
    targetCareer?: CareerUpdateOneWithoutTargetUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutExamAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetUniversityId?: NullableStringFieldUpdateOperationsInput | string | null
    targetCareerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StudentAnswerUpsertWithWhereUniqueWithoutExamAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    update: XOR<StudentAnswerUpdateWithoutExamAttemptInput, StudentAnswerUncheckedUpdateWithoutExamAttemptInput>
    create: XOR<StudentAnswerCreateWithoutExamAttemptInput, StudentAnswerUncheckedCreateWithoutExamAttemptInput>
  }

  export type StudentAnswerUpdateWithWhereUniqueWithoutExamAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    data: XOR<StudentAnswerUpdateWithoutExamAttemptInput, StudentAnswerUncheckedUpdateWithoutExamAttemptInput>
  }

  export type StudentAnswerUpdateManyWithWhereWithoutExamAttemptInput = {
    where: StudentAnswerScalarWhereInput
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyWithoutExamAttemptInput>
  }

  export type ExamAttemptCreateWithoutStudentAnswersInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    university: UniversityCreateNestedOneWithoutExamAttemptsInput
    user: UserCreateNestedOneWithoutExamAttemptsInput
  }

  export type ExamAttemptUncheckedCreateWithoutStudentAnswersInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    userId: string
  }

  export type ExamAttemptCreateOrConnectWithoutStudentAnswersInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutStudentAnswersInput, ExamAttemptUncheckedCreateWithoutStudentAnswersInput>
  }

  export type QuestionCreateWithoutStudentAnswersInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    university: UniversityCreateNestedOneWithoutQuestionsInput
    subject: SubjectCreateNestedOneWithoutQuestionsInput
    career: CareerCreateNestedOneWithoutQuestionsInput
    options?: Question_OptionCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutStudentAnswersInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
    careerId: string
    options?: Question_OptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutStudentAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutStudentAnswersInput, QuestionUncheckedCreateWithoutStudentAnswersInput>
  }

  export type Question_OptionCreateWithoutStudentAnswersInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    question: QuestionCreateNestedOneWithoutOptionsInput
  }

  export type Question_OptionUncheckedCreateWithoutStudentAnswersInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
    questionId: string
  }

  export type Question_OptionCreateOrConnectWithoutStudentAnswersInput = {
    where: Question_OptionWhereUniqueInput
    create: XOR<Question_OptionCreateWithoutStudentAnswersInput, Question_OptionUncheckedCreateWithoutStudentAnswersInput>
  }

  export type ExamAttemptUpsertWithoutStudentAnswersInput = {
    update: XOR<ExamAttemptUpdateWithoutStudentAnswersInput, ExamAttemptUncheckedUpdateWithoutStudentAnswersInput>
    create: XOR<ExamAttemptCreateWithoutStudentAnswersInput, ExamAttemptUncheckedCreateWithoutStudentAnswersInput>
    where?: ExamAttemptWhereInput
  }

  export type ExamAttemptUpdateToOneWithWhereWithoutStudentAnswersInput = {
    where?: ExamAttemptWhereInput
    data: XOR<ExamAttemptUpdateWithoutStudentAnswersInput, ExamAttemptUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type ExamAttemptUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    university?: UniversityUpdateOneRequiredWithoutExamAttemptsNestedInput
    user?: UserUpdateOneRequiredWithoutExamAttemptsNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionUpsertWithoutStudentAnswersInput = {
    update: XOR<QuestionUpdateWithoutStudentAnswersInput, QuestionUncheckedUpdateWithoutStudentAnswersInput>
    create: XOR<QuestionCreateWithoutStudentAnswersInput, QuestionUncheckedCreateWithoutStudentAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutStudentAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutStudentAnswersInput, QuestionUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type QuestionUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    university?: UniversityUpdateOneRequiredWithoutQuestionsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutQuestionsNestedInput
    career?: CareerUpdateOneRequiredWithoutQuestionsNestedInput
    options?: Question_OptionUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
    options?: Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type Question_OptionUpsertWithoutStudentAnswersInput = {
    update: XOR<Question_OptionUpdateWithoutStudentAnswersInput, Question_OptionUncheckedUpdateWithoutStudentAnswersInput>
    create: XOR<Question_OptionCreateWithoutStudentAnswersInput, Question_OptionUncheckedCreateWithoutStudentAnswersInput>
    where?: Question_OptionWhereInput
  }

  export type Question_OptionUpdateToOneWithWhereWithoutStudentAnswersInput = {
    where?: Question_OptionWhereInput
    data: XOR<Question_OptionUpdateWithoutStudentAnswersInput, Question_OptionUncheckedUpdateWithoutStudentAnswersInput>
  }

  export type Question_OptionUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    question?: QuestionUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type Question_OptionUncheckedUpdateWithoutStudentAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    questionId?: StringFieldUpdateOperationsInput | string
  }

  export type ExamAttemptCreateManyUserInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
  }

  export type ExamAttemptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    university?: UniversityUpdateOneRequiredWithoutExamAttemptsNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
  }

  export type QuestionCreateManyUniversityInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectId: string
    careerId: string
  }

  export type UserCreateManyTargetUniversityInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetCareerId?: string | null
    hasCompletedOnboarding?: boolean
  }

  export type ExamAttemptCreateManyUniversityInput = {
    id?: string
    status?: $Enums.ExamAttemptStatus
    score?: number | null
    totalQuestions: number
    correctAnswers?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectIds?: ExamAttemptCreatesubjectIdsInput | string[]
    careerIds?: ExamAttemptCreatecareerIdsInput | string[]
    difficulty?: $Enums.DifficultyLevel | null
    examYears?: ExamAttemptCreateexamYearsInput | number[]
    userId: string
  }

  export type QuestionUpdateWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutQuestionsNestedInput
    career?: CareerUpdateOneRequiredWithoutQuestionsNestedInput
    options?: Question_OptionUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
    options?: Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutTargetUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    targetCareer?: CareerUpdateOneWithoutTargetUsersNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTargetUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetCareerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTargetUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetCareerId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExamAttemptUpdateWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    user?: UserUpdateOneRequiredWithoutExamAttemptsNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutExamAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateManyWithoutUniversityInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExamAttemptStatusFieldUpdateOperationsInput | $Enums.ExamAttemptStatus
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectIds?: ExamAttemptUpdatesubjectIdsInput | string[]
    careerIds?: ExamAttemptUpdatecareerIdsInput | string[]
    difficulty?: NullableEnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel | null
    examYears?: ExamAttemptUpdateexamYearsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionCreateManySubjectInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    careerId: string
  }

  export type CareerSubjectCreateManySubjectInput = {
    id?: string
    createdAt?: Date | string
    careerId: string
  }

  export type QuestionUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    university?: UniversityUpdateOneRequiredWithoutQuestionsNestedInput
    career?: CareerUpdateOneRequiredWithoutQuestionsNestedInput
    options?: Question_OptionUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
    options?: Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    careerId?: StringFieldUpdateOperationsInput | string
  }

  export type CareerSubjectUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    career?: CareerUpdateOneRequiredWithoutCareerSubjectsNestedInput
  }

  export type CareerSubjectUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerId?: StringFieldUpdateOperationsInput | string
  }

  export type CareerSubjectUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionCreateManyCareerInput = {
    id?: string
    text: string
    imageUrl?: string | null
    difficulty: $Enums.DifficultyLevel
    examYear?: number | null
    examPeriod?: string | null
    explanation?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    universityId: string
    subjectId: string
  }

  export type CareerSubjectCreateManyCareerInput = {
    id?: string
    createdAt?: Date | string
    subjectId: string
  }

  export type UserCreateManyTargetCareerInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    country?: string | null
    targetUniversityId?: string | null
    hasCompletedOnboarding?: boolean
  }

  export type QuestionUpdateWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    university?: UniversityUpdateOneRequiredWithoutQuestionsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutQuestionsNestedInput
    options?: Question_OptionUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    options?: Question_OptionUncheckedUpdateManyWithoutQuestionNestedInput
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: EnumDifficultyLevelFieldUpdateOperationsInput | $Enums.DifficultyLevel
    examYear?: NullableIntFieldUpdateOperationsInput | number | null
    examPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    universityId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type CareerSubjectUpdateWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutCareerSubjectsNestedInput
  }

  export type CareerSubjectUncheckedUpdateWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type CareerSubjectUncheckedUpdateManyWithoutCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutTargetCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    targetUniversity?: UniversityUpdateOneWithoutUsersNestedInput
    examAttempts?: ExamAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTargetCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetUniversityId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    examAttempts?: ExamAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTargetCareerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    targetUniversityId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Question_OptionCreateManyQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    orderIndex: number
  }

  export type StudentAnswerCreateManyQuestionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    selectedOptionId?: string | null
  }

  export type Question_OptionUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    studentAnswers?: StudentAnswerUpdateManyWithoutSelectedOptionNestedInput
  }

  export type Question_OptionUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    studentAnswers?: StudentAnswerUncheckedUpdateManyWithoutSelectedOptionNestedInput
  }

  export type Question_OptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type StudentAnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttempt?: ExamAttemptUpdateOneRequiredWithoutStudentAnswersNestedInput
    selectedOption?: Question_OptionUpdateOneWithoutStudentAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentAnswerCreateManySelectedOptionInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    examAttemptId: string
    questionId: string
  }

  export type StudentAnswerUpdateWithoutSelectedOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttempt?: ExamAttemptUpdateOneRequiredWithoutStudentAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutStudentAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateWithoutSelectedOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentAnswerUncheckedUpdateManyWithoutSelectedOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examAttemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentAnswerCreateManyExamAttemptInput = {
    id?: string
    isCorrect?: boolean
    answeredAt?: Date | string
    questionId: string
    selectedOptionId?: string | null
  }

  export type StudentAnswerUpdateWithoutExamAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutStudentAnswersNestedInput
    selectedOption?: Question_OptionUpdateOneWithoutStudentAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateWithoutExamAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentAnswerUncheckedUpdateManyWithoutExamAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UniversityCountOutputTypeDefaultArgs instead
     */
    export type UniversityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UniversityCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubjectCountOutputTypeDefaultArgs instead
     */
    export type SubjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerCountOutputTypeDefaultArgs instead
     */
    export type CareerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionCountOutputTypeDefaultArgs instead
     */
    export type QuestionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Question_OptionCountOutputTypeDefaultArgs instead
     */
    export type Question_OptionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Question_OptionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamAttemptCountOutputTypeDefaultArgs instead
     */
    export type ExamAttemptCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UniversityDefaultArgs instead
     */
    export type UniversityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UniversityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubjectDefaultArgs instead
     */
    export type SubjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerDefaultArgs instead
     */
    export type CareerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerSubjectDefaultArgs instead
     */
    export type CareerSubjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerSubjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionDefaultArgs instead
     */
    export type QuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Question_OptionDefaultArgs instead
     */
    export type Question_OptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Question_OptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamAttemptDefaultArgs instead
     */
    export type ExamAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentAnswerDefaultArgs instead
     */
    export type StudentAnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentAnswerDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}