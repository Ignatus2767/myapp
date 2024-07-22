"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const reviewController_1 = require("../src/controllers/reviewController");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.url === '/api/add' && req.method === 'POST') {
            yield (0, reviewController_1.handleAddReview)(req, res);
        }
        else if (req.url === '/api/all' && req.method === 'GET') {
            yield (0, reviewController_1.handleGetReviews)(req, res);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}
