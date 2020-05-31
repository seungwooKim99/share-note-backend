import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFullNote: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            return prisma.note({ id });
        }
    }
}