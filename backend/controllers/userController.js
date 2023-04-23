const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
	async getSingleUser({ user }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select(
				"email displayName cardGroup"
			);

			if (!foundUser) {
				return res
					.status(400)
					.json({ message: "Cannot find a user with this id!" });
			}

			res.json(foundUser);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async createUser({ body }, res) {
		try {
			const findEmail = await User.findOne({ email: body.email });
			if (findEmail) {
				return res
					.status(503)
					.json({ message: "email address already in use" });
			}

			const user = await User.create(body);

			if (!user) {
				return res.status(400).json({ message: "unable to create user" });
			}
			const token = signToken(user);
			const returnUser = await User.findOne({ email: body.email }).select(
				"email displayName cardGroup"
			);
			res
				.cookie("access_token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
				})
				.status(200)
				.json(returnUser);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async updateUser({ user, body }, res) {
		try {
			const foundUser = await User.findById(user.data._id);
			if (body.email) foundUser.email = body.email;
			if (body.password) foundUser.password = body.password;
			if (body.displayName) foundUser.displayName = body.displayName;
			await foundUser.save();
			const updatedUser = await User.findById(user.data._id).select(
				"email displayName cardGroup"
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async deleteUser({ user }, res) {
		try {
			res
				.clearCookie("access_token")
				.json(await User.findByIdAndDelete(user.data._id));
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async login({ body }, res) {
		try {
			const user = await User.findOne({ email: body.email });
			if (!user) {
				return res.status(400).json({ message: "Wrong username or password" });
			}

			const correctPw = await user.isCorrectPassword(body.password);

			if (!correctPw) {
				return res
					.clearCookie("access_token")
					.status(400)
					.json({ message: "Wrong username or password" });
			}
			const token = signToken(user);
			const returnUser = await User.findOne({ email: body.email }).select(
				"email displayName"
			);
			res
				.cookie("access_token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
				})
				.status(200)
				.json(returnUser);
		} catch (err) {
			res.status(500).json(err.message);
		}
	},

	async logout(req, res) {
		try {
			return res
				.cookie("access_token", "none", {
					expires: new Date(Date.now()),
					httpOnly: true,
				})
				.status(200)
				.json({ message: "Successfully logged out 😏 🍀" });
		} catch (err) {
			res.status(500).json(err.message);
		}
	},
};
