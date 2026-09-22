import { Accusative, Nominative, PredicativeP, PronomialP, Reflexive } from "@sqky-one/writing/components/pronouns";
import WritingSection from "@sqky-one/writing/layouts/WritingSection.astro";

export const components = {
    section: WritingSection,
    pronouns_nominative: Nominative,
    pronouns_accusative: Accusative,
    pronouns_pronomial_possessive: PronomialP,
    pronouns_predicative_possessive: PredicativeP,
    pronouns_reflexive: Reflexive,
};
