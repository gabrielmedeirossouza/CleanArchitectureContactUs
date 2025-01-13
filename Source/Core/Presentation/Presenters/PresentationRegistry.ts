import { AssertionOutputMapper } from "./AssertionOutputMapper"
import { UnavailableServiceOutputMapper } from "./UnavailableServiceOutputMapper"

export class PresentationRegistry {
    public static assertionOutputMapper = new AssertionOutputMapper()
    public static unavailableServiceOutputMapper = new UnavailableServiceOutputMapper()
}
