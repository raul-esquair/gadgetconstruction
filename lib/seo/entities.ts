/**
 * Shared schema.org entity IDs and the canonical owner Person object.
 *
 * The whole point is ONE authoritative entity graph: the business defines Osmin
 * as its `founder` (full object, rendered on every page via localBusinessSchema),
 * and blog posts reference that same Osmin by `@id` as their author. Google then
 * consolidates "Osmin Bernal, blog author" and "Osmin Bernal, owner of Gadget
 * Construction" into a single trusted entity — the E-E-A-T signal that a bare,
 * disconnected author name can't carry.
 *
 * This must stay the name of the person who actually holds the CSLB license —
 * it is a public claim about who is licensed, not a byline.
 *
 * Before this, blog posts were authored by the Organization itself, which
 * carries no person-level experience signal at all.
 */
import { COMPANY } from "@/lib/constants";

export const BUSINESS_ID = `${COMPANY.url}/#business`;
export const OWNER_ID = `${COMPANY.url}/#osmin`;

/** Full Person definition — rendered once per page inside LocalBusiness.founder. */
export const ownerPerson = {
  "@type": "Person",
  "@id": OWNER_ID,
  name: "Osmin Bernal",
  url: `${COMPANY.url}/about`,
  jobTitle: "Owner",
  worksFor: { "@id": BUSINESS_ID },
  knowsAbout: [
    "Concrete foundations",
    "Seismic retrofitting",
    "Retaining walls",
    "Home remodeling",
    "Composite deck construction",
    "ADU construction",
    "Dry rot repair",
    "Stucco repair",
    "Siding installation",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: `California CSLB Contractor License #${COMPANY.license}`,
  },
};

/** Reference-only handle used where the full Person is already on the page. */
export const ownerPersonRef = { "@id": OWNER_ID };
