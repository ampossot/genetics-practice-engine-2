/**
 * Dihybrid topic registry.
 */
import { registerObjective01 } from "./objective01.js";
import { registerObjective02 } from "./objective02.js";

export function registerDihybridTopic(ctx){
  registerObjective01(ctx);
  registerObjective02(ctx);
}
