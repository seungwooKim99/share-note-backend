import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();
            return prisma.notes({
                where: {
                    id_in: [user.id, ...following.map(user => user.id)]
                },
                orderBy: "createdAt_DESC"
            })
        }
    }
}