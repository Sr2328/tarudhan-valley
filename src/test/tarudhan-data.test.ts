import { describe, expect, it } from "vitest";

import { faqItems, projectFacts } from "@/lib/tarudhan-data";

describe("Tarudhan Valley project facts", () => {
  it("keeps the 65-acre community distinct from the approximately 72-acre hotel resort", () => {
    expect(projectFacts.communityAcres).toBe(65);
    expect(projectFacts.resortAcres).toBe(72);
    expect(projectFacts.communityAcres).not.toBe(projectFacts.resortAcres);
  });

  it("reflects the listed nine-hole course and 141 homes", () => {
    expect(projectFacts.courseHoles).toBe(9);
    expect(projectFacts.homes).toBe(141);
  });

  it("explains the community and resort acreage distinction in the FAQ", () => {
    expect(faqItems.find((item) => item.question === "What are the two acreage figures about?")?.answer).toContain("65 acres");
    expect(faqItems.find((item) => item.question === "What are the two acreage figures about?")?.answer).toContain("72 acres");
  });
});