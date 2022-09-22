import { models } from "mongoose";
import {
    createSchema,
    ExtractDoc,
    ExtractProps,
    Type,
    typedModel,
} from "ts-mongoose";

const FindingSchema = createSchema(
    {
        finding: Type.string({ required: true }),
        description: Type.string({ required: true }),
        createdBy: Type.string({ required: true }),
    },
    { timestamps: true }
);

export const Finding = models.Finding || typedModel("Finding", FindingSchema);
export type FindingDoc = ExtractDoc<typeof FindingSchema>;
export type FindingProps = ExtractProps<typeof FindingSchema>;
