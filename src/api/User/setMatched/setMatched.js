import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        setMatched: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        isMatched: true
                    }
                });
                return true;
            }
            catch{
                return false;
            }
        }
    }
}