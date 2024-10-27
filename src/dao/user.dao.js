import UserModel from "../models/user.model.js";
import mongoDB from "../config/mongoose.config.js";

class UserDao {
    async findById(id) {
        if (!mongoDB.isValidId(id)) {
            return "Invalid ID";
        }
        return await UserModel.findById(id);
    }

    async findOne(query) {
        return await UserModel.findOne(query);
    }

    async save(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }

    async update(id, userData) {
        if (!mongoDB.isValidId(id)) {
            return "Invalid ID";
        }
        return await UserModel.findByIdAndUpdate(id, userData);
    }

    async delete(id) {
        if (!mongoDB.isValidId(id)) {
            return "Invalid ID";
        }
        return await UserModel.findByIdAndDelete(id);
    }
}

export default new UserDao();
