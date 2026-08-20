import {
  getLanguage,
  getReadLanguage,
  getSpeakLanguage,
  getUnderstandLanguage,
  getWriteLanguage,
} from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useLanguage = (search = "", page = 1, limit = 25) =>
  useQuery({
    queryFn: () => getLanguage(search, page, limit),
    queryKey: ["language", search, page, limit],
  });

export const useLanguageRead = () =>
  useQuery({
    queryKey: ["language-read"],
    queryFn: getReadLanguage,
  });

export const useLanguageWrite = () =>
  useQuery({
    queryKey: ["language-write"],
    queryFn: getWriteLanguage,
  });

export const useLanguageSpeak = () =>
  useQuery({
    queryKey: ["language-speak"],
    queryFn: getSpeakLanguage,
  });

export const useLanguageUnderstand = () =>
  useQuery({
    queryKey: ["language-understand"],
    queryFn: getUnderstandLanguage,
  });
