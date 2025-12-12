import { z } from "zod";

const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });

function createApiResponse(
  schema: z.ZodTypeAny,
  description: string,
  statusCode = "200",
) {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema: ServiceResponseSchema(schema),
        },
      },
    },
  };
}

export default createApiResponse;

// Use if you want multiple responses for a single endpoint

// import { ResponseConfig } from '@asteasolutions/zod-to-openapi';
// import { ApiResponseConfig } from '@common/models/openAPIResponseConfig';
// export type ApiResponseConfig = {
//   schema: z.ZodTypeAny;
//   description: string;
//   statusCode: StatusCodes;
// };
// export function createApiResponses(configs: ApiResponseConfig[]) {
//   const responses: { [key: string]: ResponseConfig } = {};
//   configs.forEach(({ schema, description, statusCode }) => {
//     responses[statusCode] = {
//       description,
//       content: {
//         'application/json': {
//           schema: ServiceResponseSchema(schema),
//         },
//       },
//     };
//   });
//   return responses;
// }
