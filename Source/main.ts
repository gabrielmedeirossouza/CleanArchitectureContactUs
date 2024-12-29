import { LoggerFactory } from "./Core/Features/Logger/LoggerFactory"
import { ExpressRequest } from "./Core/Infrastructure/Express/ExpressRequest"
import { ExpressResponse } from "./Core/Infrastructure/Express/ExpressResponse"
import { SendContactUs } from "./Features/ContactUs/Application/UseCases/SendContactUs"
import { ContactUsEmailServiceFactory } from "./Features/ContactUs/Infrastructure/Email/ContactUsEmailServiceFactory"
import { SendContactUsController } from "./Features/ContactUs/Presentation/Controllers/SendContactUsController"
import { SendContactUsPresenter } from "./Features/ContactUs/Presentation/Presenters/SendContactUsPresenter"
import express from "express"

const logger = LoggerFactory.Create("SendContactUs")
const contactUsEmailService = ContactUsEmailServiceFactory.Create()
const sendContactUs = new SendContactUs(contactUsEmailService, logger)
const sendContactUsPresenter = new SendContactUsPresenter
const sendContactUsController = new SendContactUsController(sendContactUs, sendContactUsPresenter)

const app = express()

app.use(express.json())

app.post("/contact-us", async (req, res) => {
    sendContactUsController.Handle(new ExpressRequest(req), new ExpressResponse(res))
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
