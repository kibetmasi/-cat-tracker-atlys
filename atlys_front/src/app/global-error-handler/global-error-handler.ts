import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "../error-handler/error.service";
import { NotificationService } from "../error-handler/notification.service";

type NewType = Error | HttpErrorResponse;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(
        private injector: Injector
    ){ }

    handleError(error: NewType) {
        const errorService = this.injector.get(ErrorService)
        const notifier = this.injector.get(NotificationService)

        let message
        if (error instanceof HttpErrorResponse){
            message = errorService.getServerErrorMessage(error)
            notifier.showError(message)
        } else {
            message = errorService.getClientErrorMessage(error)
            notifier.showError(message)
        }
    }
}