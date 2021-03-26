"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var foodSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
});
foodSchema.statics.build = function (attr) {
    return new Food(attr);
};
var Food = mongoose_1.default.model("Food", foodSchema);
exports.Food = Food;
