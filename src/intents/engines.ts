/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/rox
 *
 * This file is part of Rox AI
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Intents } from "../@types/intents"
import { RoxConfig } from "../@types/rox"
import DialogFlowCX from "./dialogflow_cx"
import DialogFlowES from "./dialogflow_es"

export function getIntentsEngine(roxConfig: RoxConfig): Intents {
  const googleConfig = require(roxConfig.googleConfigFile)

  if (roxConfig.intentsEngine === "dialogflow.cx") {
    return new DialogFlowCX({
      projectId: roxConfig.intentsEngineProjectId || googleConfig.project_id,
      keyFilename: roxConfig.googleConfigFile,
      languageCode: roxConfig.languageCode,
      agent: roxConfig.intentsEngineAgent as string,
      location: roxConfig.intentsEngineLocation as string
    })
  }

  return new DialogFlowES({
    projectId: roxConfig.intentsEngineProjectId || googleConfig.project_id,
    keyFilename: roxConfig.googleConfigFile,
    languageCode: roxConfig.languageCode,
    platform: roxConfig.intentsEnginePlatform
  })
}