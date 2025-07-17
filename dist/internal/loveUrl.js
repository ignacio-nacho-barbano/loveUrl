/**
 * ## Use this util to easily preserve state in the URL
 * It's meant to be used with `router`, `Links` and `window.history`
 * It's also recommended together to use with `parseSearchParams`
 * @param url the target url, use the current one to add new params
 * @param newParams new params to be assigned or re assigned, undefined will delete
 * @param currentParams**[optional]** your current params to preserve, by default it takes all params from window, pass null to delete all
 * @param anchor**[optional]** scroll to any element with this id
 * [see the docs](https://stackoverflow.com/questions/24739126/scroll-to-a-specific-element-using-html)
 * @param _paramsBuilder**[testing]** do not change this, it is implemented
 * like this to allow for testing through dependency injection
 * read [vitest mocking pitfalls](https://vitest.dev/guide/mocking#mocking-pitfalls)
 * ### Code sample:
 * ```tsx
 * import { useSearchParams, useRouter } from 'next/router';
 *
 * function UserDataComponent() {
 *  const params = useSearchParams<{name: string, age: number}>();
 *  const {name, age} = parseSearchParams(params);
 *  const router = useRouter()
 *
 *  // This will scrollBack to top
 *  const updateAge = (newAge: number) => {
 *   //               👇✨
 *   router.replace(loveUrl(ROUTES.EXAMPLE_PAGE, {age: newAge});
 *  }
 *
 *  // This will not scroll back to top
 *  const onChangeName = (e) => {
 *   //                            👇✨
 *   window.history.replaceState(loveUrl(ROUTES.EXAMPLE_PAGE, {name: e.target.value});
 *   // alternatively use router with {scroll: false}
 *   route.replace(loveUrl(ROUTES.EXAMPLE_PAGE, {name: e.target.value}), {scroll: false});
 *  }
 *
 *  return (
 *    <div>
 *      <h1>{name}</h1>
 *      <h2>is {age} years old<h2>
 *      <p>Update Name</p>
 *      <label>
 *        Name
 *        <input value={name} onChange={onChangeName} />
 *      </label>
 *      <p>Update Age</p>
 *      <button onClick={() => updateAge(age + 1)}>+</button>
 *      <button onClick={() => updateAge(age + 1)}>-</button>
 *      <Link
 *        prefetch={false}>
 *        //       👇✨     passing null here to delete previous params👇✨
 *        href={loveUrl(ROUTES.EXAMPLE_PAGE, {name: "Rick",age: 30}, null)}
 *        See Rick's Data
 *      </Link>
 *    </div>
 *  )
 * }
 * ```
 **/
import { buildSearchParamsQueryString, } from "./buildSearchParams";
import { GLOBAL_CONFIG, initializeLoveUrl } from "./config";
initializeLoveUrl({ _paramsBuilder: buildSearchParamsQueryString });
export const loveUrl = (newParams, { url, currentParams, protocol, anchor, persistAnchor } = {}) => {
    console.log("CURRENT PARAMS\n\n", GLOBAL_CONFIG.defaultLocationProvider().search);
    let _url = url || GLOBAL_CONFIG.defaultLocationProvider().pathname;
    let _params = currentParams === undefined
        ? GLOBAL_CONFIG.defaultLocationProvider().search
        : currentParams;
    if (_params && _params[0] === "?") {
        _params = _params.slice(1);
    }
    if (url?.includes("?")) {
        const [cleanUrl, splitParams] = url.split("?");
        _url = cleanUrl;
        if (splitParams && currentParams !== null) {
            _params = splitParams;
            if (splitParams.includes("#")) {
                _params = splitParams.split("#")[0];
            }
        }
    }
    // Always remove the anchor from the url to avoid duplicates
    const parts = _url.split("#");
    _url = parts[0];
    const currentAnchor = parts[1];
    console.log({ _params });
    let newUrl = `${protocol ? `${protocol}://` : ""}${_url}${GLOBAL_CONFIG._paramsBuilder(newParams, _params)}`;
    // Anchor is not preserved by default as it is assumed the intention is not to scroll back to the same place in every interaction
    if (anchor) {
        newUrl += `#${anchor}`;
    }
    else if (persistAnchor) {
        newUrl += `#${currentAnchor}`;
    }
    return newUrl;
};
