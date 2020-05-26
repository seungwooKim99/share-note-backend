import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        confirmFollow: async (_, args, { request }) => {
            console.log(request.user);
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;

            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            connect: {
                                id
                            }
                        },
                        followers: {
                            connect: {
                                id
                            }
                        }
                    }
                });
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}