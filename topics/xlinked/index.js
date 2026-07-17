/**
 * X-linked Inheritance topic registry.
 *
 * Each learning objective is isolated in its own module. The application imports
 * only this file, and this file registers every completed objective into the
 * shared question bank.
 */

import { registerObjective01 } from "./objective01.js";
import { registerObjective02 } from "./objective02.js";
import { registerObjective03 } from "./objective03.js";
import { registerObjective04 } from "./objective04.js";
import { registerObjective05 } from "./objective05.js";
import { registerObjective06 } from "./objective06.js";
import { registerObjective07 } from "./objective07.js";
import { registerObjective08 } from "./objective08.js";
import { registerObjective09 } from "./objective09.js";

export function registerXLinkedTopic(ctx) {
  registerObjective01(ctx);
  registerObjective02(ctx);
  registerObjective03(ctx);
  registerObjective04(ctx);
  registerObjective05(ctx);
  registerObjective06(ctx);
  registerObjective07(ctx);
  registerObjective08(ctx);
  registerObjective09(ctx);
}
