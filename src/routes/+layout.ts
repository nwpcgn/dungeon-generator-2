export const load: LayoutLoad = async () => {
	return {
		name: 'Nwp-Studio',
		nav: [
			{
				name: 'Start',
				href: '/',
				icon: 'nwp-home',
				hidden: false
			},
			{
				name: 'Dungeon 1',
				href: '/tools/d1',
				icon: 'nwp-db',
				hidden: false
			},
			{
				name: 'Dungeon 2',
				href: '/tools/d2',
				icon: 'nwp-game',
				hidden: false
			},
			{
				name: 'Dungeon 3',
				href: '/tools/rot1',
				icon: 'nwp-enemy',
				hidden: false
			},
			{
				name: 'Dungeon 4',
				href: '/tools/can1',
				icon: 'nwp-dice',
				hidden: false
			}
		]
	}
}
