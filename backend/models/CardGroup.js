const { Schema, model } = require("mongoose");
const cardSchema = require("./Card")

const cardGroupSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 280,
		trim: true,
	},
	description: {
		type: String,
		trim: true
	},
    private: {
        type: Boolean,
        default: false,
        required: true
    },
	owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
	cards: [cardSchema],
});

const CardGroup = model("CardGroup", cardGroupSchema);

module.exports = CardGroup;
