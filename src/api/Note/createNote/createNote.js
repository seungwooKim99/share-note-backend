import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createNote: async (_, args, { request }) => {
            isAuthenticated(request);
            const { title, content } = args;
            const { user } = request;
            try {
                return await prisma.createNote({
                    title, content,
                    user: { connect: { id: user.id } },
                    isShared: false
                });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        }
    }
}