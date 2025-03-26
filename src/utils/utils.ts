export const modules = import.meta.webpackContext('../pages', {
	regExp: /\/index\.tsx$/,
	recursive: true
});

export const CompsNameMap: Record<string, any> = {};

for (const path of modules.keys()) {
	const mod = modules(path) as { [key: string]: React.FC | undefined };
	if (path !== 'Example') {
		CompsNameMap[path] = mod[path] ?? mod.default;
	}
}
