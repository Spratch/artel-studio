import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "next-sanity";

export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: false
};

export const client = createClient(config);

export const previewClient = createClient({
    ...config,
    token: process.env.SANITY_VIEWER_TOKEN,
    perspective: "previewDrafts"
});

export const getClient = (preview = false) =>
    preview ? previewClient : client;

export const isPreview = (searchParams?: { preview?: string }) => {
    return searchParams?.preview === "true";
};
