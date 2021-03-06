import {
  DEFAULT_CONFIG,
  TOP_CONFIG,
  TOP_CONFIG_1,
  TOP_CONFIG_2,
  BOTTOM_CONFIG,
  BOTTOM_CONFIG_1,
  BOTTOM_CONFIG_2,
  MODIFIED_LIGHT_CONFIG,
  MODIFIED_LIGHT_CONFIG2,
  DEFAULT_LIGHT_CONFIG,
  COMPOSED_LIGHT_CONFIG,
  COMPOSED_LIGHT_CONFIG_TEXTURE,
} from "./configs";

import { MODEL_NAMES, MODELS } from "./base_config";

export const CONFIGS = {
  DEFAULT_CONFIG,
  TOP_CONFIG,
  TOP_CONFIG_1,
  TOP_CONFIG_2,
  BOTTOM_CONFIG,
  BOTTOM_CONFIG_1,
  BOTTOM_CONFIG_2,
};

export const LIGHT_CONFIGS = {
  COMPOSED_LIGHT_CONFIG,
  COMPOSED_LIGHT_CONFIG_TEXTURE,
  DEFAULT_LIGHT_CONFIG,
  MODIFIED_LIGHT_CONFIG,
  MODIFIED_LIGHT_CONFIG2,
};

export const CONFIGS_LIST = Object.keys(CONFIGS).map(
  (configName) => configName
);

export const LIGHT_CONFIGS_LIST = Object.keys(LIGHT_CONFIGS).map(
  (configName) => configName
);

export { MODEL_NAMES, MODELS };
