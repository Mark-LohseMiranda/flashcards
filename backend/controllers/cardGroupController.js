const { User, CardGroup } = require("../models");

module.exports = {
	async createCardGroup({ user, body }, res) {
		try {
			const addCardGroup = await CardGroup.create({
				name: body.name,
				description: body.description,
				private: body.private,
				owner: user.data._id,
			});
			const updateUser = await User.findByIdAndUpdate(
				user.data._id,
				{ $push: { cardGroup: addCardGroup._id } },
				{ new: true, useFindAndModify: false }
			);
			const getCardGroup = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			return res.status(200).json(getCardGroup);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},
	async getCardGroup({ user }, res) {
		try {
			const getCardGroup = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(getCardGroup);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async updateCardGroup({ user, body, params }, res) {
		try {
			const updateCardGroup = await CardGroup.findById(params.cardGroupId);
			if (updateCardGroup.owner != user.data._id) {
				return res.status(503).json({ message: "Not your Card Group" });
			}
			if (body.name) updateCardGroup.name = body.name;
			if (body.description) updateCardGroup.description = body.description;
			if (body.private===true || body.private===false) updateCardGroup.private = body.private;
			await updateCardGroup.save();
			const updatedData = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(updatedData);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async deleteCardGroup({ user, params }, res) {
		try {
			const getCardGroup = await CardGroup.findById(params.cardGroupId);
			if (getCardGroup.owner != user.data._id) {
				return res.status(503).json({ message: "Not your Card Group" });
			}
			await CardGroup.findByIdAndDelete(params.cardGroupId);
			const getUser = await User.findById(user.data._id);
			getUser.cardGroup.pull({ _id: params.cardGroupId });
			await getUser.save();
			const updatedData = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(updatedData);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async addCard({ user, body, params }, res) {
		try {
			const foundCardGroup = await CardGroup.findById(params.cardGroupId);
			if (foundCardGroup.owner != user.data._id) {
				return res.status(503).json({ message: "Not your Card Group" });
			}
			foundCardGroup.cards.push(body);
			await foundCardGroup.save();
			const updatedData = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(updatedData);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async updateCard({ user, body, params }, res) {
		try {
			const foundCardGroup = await CardGroup.findById(params.cardGroupId);
			if (foundCardGroup.owner != user.data._id) {
				return res.status(503).json({ message: "Not your Card Group" });
			}

			const updated = await CardGroup.updateOne(
				{
					_id: params.cardGroupId,
					"cards._id": params.cardId,
				},
				{
					$set: {
						"cards.$.question": body.question,
						"cards.$.answer": body.answer,
					},
				}
			);

			// const foundCard = foundCardGroup.cards.id(params.cardId);
			// if (body.question) foundCard.question = body.question;
			// if (body.answer) foundCard.answer = body.answer;
			// await foundCardGroup.save();
			const updatedData = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(updatedData);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async deleteCard({ user, params }, res) {
		try {
			const foundCardGroup = await CardGroup.findById(params.cardGroupId);
			if (foundCardGroup.owner != user.data._id) {
				return res.status(503).json({ message: "Not your Card Group" });
			}
			foundCardGroup.get("cards").remove(params.cardId);
            await foundCardGroup.save();
            const updatedData = await CardGroup.find({
				$or: [{ owner: user.data._id }, { private: false }],
			});
			res.status(200).json(updatedData);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},
};
