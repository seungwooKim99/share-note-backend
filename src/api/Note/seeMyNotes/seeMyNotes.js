import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeMyNotes: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.notes({
                where: {
                    user: {
                        id_in: user.id
                    }
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
}