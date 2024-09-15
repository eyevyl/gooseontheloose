import { Schema, model, models } from "mongoose";

const GooseSchema = new Schema(
    {
        id: { type: Number},
        name: { type: "string"},
        image: { type: "string"},
        traitsPrompt: { type: "string"},
        views: { type: Number},
        finder: { type: "string"},
        midterm: { type: Number},
        final: { type: Number},
        program: { type: "string"}
    },
    {
        timestamps: true,
    },
);

const Goose = models?.Goose || model("Goose", GooseSchema);

export default Goose;
