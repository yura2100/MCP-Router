import {JSONSchemaToZod} from "@dmitryrechkin/json-schema-to-zod";
import {z, ZodObject} from "zod";
import {fieldConfig} from "@autoform/zod";

export function buildServerSettingsSchema(
  schema: Record<string, any>,
  fieldConfigs: Record<string, any>
) {
  const zodSchema = JSONSchemaToZod.convert(schema) as ZodObject<Record<string, any>>;
  const schemaEntries = Object.entries(zodSchema.shape).map(([key, value]) => {
    const config = fieldConfigs[key];
    if (!config) return [key, value];
    return [key, value.superRefine(fieldConfig(config))]
  });
  return z.object(Object.fromEntries(schemaEntries));
}
