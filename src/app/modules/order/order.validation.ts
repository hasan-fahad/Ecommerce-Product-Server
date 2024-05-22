import { z } from "zod";
// order zod validation

const zodOrderValidation = z.object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number()
})

export default zodOrderValidation;