import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editNote: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id, title, content, action } = args;
            const { user } = request;
            const note = await prisma.$exists.note({ id, user: { id: user.id } });
            if (note) {
                if (action === "EDIT") {
                    return prisma.updateNote({
                        data: { title, content },
                        where: { id }
                    });
                }
                else if (action === "DELETE") {
                    return prisma.deleteNote({ id });
                }
            }
            else {
                throw Error("You can't do that!");
            }
        }
    }
}