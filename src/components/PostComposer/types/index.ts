import type { LucideIcon } from "lucide-react";

export type Audience = "public" | "friends" | "close_friends" | "only_me";

export type ModalView = "compose" | "audience";

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AudienceInfo = {
  label: string;
  icon: LucideIcon;
  description?: string;
};

export type AudienceRecord = Record<Audience, AudienceInfo>;
