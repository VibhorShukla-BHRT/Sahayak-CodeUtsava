/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  DocumentVerification,
  DocumentVerificationInterface,
} from "../DocumentVerification";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "documents",
    outputs: [
      {
        internalType: "string",
        name: "orgId",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
    ],
    name: "getDocumentInfo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "orgId",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
    ],
    name: "storeDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
    ],
    name: "verifyDocument",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50610a378061001f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063090b0a30146100515780632b2805db14610082578063dcb67da3146100b4578063fe35089f146100d0575b600080fd5b61006b6004803603810190610066919061039d565b610100565b604051610079929190610473565b60405180910390f35b61009c6004803603810190610097919061039d565b6101c4565b6040516100ab939291906104b2565b60405180910390f35b6100ce60048036038101906100c99190610625565b610276565b005b6100ea60048036038101906100e5919061039d565b61032e565b6040516100f7919061069c565b60405180910390f35b606060008060008481526020019081526020016000206000016000808581526020019081526020016000206002015481805461013b906106e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610167906106e6565b80156101b45780601f10610189576101008083540402835291602001916101b4565b820191906000526020600020905b81548152906001019060200180831161019757829003601f168201915b5050505050915091509150915091565b60006020528060005260406000206000915090508060000180546101e7906106e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610213906106e6565b80156102605780601f1061023557610100808354040283529160200191610260565b820191906000526020600020905b81548152906001019060200180831161024357829003601f168201915b5050505050908060010154908060020154905083565b6000801b60008083815260200190815260200160002060010154146102d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c790610763565b60405180910390fd5b6040518060600160405280838152602001828152602001428152506000808381526020019081526020016000206000820151816000019081610312919061092f565b5060208201518160010155604082015181600201559050505050565b60008060001b6000808481526020019081526020016000206001015414159050919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61037a81610367565b811461038557600080fd5b50565b60008135905061039781610371565b92915050565b6000602082840312156103b3576103b261035d565b5b60006103c184828501610388565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156104045780820151818401526020810190506103e9565b60008484015250505050565b6000601f19601f8301169050919050565b600061042c826103ca565b61043681856103d5565b93506104468185602086016103e6565b61044f81610410565b840191505092915050565b6000819050919050565b61046d8161045a565b82525050565b6000604082019050818103600083015261048d8185610421565b905061049c6020830184610464565b9392505050565b6104ac81610367565b82525050565b600060608201905081810360008301526104cc8186610421565b90506104db60208301856104a3565b6104e86040830184610464565b949350505050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61053282610410565b810181811067ffffffffffffffff82111715610551576105506104fa565b5b80604052505050565b6000610564610353565b90506105708282610529565b919050565b600067ffffffffffffffff8211156105905761058f6104fa565b5b61059982610410565b9050602081019050919050565b82818337600083830152505050565b60006105c86105c384610575565b61055a565b9050828152602081018484840111156105e4576105e36104f5565b5b6105ef8482856105a6565b509392505050565b600082601f83011261060c5761060b6104f0565b5b813561061c8482602086016105b5565b91505092915050565b6000806040838503121561063c5761063b61035d565b5b600083013567ffffffffffffffff81111561065a57610659610362565b5b610666858286016105f7565b925050602061067785828601610388565b9150509250929050565b60008115159050919050565b61069681610681565b82525050565b60006020820190506106b1600083018461068d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806106fe57607f821691505b602082108103610711576107106106b7565b5b50919050565b7f446f63756d656e7420616c7265616479206578697374732e0000000000000000600082015250565b600061074d6018836103d5565b915061075882610717565b602082019050919050565b6000602082019050818103600083015261077c81610740565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026107e57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826107a8565b6107ef86836107a8565b95508019841693508086168417925050509392505050565b6000819050919050565b600061082c6108276108228461045a565b610807565b61045a565b9050919050565b6000819050919050565b61084683610811565b61085a61085282610833565b8484546107b5565b825550505050565b600090565b61086f610862565b61087a81848461083d565b505050565b5b8181101561089e57610893600082610867565b600181019050610880565b5050565b601f8211156108e3576108b481610783565b6108bd84610798565b810160208510156108cc578190505b6108e06108d885610798565b83018261087f565b50505b505050565b600082821c905092915050565b6000610906600019846008026108e8565b1980831691505092915050565b600061091f83836108f5565b9150826002028217905092915050565b610938826103ca565b67ffffffffffffffff811115610951576109506104fa565b5b61095b82546106e6565b6109668282856108a2565b600060209050601f8311600181146109995760008415610987578287015190505b6109918582610913565b8655506109f9565b601f1984166109a786610783565b60005b828110156109cf578489015182556001820191506020850194506020810190506109aa565b868310156109ec57848901516109e8601f8916826108f5565b8355505b6001600288020188555050505b50505050505056fea264697066735822122039eac0409533a9b8c9bb0d2bb7c0acfed83d44cb4d6c5bd1ffffbff7c0c88b7764736f6c634300081b0033";

type DocumentVerificationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DocumentVerificationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DocumentVerification__factory extends ContractFactory {
  constructor(...args: DocumentVerificationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DocumentVerification & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): DocumentVerification__factory {
    return super.connect(runner) as DocumentVerification__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DocumentVerificationInterface {
    return new Interface(_abi) as DocumentVerificationInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DocumentVerification {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as DocumentVerification;
  }
}