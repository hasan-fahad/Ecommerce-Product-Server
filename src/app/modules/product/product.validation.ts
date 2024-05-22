// Zod validation

import {z}   from 'zod';


// For Variants

const zodVariant = z.object({
      type: z.string(),
      value: z.string(),
    })

// For Inventory

const zodInventory =z.object({
    quantity: z.number(),
    inStock: z.boolean(),
  });

export const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(zodVariant), 
  inventory: zodInventory,
  isDeleted: z.boolean().optional().default(false),
});

