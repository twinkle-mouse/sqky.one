export function transform(capitalize: boolean, s: string) {
    if (capitalize) {
        s = s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    return s;
}

const prefix = "__p";

// prettier-ignore
const __pronouns = [
    { name: "he",   nominative: "he",   accusative: "him",  pronomial_possessive: "his",   predicative_possessive: "his",    reflexive: "himself"   },
    { name: "she",  nominative: "she",  accusative: "her",  pronomial_possessive: "her",   predicative_possessive: "hers",   reflexive: "herself"   },
    { name: "they", nominative: "they", accusative: "them", pronomial_possessive: "their", predicative_possessive: "theirs", reflexive: "themselves"},
    { name: "it",   nominative: "it",   accusative: "it",   pronomial_possessive: "its",   predicative_possessive: "its",    reflexive: "itself"    },
    { name: "one",  nominative: "one",  accusative: "one",  pronomial_possessive: "one’s", predicative_possessive: "one’s",  reflexive: "oneself"   },
    { name: "ze",   nominative: "ze",   accusative: "zir",  pronomial_possessive: "zir",   predicative_possessive: "zirs",   reflexive: "zirself"   },
    { name: "ae",   nominative: "ae",   accusative: "aer",  pronomial_possessive: "aer",   predicative_possessive: "aers",   reflexive: "aerself"   },
    { name: "xe",   nominative: "xe",   accusative: "xem",  pronomial_possessive: "xyr",   predicative_possessive: "xyrs",   reflexive: "xemself"   },
    { name: "fae",  nominative: "fae",  accusative: "faer", pronomial_possessive: "faer",  predicative_possessive: "faers",  reflexive: "faerself"  },
];

export const pronouns = __pronouns.map((pronoun) => {
    return {
        ...pronoun,
        flag: `${prefix}-${pronoun.name}`,
        text: `${pronoun.nominative}/${pronoun.accusative != pronoun.nominative ? pronoun.accusative : pronoun.predicative_possessive}`,
    };
});

export const customPronounFlag = `${prefix}-custom`;
export const allPronounsFlags = [...pronouns.map((pronoun) => pronoun.flag), customPronounFlag].join(" ");
