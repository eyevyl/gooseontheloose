import { Schema, model, models } from "mongoose";

const SightingSchema = new Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        id: { type: Schema.Types.ObjectId, ref: "id" },
    },
    {
        timestamps: true,
    },
);

const Sighting = models.Sighting || model("Sighting", SightingSchema);

export default Sighting;
