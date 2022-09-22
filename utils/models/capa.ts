import { models } from "mongoose";
import {
    createSchema,
    ExtractDoc,
    ExtractProps,
    Type,
    typedModel,
} from "ts-mongoose";

export const possibleFindings = [
    "Low Priority",
    "Medium Priority",
    "High Priority",
] as const;

const CapaSchema = createSchema(
    {
        title: Type.string({ required: true }),
        finding: Type.string({ required: true, enum: possibleFindings }),
        description: Type.string({ required: true }),
        createdBy: Type.string({ required: true }),
    },
    { timestamps: true }
);

export const Capa = models.Capa || typedModel("Capa", CapaSchema);
export type CapaDoc = ExtractDoc<typeof CapaSchema>;
export type CapaProps = ExtractProps<typeof CapaSchema>;
