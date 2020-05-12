import {
  DEFAULT_CONFIG,
  TOP_CONFIG,
  BOTTOM_CONFIG,
  MODIFIED_LIGHT_CONFIG,
  MODIFIED_LIGHT_CONFIG2,
} from "./configs";

import { MODEL_NAMES, MODELS } from "./base_config";

export const CONFIGS = {
  DEFAULT_CONFIG,
  TOP_CONFIG,
  BOTTOM_CONFIG,
  MODIFIED_LIGHT_CONFIG,
  MODIFIED_LIGHT_CONFIG2,
};

export const CONFIGS_LIST = Object.keys(CONFIGS).map(
  (configName) => configName
);

export { MODEL_NAMES, MODELS };
