/**
 * Dihybrid Crosses topic registry.
 *
 * Each learning outcome is isolated in its own module. The application imports
 * only this file, and this file registers every objective into the shared bank.
 */

import { registerObjective01 } from "./objective01.js";
import { registerObjective02 } from "./objective02.js";
import { registerObjective03 } from "./objective03.js";

export function registerDihybridTopic(ctx) {
  registerObjective01(ctx);
  registerObjective02(ctx);
  registerObjective03(ctx);
}
