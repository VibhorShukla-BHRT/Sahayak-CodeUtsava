/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface DocumentVerificationInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "documents"
      | "getDocumentInfo"
      | "storeDocument"
      | "verifyDocument"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "documents",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getDocumentInfo",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "storeDocument",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyDocument",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "documents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDocumentInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storeDocument",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyDocument",
    data: BytesLike
  ): Result;
}

export interface DocumentVerification extends BaseContract {
  connect(runner?: ContractRunner | null): DocumentVerification;
  waitForDeployment(): Promise<this>;

  interface: DocumentVerificationInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  documents: TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint] & {
        orgId: string;
        documentHash: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  getDocumentInfo: TypedContractMethod<
    [documentHash: BytesLike],
    [[string, bigint]],
    "view"
  >;

  storeDocument: TypedContractMethod<
    [orgId: string, documentHash: BytesLike],
    [void],
    "nonpayable"
  >;

  verifyDocument: TypedContractMethod<
    [documentHash: BytesLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "documents"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint] & {
        orgId: string;
        documentHash: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDocumentInfo"
  ): TypedContractMethod<[documentHash: BytesLike], [[string, bigint]], "view">;
  getFunction(
    nameOrSignature: "storeDocument"
  ): TypedContractMethod<
    [orgId: string, documentHash: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "verifyDocument"
  ): TypedContractMethod<[documentHash: BytesLike], [boolean], "view">;

  filters: {};
}