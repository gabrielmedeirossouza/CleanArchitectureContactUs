import { LoggerFactory } from "./Core/SystemFeatures/Logger/LoggerFactory"
import { ExpressRequest } from "./Core/Infrastructure/Express/ExpressRequest"
import { ExpressResponse } from "./Core/Infrastructure/Express/ExpressResponse"
import { ContactUsEmailServiceFactory } from "./Features/Contact/Infrastructure/Email/ContactUsEmailServiceFactory"
import { SendContactUsController } from "./Features/Contact/Presentation/Controllers/SendContactUsController"
import express from "express"
import { SystemRegistry } from "./Core/SystemFeatures/SystemRegistry"
import { SendContactUsImpl } from "./Features/Contact/Application/UseCases/SendContactUsImpl"

SystemRegistry.logger = LoggerFactory.Create()

const contactUsEmailService = ContactUsEmailServiceFactory.Create()
const sendContactUs = new SendContactUsImpl(contactUsEmailService)
const sendContactUsController = new SendContactUsController(sendContactUs)

const app = express()

app.use(express.json())

app.post("/contact-us", async (req, res) => {
    sendContactUsController.Handle(new ExpressRequest(req), new ExpressResponse(res))
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
