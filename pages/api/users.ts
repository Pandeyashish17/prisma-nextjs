import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;
      case "POST":
        const { username, password } = req.body;
        await prisma.user.create({ data: { username, password } });
        res.status(200).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
