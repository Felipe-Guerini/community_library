import cron from "node-cron";
import moment from "moment";
import loanRepository from "../repositories/loan.repositories.js";
import userRepository from "../repositories/user.repositories.js";
import bookRepository from "../repositories/book.repositories.js";
import sendEmail from "./email.service.js"; 


cron.schedule("* * * * *", async () => {
  console.log(
    "⏰ Executando tarefa agendada (verificação de empréstimos vencendo)"
  );

  const loans = await loanRepository.findAllLoansRepository();
  const today = moment().startOf("day");

  for (const loan of loans) {
    if (loan.returnDate !== null) continue;

    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");

    console.log(
      `📅 Hoje: ${today.format(
        "YYYY-MM-DD"
      )}, Lembrete: ${reminderDueDate.format("YYYY-MM-DD")}`
    );

    if (today.isSame(reminderDueDate)) {
      const userLoan = await userRepository.findUserByIdRepository(loan.userId);
      const bookLoan = await bookRepository.findBookByIdRepository(loan.bookId);

      if (userLoan && bookLoan) {
        console.log(
          `📧 Enviando lembrete para ${userLoan.email} - Livro: ${bookLoan.title}`
        );
        await sendEmail(userLoan.email, bookLoan.title, loan.dueDate);
      } else {
        console.warn(
          `⚠️ Não foi possível enviar lembrete para o empréstimo ${loan.id}: dados faltando`
        );
      }
    }
  }
});
