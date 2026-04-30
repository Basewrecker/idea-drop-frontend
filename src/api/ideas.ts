import api from "#/lib/axios";
import type { Idea } from "#/types";

type IdeaApiResponse = Partial<Idea> & {
  id?: string | number;
  _id?: string | number;
};

const normalizeIdea = (idea: IdeaApiResponse): Idea => ({
  _id: String(idea._id ?? idea.id ?? ""),
  title: idea.title ?? "",
  summary: idea.summary ?? "",
  description: idea.description ?? "",
  tags: Array.isArray(idea.tags) ? idea.tags : [],
  createdAt: idea.createdAt ?? new Date(0).toISOString(),
  user: idea.user ?? "",
});

export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get("/ideas");
  return Array.isArray(res.data) ? res.data.map(normalizeIdea) : [];
};

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return normalizeIdea(res.data);
};

export const createIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}):Promise<Idea> => {
  const res = await api.post('/ideas/', {
    ...newIdea,
    createdAt: new Date().toISOString()
  })

  return normalizeIdea(res.data);
};

export const deleteIdea = async  (ideaId: string):Promise<void> => {
  await api.delete(`/ideas/${ideaId}`)
}

export const updateIdea = async (ideaId: string,updatedData: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updatedData)
  return normalizeIdea(res.data);
}