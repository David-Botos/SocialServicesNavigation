/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
/* eslint-disable */
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
import type { BamlRuntime, FunctionResult, BamlCtxManager, Image, Audio, ClientRegistry } from "@boundaryml/baml"
import { toBamlError } from "@boundaryml/baml"
import type { Checked, Check, RecursivePartialNull as MovedRecursivePartialNull } from "./types"
import type * as types from "./types"
import type {Problem, Problems, Resume} from "./types"
import type TypeBuilder from "./type_builder"
import { DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME } from "./globals"

/**
 * @deprecated Use RecursivePartialNull from 'baml_client/types' instead.
 * Example:
 * ```ts
 * import { RecursivePartialNull } from './baml_client/types'
 * ```
 */
export type RecursivePartialNull<T> = MovedRecursivePartialNull<T>;

export class BamlSyncClient {

  constructor(private runtime: BamlRuntime, private ctx_manager: BamlCtxManager) {}

  /*
  * @deprecated NOT IMPLEMENTED as streaming must by async. We
  * are not providing an async version as we want to reserve the
  * right to provide a sync version in the future.
  */
  get stream() {
    throw new Error("stream is not available in BamlSyncClient. Use `import { b } from 'baml_client/async_client")
  }

  
  ExtractClientProblems(
      transcript: string,
      __baml_options__?: { tb?: TypeBuilder, clientRegistry?: ClientRegistry }
  ): Problems {
    try {
    const raw = this.runtime.callFunctionSync(
      "ExtractClientProblems",
      {
        "transcript": transcript
      },
      this.ctx_manager.cloneContext(),
      __baml_options__?.tb?.__tb(),
      __baml_options__?.clientRegistry,
    )
    return raw.parsed(false) as Problems
    } catch (error: any) {
      throw toBamlError(error);
    }
  }
  
  ExtractResume(
      resume: string,
      __baml_options__?: { tb?: TypeBuilder, clientRegistry?: ClientRegistry }
  ): Resume {
    try {
    const raw = this.runtime.callFunctionSync(
      "ExtractResume",
      {
        "resume": resume
      },
      this.ctx_manager.cloneContext(),
      __baml_options__?.tb?.__tb(),
      __baml_options__?.clientRegistry,
    )
    return raw.parsed(false) as Resume
    } catch (error: any) {
      throw toBamlError(error);
    }
  }
  
}

export const b = new BamlSyncClient(DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX)