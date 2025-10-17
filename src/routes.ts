import { Router, Request, Response } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserControler";
import { DeleteUserController } from "./controller/user/DeleteUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListUserController } from "./controller/user/ListUserController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { CreateAccountController } from "./controller/account/CreateAccountController";
import { ListAccountsByUserController } from "./controller/account/ListAccountsByUserController";
import { DepositController } from "./controller/transaction/DepositController";
import { WithDrawalController } from "./controller/transaction/WithDrawalController";
import { TransferController } from "./controller/transaction/TransferController";
import { GetTransactionController } from "./controller/transaction/GetTransactionController";

export const router = Router();

router.post("/teste", (req: Request, res: Response) => {

    throw new Error("Erro ao fazer requisicao")

})


//USER
router.post('/createUser', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.delete('/userDelete', isAuthenticated, new DeleteUserController().handle);
router.get('/allUsers', new ListUserController().handle);
router.get('/detailUser', new DetailUserController().handle);

//ACCOUNT
router.post('/createAccounts', isAuthenticated, new CreateAccountController().handle);
router.get('/userAccounts', isAuthenticated, new ListAccountsByUserController().handle);

//TRANSACTION
router.post('/transaction/deposit', new DepositController().handle);
router.post('/transaction/withDrawal', isAuthenticated, new WithDrawalController().handle);
router.post('/transaction/transfer', isAuthenticated, new TransferController().handle);
router.get('/transaction/statement', isAuthenticated, new GetTransactionController().handle);