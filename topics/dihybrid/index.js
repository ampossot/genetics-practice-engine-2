/**
 * Dihybrid Crosses topic registry.
 *
 * Each learning outcome is isolated in its own module. The application imports
 * only this file, and this file registers every objective into the shared bank.
 */

import { registerObjective01 } from "./objective01.js";
import { registerObjective02 } from "./objective02.js";
import { registerObjective03 } from "./objective03.js";
import { registerObjective04 } from "./objective04.js";
import { registerObjective05 } from "./objective05.js";
import { registerObjective06 } from "./objective06.js";
import { registerObjective07 } from "./objective07.js";

export function registerDihybridTopic(ctx) {
  registerObjective01(ctx);
  registerObjective02(ctx);
  registerObjective03(ctx);
  registerObjective04(ctx);
  registerObjective05(ctx);
  registerObjective06(ctx);
  registerObjective07(ctx);
}
