import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        discardRequest: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: { id: user.id },
                    data: { isFollowRequested: false }
                });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
}