"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./resolvers/Auth");
(() => __awaiter(this, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const app = express_1.default();
    const PORT = process.env.PORT || 4000;
    const server = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [Auth_1.Auth],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    server.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        console.log(`SERVER STARTED\nPORT:${PORT}`);
    });
}))().catch((err) => {
    console.error(`SERVER ERROR:\n${err}`);
});
//# sourceMappingURL=index.js.map