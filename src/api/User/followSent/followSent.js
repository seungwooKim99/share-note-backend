import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        followSent: async (_, __, { request }) => {
            const { user } = request;
            isAuthenticated(request);
            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        isSent: true
                    }
                })
            }
            catch{
                return false;
            }
        }
    }
}