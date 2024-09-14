import {Schema, model, models} from "mongoose";

const GooseSchema = new Schema(
    {
        id: {type: Number, required: true, unique: true},
        name: {type: "string", required: true, unique: true},
        traitsPrompt: {type: "string", required: true, unique: true},
        views: {type: Number, required: true},
        finder: {type: "string", required: true},
        midterm: {type: Number, required: true},
        final: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const Goose = models.Goose || model("Goose", GooseSchema);

export default Goose;