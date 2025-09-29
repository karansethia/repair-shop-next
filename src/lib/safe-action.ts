import { createSafeActionClient } from "next-safe-action";
import { DatabaseError } from "pg";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, _) {

    // unwrap the underlying DatabaseError
    const dbError = e.cause instanceof DatabaseError ? e.cause : null;

    if (dbError) {
      const { code, detail, constraint } = dbError;

      if (code === "23505") {
        return `Duplicate entry: This record already exists. ${detail}`;
      }

      // fallback for other db errors
      return `Database Error (${code}): ${detail || "Your data did not save."}`;
    }

    // Sentry.captureException(e, (scope) => {
    //   scope.clear();
    //   scope.setContext("serverError", { message: e.message });
    //   scope.setContext("metadata", { actionName: utils.metadata?.actionName });
    //   scope.setContext("clientInput", { clientInput: utils.clientInput });
    //   return scope;
    // });

    if (e.constructor.name === 'DatabaseError') {
      return "Database Error: Your data did not save. Support will be notified."
    }
    return e.message
  },
});
