import { generateToken } from "../../../utils";

export default {
    Query: {
        generateToken: async (_, args) => {
            const { id } = args;
            return generateToken(id);
        }
    }
};