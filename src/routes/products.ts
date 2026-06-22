import { Router } from "express";
import prisma from "../prisma";
import {
  encodeCursor,
  decodeCursor,
} from "../utils/cursor";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pageSize = Math.min(Number(req.query.pageSize) || 20, 100);
    const category = req.query.category as string;
    const cursor = req.query.cursor as string;

    let products;

    if (!cursor) {
      products = await prisma.product.findMany({
        where: category
          ? { category }
          : undefined,

        orderBy: [
          { updatedAt: "desc" },
          { id: "desc" },
        ],

        take: pageSize + 1,
      });
    } else {
      const decoded = decodeCursor(cursor);

      products = await prisma.product.findMany({
        where: {
          ...(category ? { category } : {}),

          OR: [
            {
              updatedAt: {
                lt: new Date(
                  decoded.updatedAt
                ),
              },
            },
            {
              updatedAt: new Date(
                decoded.updatedAt
              ),
              id: {
                lt: BigInt(decoded.id),
              },
            },
          ],
        },

        orderBy: [
          { updatedAt: "desc" },
          { id: "desc" },
        ],

        take: pageSize + 1,
      });
    }

    let nextCursor = null;

    if (products.length > pageSize) {
      const nextItem =
        products[pageSize - 1];

      nextCursor = encodeCursor({
        id: nextItem.id.toString(),
        updatedAt: nextItem.updatedAt,
      });

      products.pop();
    }

    res.json({
      products,
      nextCursor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;