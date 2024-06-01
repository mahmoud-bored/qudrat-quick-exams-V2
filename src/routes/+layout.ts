export const prerender = true
export const trailingSlash = 'always'
export const load = ({ url, params }) => {
	const { pathname, origin } = url;

	return {
		pathname, origin, params
	};
};