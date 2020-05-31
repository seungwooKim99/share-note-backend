import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        shareNote: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            try {
                await prisma.updateNote({ where: { id }, data: { isShared: true } });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
}