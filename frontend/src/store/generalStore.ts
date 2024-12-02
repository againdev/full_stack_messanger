import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChannelType } from "../gql/graphql";

export type Modal =
  | "CreateServer"
  | "InvitePeople"
  | "UpdateServer"
  | "CreateChannel"
  | "ManageMembers"
  | "DeleteChannel"
  | "UpdateChannel"
  | "DeleteServer";

interface GeneralStore {
  activeModal: Modal | null;
  drawerOpen: boolean;
  channelTypeForCreateChannelModal: ChannelType;
  channelToBeUpdatedOrDeletedId: number | null;
  setActiveModal: (modal: Modal | null) => void;
  toggleDrawer: () => void;
  setChannelTypeForCreateChannelModal: (type: ChannelType) => void;
  setChannelToBeUpdatedOrDeletedId: (id: number | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      drawerOpen: false,
      channelTypeForCreateChannelModal: ChannelType.Text,
      channelToBeUpdatedOrDeletedId: null,
      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      setChannelTypeForCreateChannelModal: (channeltype) =>
        set({ channelTypeForCreateChannelModal: channeltype }),
      setChannelToBeUpdatedOrDeletedId: (id) =>
        set(() => ({ channelToBeUpdatedOrDeletedId: id })),
    }),
    {
      name: "general-store",
    }
  )
);
