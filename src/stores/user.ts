import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { User } from '@/pages/User/service';

interface State {
	currentUser: User | null;
}

interface Action {
	setCurrentUser: (currentUser: State['currentUser']) => void;
}

export const useUserStore = create<State & Action>()(
	devtools(
		(set) => {
			return {
				currentUser: null,
				setCurrentUser: (currentUser: State['currentUser']) =>
					set({ currentUser })
			};
		},
		{ name: 'globalUserStore' }
	)
);
