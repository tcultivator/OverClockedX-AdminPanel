import { create } from 'zustand'


type mobileController = {
    cardDisplaySwitcher: boolean,
    setCardDisplaySwitcher: (value: boolean) => void,
}
export const useMobileControllerStore = create<mobileController>((set) => ({

    cardDisplaySwitcher: false,
    setCardDisplaySwitcher: (value: boolean) => {
        set({
            cardDisplaySwitcher: value
        })
    }

}))