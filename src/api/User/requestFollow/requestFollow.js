import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        requestFollow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { email } = args;
            try {
                await prisma.updateUser({ data: { isFollowRequested: true }, where: { email } });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
}