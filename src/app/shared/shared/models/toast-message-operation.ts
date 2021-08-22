import { Message } from "primeng/api";
import { ToastMessageOperationTypeEnum } from "./toast-message-operation-type-enum";

export interface ToastMessageOperation {
  operationType: ToastMessageOperationTypeEnum;
  message?: Message;
}
