"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputs = exports.createBlogInputs = exports.signinInputs = exports.signupInputs = void 0;
const zod_1 = require("zod");
exports.signupInputs = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6)
});
exports.signinInputs = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.createBlogInputs = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string().min(1)
});
exports.updateBlogInputs = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string().min(1),
    id: zod_1.z.string()
});
