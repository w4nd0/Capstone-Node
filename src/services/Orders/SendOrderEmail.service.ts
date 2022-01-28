import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";
import { getRepository } from "typeorm";
import User from "../../entities/User";
import Order from "../../entities/Order";

export default class SendOrderEmailService {
  public async execute(order: Order): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const total = order.getSubtotal();

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: path.resolve(__dirname, "..", "..", "views", "Order"),
          defaultLayout: undefined,
        },
        viewPath: path.resolve(__dirname, "..", "..", "views", "Order"),
      })
    );

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: order.userId,
      },
    });

    if (!user) {
      return;
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: "Resumo da compra",
      template: "order",
      context: {
        name: user.name,
        order,
        total: Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total),
      },
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new AppError("Error while sending the email", 500);
      }
    });

    process.on("unhandledRejection", (error: any) => {
      console.log("unhandledRejection", error.message);
    });
  }
}
