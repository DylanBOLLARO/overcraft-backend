export function slugify(id: number | string, str: string) {
	str = str.replace(/^\s+|\s+$/g, "");
	str = str.toLowerCase();
	str = str.replace(/[^a-z0-9 -]/g, "");
	str = str.replace(/\s+/g, "-");
	str = str.replace(/-+/g, "-");
	return `${id}-${str}`;
}
