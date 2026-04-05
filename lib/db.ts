export type GiftProfile = {
  id: string;
  name: string;
  gender: string;
  ageRange: string;
};

class MockDatabase {
  private profiles = new Map<string, GiftProfile>();

  async createProfile(data: Omit<GiftProfile, "id">) {
    const id = Math.random().toString(36).slice(2, 9);
    const profile = { ...data, id };
    this.profiles.set(id, profile);
    return profile;
  }

  async getProfile(id: string) {
    return this.profiles.get(id);
  }

  async updateProfile(id: string, updates: Partial<GiftProfile>) {
    const existing = this.profiles.get(id);
    if (!existing) throw new Error("Not found");
    const updated = { ...existing, ...updates };
    this.profiles.set(id, updated);
    return updated;
  }
}

export const db = new MockDatabase();
